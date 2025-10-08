import { useState } from 'react'
import SampleQueries from './components/SampleQueries'
import ChatInterface from './components/ChatInterface'
import { APP_CONFIG, SAMPLE_QUERIES } from './config'

function App() {
  const [currentQuery, setCurrentQuery] = useState('')

  const handleSampleQuery = (query) => {
    setCurrentQuery(query)
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Hero Section - Compact */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-pink-400 to-rose-400 py-6 px-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title with Icon */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <span className="text-3xl">🌅</span>
            Your Perfect Weekend Escape Awaits
          </h1>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-white/95 text-xs md:text-sm">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
              <span>💑</span>
              <span>Personalized</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
              <span>🎒</span>
              <span>Offbeat</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
              <span>💰</span>
              <span>Budget-friendly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sample Queries - Horizontal Scroll */}
      <div className="lg:hidden px-4 py-2 overflow-x-auto bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex gap-3 pb-2">
          {SAMPLE_QUERIES.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSampleQuery(query.query)}
              className="flex-shrink-0 p-2 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 bg-white min-w-[160px] transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{query.emoji}</span>
                <div className="text-left">
                  <h3 className="font-semibold text-xs text-gray-800">{query.title}</h3>
                  <p className="text-xs text-gray-500">{query.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop only */}
        <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
              Popular Getaways
            </h2>
            <SampleQueries onQuerySelect={handleSampleQuery} />
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 bg-gradient-to-b from-orange-50/30 to-pink-50/30">
          <ChatInterface initialQuery={currentQuery} />
        </main>
      </div>
    </div>
  )
}

export default App
