# WEEKEND GETAWAY PLANNER - FRONTEND BUILD PROMPT

## CONTEXT
I need you to build a React + Vite + Tailwind CSS frontend for a Weekend Getaway Planner app for couples. The backend is already running on `http://localhost:3001` with a `/api/chat` endpoint.

## PROJECT STRUCTURE
Create the following structure in the `client` folder:

```
client/
├── package.json (already exists)
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── config.js
│   └── components/
│       ├── ChatInterface.jsx
│       ├── MessageBubble.jsx
│       ├── SampleQueries.jsx
│       └── LoadingState.jsx
```

## DESIGN THEME: ROMANTIC SUNSET 🌅

**Color Palette:**
- Primary: Coral `#FF6B6B`, Peach `#FFE66D`
- Accent: Tropical Teal `#4ECDC4`
- Background: Soft Cream `#FFF8F0`
- Text: Dark Gray `#2C3E50`
- Gradients: Use sunset gradients (coral to peach to soft orange)

**Design Principles:**
- Warm, romantic, wanderlust-inspiring
- Clean, modern, mobile-responsive
- Icons for visual interest (use emojis: 🌅☀️🌙✈️🏨🍽️💎❤️)
- Smooth animations and transitions
- Card-based layout with shadows

## FEATURES TO IMPLEMENT

### 1. Hero Section
```
✈️ Your Perfect Weekend Escape Awaits
Plan romantic getaways in under 5 minutes

💑 Personalized for couples | 🎒 Offbeat destinations | 💰 Budget-friendly
```
- Gradient background (coral to peach)
- White text, centered
- Inspiring tagline

### 2. Chat Interface
- Clean chat bubbles (user: teal, AI: white with shadow)
- Input box at bottom with "Ask me anything..." placeholder
- Send button with arrow icon or emoji
- Auto-scroll to latest message
- Loading state with travel quotes

### 3. Sample Queries Sidebar (Desktop) / Top Pills (Mobile)
Display these as clickable cards:
```javascript
[
  {
    emoji: "🏖️",
    title: "Romantic Beach Weekend",
    subtitle: "Under ₹30k • Peaceful vibe",
    query: "Romantic beach weekend under ₹30k from Mumbai"
  },
  {
    emoji: "⛰️",
    title: "Adventure Hill Station",
    subtitle: "Trekking • Scenic views",
    query: "Adventure trip for couple, love trekking, budget ₹40k"
  },
  {
    emoji: "🏛️",
    title: "Heritage & Culture",
    subtitle: "Palaces • History",
    query: "Offbeat destination with heritage and culture, budget ₹35k"
  },
  {
    emoji: "☕",
    title: "Coffee & Nature",
    subtitle: "Peaceful • Romantic",
    query: "Peaceful hill station with great food, budget ₹35k from Bangalore"
  },
  {
    emoji: "🎉",
    title: "Anniversary Special",
    subtitle: "Luxury • Romantic",
    query: "Anniversary trip for couple, luxury feel within ₹50k, 3 days"
  }
]
```

### 4. AI Response Formatting
When displaying AI responses, format them with:

**Visual Structure:**
- Destination name as large heading with emoji
- "Why it's perfect" in highlighted box
- Day cards with timeline:
  - 🌅 Morning | ☀️ Afternoon | 🌙 Evening
  - Each with time, activity, cost
- Budget breakdown with icons:
  - ✈️ Transport: ₹X
  - 🏨 Accommodation: ₹Y
  - 🍽️ Food: ₹Z
  - 🎫 Activities: ₹A
  - Total in bold
- 💎 Hidden Gems section (amber/golden background)
- ❤️ Romantic Spots section (pink/rose background)
- 📝 Practical Tips section

**Preserve the AI's text content** but wrap it in these visual components. Use regex or simple parsing to identify sections.

### 5. Loading State
Show rotating messages while AI is thinking:
```javascript
[
  "✨ Finding your perfect escape...",
  "🗺️ Discovering hidden gems...",
  "📅 Planning the perfect weekend...",
  "💡 Curating romantic spots...",
  "🎒 Preparing your itinerary..."
]
```

### 6. Mobile Responsive
- Stack sidebar on top for mobile
- Full-width chat on mobile
- Touch-friendly buttons
- Readable text sizes

## TECHNICAL REQUIREMENTS

### API Integration
```javascript
// POST to http://localhost:3001/api/chat
// Body: { message: "user query" }
// Response: { response: "AI text", timestamp: "ISO string" }
```

### State Management
Use React useState for:
- messages array (user and AI messages)
- loading state
- input value

### Styling
- Use Tailwind CSS utility classes
- Custom gradients in tailwind.config.js
- Smooth transitions (transition-all duration-300)
- Hover effects on cards
- Box shadows for depth

## CONFIG FILE (src/config.js)
```javascript
export const APP_CONFIG = {
  appTitle: "✈️ Weekend Escape Planner",
  tagline: "Your perfect couple's getaway in 5 minutes",
  apiUrl: "http://localhost:3001/api",
  theme: {
    primary: "#FF6B6B",
    secondary: "#FFE66D", 
    accent: "#4ECDC4",
    background: "#FFF8F0",
    text: "#2C3E50"
  }
};

export const SAMPLE_QUERIES = [
  // ... (from above)
];

export const LOADING_MESSAGES = [
  // ... (from above)
];
```

## FILE CONTENTS NEEDED

### index.html
Basic HTML with:
- Title: "Weekend Escape Planner"
- Meta tags for mobile responsive
- Root div for React
- Link to main.jsx

### vite.config.js
Standard Vite + React config

### tailwind.config.js
Custom theme with romantic sunset colors

### postcss.config.js
Standard PostCSS config for Tailwind

### src/index.css
Tailwind directives + custom styles

### src/main.jsx
React 18 entry point

### src/App.jsx
Main app component with layout

### src/components/ChatInterface.jsx
Chat UI with messages, input, send button

### src/components/MessageBubble.jsx
Individual message component with formatting for AI responses

### src/components/SampleQueries.jsx
Clickable sample query cards

### src/components/LoadingState.jsx
Loading animation with rotating messages

## SUCCESS CRITERIA
✅ Beautiful romantic sunset themed UI
✅ Fully responsive (mobile + desktop)
✅ Chat interface works (send message, receive AI response)
✅ Sample queries are clickable and auto-fill
✅ AI responses are formatted with visual sections
✅ Loading state shows while waiting
✅ No errors in console
✅ Smooth animations and transitions

## ADDITIONAL NOTES
- Keep code clean and well-commented
- Use functional React components with hooks
- Follow React best practices
- Ensure accessibility (semantic HTML, ARIA labels)
- Handle errors gracefully (show error message if API fails)

Generate all the necessary files to make this work. I should be able to run `npm install` and `npm run dev` in the client folder to see the app running on localhost:5173.

Make it feel like a premium travel app that couples would be excited to use! 🌴✨