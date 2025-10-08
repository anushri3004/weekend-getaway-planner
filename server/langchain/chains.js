import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { searchDestinations } from "./vectorStore.js";
import { SYSTEM_PROMPT, MODEL_CONFIG } from "./config.js";

// Initialize the LLM (lazily, so env vars are loaded)
function getLLM() {
  return new ChatOpenAI({
    modelName: MODEL_CONFIG.modelName,
    temperature: MODEL_CONFIG.temperature,
    maxTokens: MODEL_CONFIG.maxTokens,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
}

// ✏️ CUSTOMIZABLE: Prompt template for weekend getaway planning
const PROMPT_TEMPLATE = `${SYSTEM_PROMPT}

CONTEXT FROM DESTINATION DATABASE:
{context}

USER QUERY:
{query}

Based on the user's preferences and the destination information provided, create a personalized weekend getaway recommendation. Include:

1. **Destination Recommendation & Why It's Perfect**
   - Which destination(s) match their preferences
   - Clear reasoning for the recommendation

2. **Complete 2-3 Day Itinerary**
   Format the itinerary as a markdown table with columns: Day | Time | Activity | Details | Cost (₹)

   Example:
   | Day | Time | Activity | Details | Cost (₹) |
   |-----|------|----------|---------|----------|
   | Day 1 | 8:00 AM | Breakfast | Café ABC - Continental breakfast | 500 |
   | Day 1 | 10:00 AM | Beach Visit | Relax at XYZ Beach, water sports | 1,000 |

3. **Budget Breakdown**
   Format as a markdown table:
   | Category | Details | Cost (₹) |
   |----------|---------|----------|
   | Transport | Round trip from City | X |
   | Accommodation | 2-3 nights at Hotel ABC | Y |
   | Food | All meals | Z |
   | Activities | Entry fees, sports | A |
   | Miscellaneous | Shopping, tips | B |
   | **Total** | | **XYZ** |

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

const prompt = PromptTemplate.fromTemplate(PROMPT_TEMPLATE);

// Create the RAG chain
export async function createWeekendPlannerChain() {
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

  return chain;
}

// Helper function to invoke the chain
export async function getWeekendRecommendation(userQuery) {
  try {
    console.log("🔍 Processing query:", userQuery);

    const chain = await createWeekendPlannerChain();
    const response = await chain.invoke({ query: userQuery });

    console.log("✅ Generated recommendation");
    return response;
  } catch (error) {
    console.error("❌ Error generating recommendation:", error.message);
    throw error;
  }
}