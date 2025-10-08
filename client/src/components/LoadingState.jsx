import { useState, useEffect } from 'react'
import { LOADING_MESSAGES } from '../config'

function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-coral rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-peach rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-tropical-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-dark-gray font-medium transition-all duration-300">
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingState
