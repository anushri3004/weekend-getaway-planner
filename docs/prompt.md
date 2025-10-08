# Weekend Getaway Planner - Full Stack Build Prompt for Claude Code

## Project Overview
Build a full-stack AI-powered weekend getaway planner for couples in India. The app uses RAG (Retrieval Augmented Generation) to provide personalized 2-3 day itineraries based on user preferences.

## Tech Stack
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express + LangChain.js
- **AI:** OpenAI GPT-4o-mini
- **Vector Store:** HNSWLib
- **Data:** 5 pre-written destination text files

## Project Structure
```
weekend-getaway-planner/
├── .env (OPENAI_API_KEY=your_key_here)
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── config.js (✏️ CUSTOMIZABLE)
│       └── components/
│           ├── ChatInterface.jsx
│           ├── ChatMessage.jsx
│           └── Sidebar.jsx
└── server/
    ├── package.json
    ├── index.js
    ├── langchain/
    │   ├── config.js (✏️ CUSTOMIZABLE)
    │   ├── vectorStore.js
    │   └── chains.js
    └── data/
        ├── gokarna.txt
        ├── coorg.txt
        ├── pondicherry.txt
        ├── udaipur.txt
        └── rishikesh.txt
```

## Backend Requirements

### 1. Server Dependencies (server/package.json)
```json
{
  "name": "weekend-getaway-server",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "langchain": "^0.3.0",
    "@langchain/openai": "^0.3.0",
    "@langchain/community": "^0.3.0",
    "@langchain/core": "^0.3.0",
    "openai": "^4.20.0",
    "hnswlib-node": "^3.0.0"
  }
}
```

### 2. LangChain Configuration (server/langchain/config.js)
**System Prompt:**
```
You are an expert weekend getaway planner for couples in India (aged 30-50).
Focus on: personalized recommendations, hidden gems, romantic spots, budget transparency (₹20-50k range).

Response Format:
1. Destination + Why it's perfect for their preferences
2. Day-by-day itinerary (2-3 days) with timing, activities, restaurants
3. Budget breakdown (transport, accommodation, food, activities, misc)
4. 3-5 hidden gems and romantic spots
5. Practical tips (booking, packing, local customs)
```

**Model Config:**
- Model: gpt-4o-mini
- Temperature: 0.7
- Max tokens: 2000

### 3. Vector Store (server/langchain/vectorStore.js)
- Load all .txt files from server/data/
- Use RecursiveCharacterTextSplitter (chunk size: 1000, overlap: 200)
- Create HNSWLib vector store with OpenAI embeddings
- Search function returns top 3 relevant documents

### 4. Main Server (server/index.js)
- Express server on port 3001
- CORS enabled
- Load .env from root directory
- Initialize vector store on startup
- Endpoints:
  - GET /api/health - Health check
  - POST /api/chat - Main chat endpoint (accepts {message}, returns {response})

### 5. Destination Data Files (server/data/*.txt)
Each file should contain:
- DESTINATION: Name, State
- OVERVIEW: Description, vibe, distance from major cities
- BEST TIME TO VISIT
- 2-DAY ITINERARY: Day 1 & Day 2 with morning/afternoon/evening breakdown
- BUDGET BREAKDOWN: Transport, accommodation, food, activities (₹10-50k range)
- HIDDEN GEMS: 3-5 offbeat spots
- ROMANTIC SPOTS: Couple-friendly locations
- WHERE TO STAY: Budget/mid-range/luxury options
- FOOD RECOMMENDATIONS: Specific restaurant names with prices
- LOCAL TIPS: Practical advice
- PACKING ESSENTIALS
- BOOKING TIPS

Create files for: Gokarna, Coorg, Pondicherry, Udaipur, Rishikesh

## Frontend Requirements

### 1. Client Dependencies (client/package.json)
```json
{
  "name": "weekend-getaway-client",
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### 2. Vite Config (client/vite.config.js)
- React plugin
- Server proxy: /api → http://localhost:3001

### 3. Tailwind Config (client/tailwind.config.js)
- Warm romantic color palette OR adventure blues/greens
- Content: ["./index.html", "./src/**/*.{js,jsx}"]

### 4. App Configuration (client/src/config.js) ✏️ CUSTOMIZABLE
```javascript
export const APP_CONFIG = {
  title: "✈️ Weekend Escape Planner",
  tagline: "Your perfect couple's getaway in 5 minutes",
  apiUrl: "http://localhost:3001/api",
  
  sampleQueries: [
    "Romantic beach weekend under ₹30k from Mumbai",
    "Adventure trip for couple, love trekking, October long weekend, budget ₹40k",
    "Peaceful hill station with great food, avoiding crowds, budget ₹35k from Delhi",
    "Offbeat destination for anniversary, luxury feel within ₹50k, 3 days",
    "Beach + culture mix, budget ₹25k from Bangalore"
  ],
  
  colors: {
    primary: "from-orange-500 to-pink-500", // Romantic sunset gradient
    secondary: "from-teal-400 to-blue-500", // Adventure ocean gradient
  }
};
```

### 5. Main App Component (client/src/App.jsx)
- Simple layout: Sidebar + ChatInterface
- Warm, wanderlust-inspiring design
- Mobile responsive

### 6. Chat Interface (client/src/components/ChatInterface.jsx)
- Message input box
- Submit button
- Chat history display
- Loading state while AI responds
- Error handling
- Fetch to /api/chat endpoint

### 7. Sidebar (client/src/components/Sidebar.jsx)
- App title and tagline
- Sample queries (clickable, auto-fills input)
- Clean, couple-friendly design

### 8. Chat Message Component (client/src/components/ChatMessage.jsx)
- User messages: Right-aligned, different background
- AI messages: Left-aligned, formatted with line breaks preserved
- Timestamp

## Design Guidelines
- **Color Scheme:** Romantic warm tones (oranges, pinks) OR adventure blues/greens
- **Typography:** Clean, readable, friendly
- **Spacing:** Generous padding, not cramped
- **Mobile:** Fully responsive
- **No localStorage:** Store chat state in React useState only

## Success Criteria
1. User can type a query about weekend getaways
2. AI responds with personalized destination + complete itinerary + budget
3. Response includes hidden gems and romantic spots
4. Sample queries are clickable and work
5. Clean, couple-friendly UI
6. No errors, smooth experience

## Build Instructions
1. Create all files in the structure above
2. Install dependencies: `npm install` in both client/ and server/
3. Start backend: `cd server && npm start`
4. Start frontend: `cd client && npm dev`
5. Open http://localhost:5173

## Important Notes
- .env file must be in ROOT directory with OPENAI_API_KEY
- Backend runs on port 3001, frontend on 5173 (Vite default)
- Keep it simple for 45-minute MVP - no fancy features yet
- Focus on working functionality over visual polish for V1

## Test Queries
1. "We want a relaxing beach weekend from Mumbai, budget ₹30k"
2. "Anniversary trip, love adventure + scenic views, hate crowds, budget ₹45k, October long weekend from Bangalore"

Build this complete app now!