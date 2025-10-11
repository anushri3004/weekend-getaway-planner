import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { searchDestinations } from "./vectorStore.js";
import { SYSTEM_PROMPT, MODEL_CONFIG } from "./config.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load comparison data
const comparisonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/destinations_comparison.json'), 'utf-8')
);

// Initialize the LLM (lazily, so env vars are loaded)
function getLLM() {
  return new ChatOpenAI({
    modelName: MODEL_CONFIG.modelName,
    temperature: MODEL_CONFIG.temperature,
    maxTokens: MODEL_CONFIG.maxTokens,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
}

// Helper: Detect if message is a destination selection
function isDestinationSelection(message) {
  const lowerMessage = message.toLowerCase();
  const selectionKeywords = ['choose', 'select', 'i want', 'pick', 'go with', 'decide on'];
  return selectionKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Helper: Extract destination name from selection message
function extractDestinationName(message) {
  const destinations = comparisonData.destinations.map(d => d.name);
  const lowerMessage = message.toLowerCase();

  for (const dest of destinations) {
    if (lowerMessage.includes(dest.toLowerCase())) {
      return dest;
    }
  }
  return null;
}

// Helper: Calculate match score
function calculateMatchScore(destination, userPreferences) {
  let score = 0;

  // Budget match (30 points)
  if (userPreferences.budget) {
    const destBudget = parseInt(destination.comparisonData.budget.replace(/[^\d]/g, ''));
    const userBudget = parseInt(userPreferences.budget);
    const budgetDiff = Math.abs(destBudget - userBudget);
    if (budgetDiff < 5000) score += 30;
    else if (budgetDiff < 10000) score += 20;
    else if (budgetDiff < 15000) score += 10;
    else score += 5;
  } else {
    score += 15; // Default points if no budget specified
  }

  // Vibe match (25 points)
  if (userPreferences.vibe && destination.matchCriteria.vibes.includes(userPreferences.vibe)) {
    score += 25;
  } else if (userPreferences.vibe) {
    // Partial match for similar vibes
    const vibeKeywords = userPreferences.vibe.toLowerCase().split(' ');
    const destVibes = destination.matchCriteria.vibes.join(' ').toLowerCase();
    if (vibeKeywords.some(keyword => destVibes.includes(keyword))) {
      score += 10;
    }
  }

  // Departure city match (20 points)
  if (userPreferences.departureCity) {
    const travelTime = destination.comparisonData.travelTime[userPreferences.departureCity];
    if (travelTime && !travelTime.includes('Not recommended')) {
      const hours = parseInt(travelTime);
      if (hours <= 6) score += 20;
      else if (hours <= 12) score += 15;
      else if (hours <= 18) score += 10;
      else score += 5;
    }
  } else {
    score += 10; // Default points if no city specified
  }

  // Interests match (15 points)
  if (userPreferences.interests && userPreferences.interests.length > 0) {
    const matchingInterests = userPreferences.interests.filter(interest =>
      destination.matchCriteria.interests.includes(interest)
    );
    score += Math.min(matchingInterests.length * 5, 15);
  } else {
    score += 7; // Default points if no interests specified
  }

  // Travel time feasibility (10 points)
  if (userPreferences.departureCity) {
    const travelTime = destination.comparisonData.travelTime[userPreferences.departureCity];
    if (travelTime && !travelTime.includes('Not recommended')) {
      score += 10;
    }
  } else {
    score += 5; // Default points if no city specified
  }

  return Math.min(score, 100);
}

// COMPARISON CHAIN
export async function createComparisonChain(userMessage, userPreferences = {}) {
  console.log('🔍 Creating comparison for preferences:', userPreferences);

  // Filter destinations based on basic criteria
  let matchedDestinations = comparisonData.destinations.filter(dest => {
    // Filter out destinations with "Not recommended" travel time
    if (userPreferences.departureCity) {
      const travelTime = dest.comparisonData.travelTime[userPreferences.departureCity];
      if (travelTime && travelTime.includes('Not recommended')) {
        return false;
      }
    }
    return true;
  });

  // Calculate match scores
  matchedDestinations = matchedDestinations.map(dest => ({
    ...dest,
    matchScore: calculateMatchScore(dest, userPreferences)
  }));

  // Sort by match score (descending)
  matchedDestinations.sort((a, b) => b.matchScore - a.matchScore);

  // Take top 3 (or 2 if only 2 available)
  const topDestinations = matchedDestinations.slice(0, Math.min(3, matchedDestinations.length));

  console.log(`✅ Found ${topDestinations.length} matching destinations`);

  // Format response
  const comparisonResponse = {
    mode: "comparison",
    message: "Based on your preferences, here are your top matches:",
    destinations: topDestinations.map(dest => ({
      name: dest.name,
      tagline: dest.tagline,
      matchScore: dest.matchScore,
      whyPerfect: dest.comparisonData.whyPerfect,
      pros: dest.comparisonData.pros,
      budget: dest.comparisonData.budget,
      travelTime: userPreferences.departureCity
        ? dest.comparisonData.travelTime[userPreferences.departureCity]
        : 'Travel time varies by departure city',
      bestFor: dest.comparisonData.bestFor,
      hiddenGem: dest.comparisonData.hiddenGem,
      bestTimeToVisit: dest.comparisonData.bestTimeToVisit,
      quickItineraryPreview: dest.comparisonData.quickItineraryPreview
    }))
  };

  return comparisonResponse;
}

// DETAILED ITINERARY CHAIN (Original chain for full itinerary)
export async function createDetailedItineraryChain(userMessage, destinationName) {
  console.log(`🗺️ Creating detailed itinerary for: ${destinationName}`);

  // Create enhanced query for better RAG retrieval
  const enhancedQuery = `${userMessage} ${destinationName} complete itinerary romantic couples`;

  // Prompt template for detailed itinerary
  const DETAILED_PROMPT_TEMPLATE = `${SYSTEM_PROMPT}

CONTEXT FROM DESTINATION DATABASE:
{context}

USER QUERY:
{query}

The user has selected **${destinationName}** as their destination.

Create a COMPLETE detailed itinerary for ${destinationName}. Include:

1. **Destination Introduction & Why It's Perfect**
   - Brief intro to ${destinationName}
   - Why it matches their preferences

2. **Complete 2-3 Day Itinerary**
   Format the itinerary as a markdown table with columns: Day | Time | Activity | Details | Cost

   Example:
   | Day | Time | Activity | Details | Cost |
   |-----|------|----------|---------|------|
   | Day 1 | 8:00 AM | Breakfast | Café ABC - Continental breakfast | ₹500 |
   | Day 1 | 10:00 AM | Beach Visit | Relax at XYZ Beach, water sports | ₹1,000 |

3. **Budget Breakdown**
   Format as a markdown table:
   | Category | Details | Cost |
   |----------|---------|------|
   | Transport | Round trip from departure city | ₹X |
   | Accommodation | 2-3 nights at Hotel ABC | ₹Y |
   | Food | All meals | ₹Z |
   | Activities | Entry fees, sports | ₹A |
   | Miscellaneous | Shopping, tips | ₹B |
   | **Total** | | **₹XYZ** |

4. **Hidden Gems & Romantic Spots**
   - 3-5 offbeat locations
   - Romantic spots for couples
   - Local experiences

5. **Practical Tips**
   - Best time to visit
   - What to pack
   - Booking tips
   - Local customs

Make it personal, specific, and actionable! Use markdown formatting for better readability.`;

  const prompt = PromptTemplate.fromTemplate(DETAILED_PROMPT_TEMPLATE);

  const chain = RunnableSequence.from([
    {
      context: async (input) => {
        // Search for relevant destination documents
        const results = await searchDestinations(input.query, 3);
        // Combine the retrieved documents into context
        return results.map((doc) => doc.pageContent).join("\n\n---\n\n");
      },
      query: (input) => input.query,
    },
    prompt,
    getLLM(),
    new StringOutputParser(),
  ]);

  const result = await chain.invoke({ query: enhancedQuery });

  console.log(`✅ Generated detailed itinerary for ${destinationName}`);

  // Return with mode metadata
  return {
    mode: "detailed",
    destination: destinationName,
    content: result
  };
}

// CONTEXTUAL CHAT CHAIN (for follow-up questions about specific destination)
export async function createContextualChatChain(userMessage, context) {
  const { selectedDestination, userPreferences } = context;

  console.log(`💬 Creating contextual chat for: ${selectedDestination}`);

  // Search for relevant info about the selected destination
  const searchQuery = `${userMessage} ${selectedDestination}`;
  const relevantDocs = await searchDestinations(searchQuery, 3);
  const contextInfo = relevantDocs.map(doc => doc.pageContent).join("\n\n");

  const promptTemplate = PromptTemplate.fromTemplate(`
    ${SYSTEM_PROMPT}

    CONTEXT:
    - User is planning a trip to: ${selectedDestination}
    - Their preferences: ${JSON.stringify(userPreferences || {{}})}
    - They have already seen the detailed itinerary

    Relevant information about ${selectedDestination}:
    {context}

    User's question: {question}

    Provide a helpful, specific answer about ${selectedDestination}.
    Be conversational and reference their itinerary when relevant.
    If they ask about modifications, explain how to adjust the itinerary.
    Keep your answer concise but informative.
  `);

  const chain = promptTemplate.pipe(getLLM()).pipe(new StringOutputParser());

  const result = await chain.invoke({
    context: contextInfo,
    question: userMessage
  });

  console.log(`✅ Generated contextual chat response for ${selectedDestination}`);

  return {
    mode: "chat",
    message: result.trim()
  };
}

// MAIN ROUTER CHAIN
export async function handleChatQuery(userMessage, context = {}) {
  try {
    console.log("🔍 Processing query:", userMessage);
    console.log("📋 Context:", context);

    // Check if user has seen detailed itinerary (chat mode)
    if (context.hasSeenItinerary && context.selectedDestination) {
      console.log("💬 User in chat mode for:", context.selectedDestination);

      // Check if this is a new destination selection
      if (isDestinationSelection(userMessage)) {
        const destinationName = extractDestinationName(userMessage);
        if (destinationName) {
          console.log(`✅ New destination selection: ${destinationName}`);
          return await createDetailedItineraryChain(userMessage, destinationName);
        }
      }

      // Otherwise, this is a follow-up question - use contextual chat
      return await createContextualChatChain(userMessage, context);
    }

    // Check if user is selecting a destination
    if (isDestinationSelection(userMessage)) {
      const destinationName = extractDestinationName(userMessage);
      if (destinationName) {
        console.log(`✅ Detected destination selection: ${destinationName}`);
        return await createDetailedItineraryChain(userMessage, destinationName);
      } else {
        console.log("⚠️ Selection detected but no valid destination found");
      }
    }

    // Otherwise, return comparison
    console.log("📊 Returning comparison mode");
    return await createComparisonChain(userMessage, context.userPreferences || {});

  } catch (error) {
    console.error("❌ Error in handleChatQuery:", error.message);
    throw error;
  }
}

// Legacy function for backward compatibility (if needed elsewhere)
export async function getWeekendRecommendation(userQuery) {
  return await handleChatQuery(userQuery, {});
}
