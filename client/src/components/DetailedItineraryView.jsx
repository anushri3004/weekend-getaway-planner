import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Download, Share2, FileText, File } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import WeatherWidget from './WeatherWidget';
import { exportToPDF, exportToWord, shareItinerary } from '../utils/exportUtils';

const DetailedItineraryView = ({
  itinerary,
  onBack,
  onChatMessage,
  chatMessages,
  isLoadingChat,
  userPreferences
}) => {
  const [chatInput, setChatInput] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const chatEndRef = useRef(null);
  const exportMenuRef = useRef(null);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showExportMenu]);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      onChatMessage(chatInput.trim());
      setChatInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Export handlers
  const handleExportPDF = async () => {
    setExportStatus('Generating PDF...');
    try {
      console.log('Starting PDF export...', {
        content: itinerary.content?.substring(0, 100),
        destination: itinerary.destination
      });
      await exportToPDF(itinerary.content, itinerary.destination, userPreferences);
      setExportStatus('PDF downloaded successfully!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      console.error('PDF Export Error:', error);
      setExportStatus(`Error: ${error.message}`);
      setTimeout(() => setExportStatus(''), 5000);
    }
    setShowExportMenu(false);
  };

  const handleExportWord = async () => {
    setExportStatus('Generating Word document...');
    try {
      console.log('Starting Word export...', {
        content: itinerary.content?.substring(0, 100),
        destination: itinerary.destination
      });
      await exportToWord(itinerary.content, itinerary.destination, userPreferences);
      setExportStatus('Word document downloaded successfully!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      console.error('Word Export Error:', error);
      setExportStatus(`Error: ${error.message}`);
      setTimeout(() => setExportStatus(''), 5000);
    }
    setShowExportMenu(false);
  };

  const handleShare = async () => {
    setExportStatus('Sharing...');
    try {
      console.log('Starting share...', {
        content: itinerary.content?.substring(0, 100),
        destination: itinerary.destination
      });
      const result = await shareItinerary(itinerary.content, itinerary.destination, userPreferences);
      if (result.success) {
        if (result.fallback === 'copied') {
          setExportStatus('Itinerary copied to clipboard!');
        } else {
          setExportStatus('Shared successfully!');
        }
      } else {
        setExportStatus(result.error || 'Sharing failed');
      }
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      console.error('Share Error:', error);
      setExportStatus(`Error: ${error.message}`);
      setTimeout(() => setExportStatus(''), 5000);
    }
  };

  const suggestedQuestions = [
    "What are the best vegetarian restaurants?",
    "Can you suggest budget-friendly hotels?",
    "What's the weather like?",
    "Are there water sports available?",
    "What time should I visit the temple?"
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-surface border-b-2 border-neutral-light shadow-sm z-20 px-4 md:px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-text-primary hover:text-primary font-medium transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
            aria-label="Back to destination options"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>Back to Options</span>
          </button>

          {/* Export and Share Buttons */}
          <div className="flex items-center gap-2 relative">
            {/* Export Status Message */}
            {exportStatus && (
              <div className="absolute right-0 top-12 bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap animate-fadeIn">
                {exportStatus}
              </div>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Share itinerary"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Export Dropdown */}
            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-accent text-white rounded-lg font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                aria-label="Export itinerary"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Export</span>
              </button>

              {/* Export Menu */}
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-neutral-light z-30 animate-fadeIn">
                  <button
                    onClick={handleExportPDF}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors text-text-primary border-b border-neutral-light"
                  >
                    <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="font-medium">Export as PDF</span>
                  </button>
                  <button
                    onClick={handleExportWord}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 transition-colors text-text-primary"
                  >
                    <File className="w-4 h-4 text-secondary" aria-hidden="true" />
                    <span className="font-medium">Export as Word</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="bg-warm-gradient text-white p-8 md:p-10 rounded-2xl shadow-xl mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <span role="img" aria-label="sparkles">✨</span>
            Your {itinerary.destination} Weekend Itinerary
          </h1>
          <p className="text-lg opacity-95">
            Everything you need for an amazing getaway!
          </p>
        </div>

        {/* Weather Widget */}
        <div className="mb-8 animate-fadeIn">
          <WeatherWidget
            cityName={itinerary.destination}
            startDate={userPreferences?.startDate}
            endDate={userPreferences?.endDate}
          />
        </div>

        {/* Itinerary Content */}
        <div className="bg-surface rounded-xl shadow-md border-2 border-neutral-light p-6 md:p-8 mb-10">
          <div className="prose prose-sm max-w-none
            prose-headings:text-secondary prose-headings:font-bold
            prose-strong:text-text-primary prose-strong:font-semibold
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-li:text-text-secondary
            prose-table:border-collapse prose-table:w-full
            prose-th:bg-gradient-to-r prose-th:from-secondary/10 prose-th:to-primary/10
            prose-th:text-text-primary prose-th:font-bold prose-th:border-2 prose-th:border-neutral prose-th:p-3
            prose-td:border prose-td:border-neutral-light prose-td:p-3 prose-td:text-text-secondary
            prose-tr:hover:bg-primary/5 prose-tr:transition-colors
            prose-a:text-primary prose-a:underline hover:prose-a:text-primary-dark focus:prose-a:ring-2 focus:prose-a:ring-primary
            prose-code:text-secondary prose-code:bg-secondary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:italic
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {itinerary.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* CHAT SECTION */}
        <div className="border-t-4 border-primary/30 pt-10 pb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 flex items-center gap-3">
            <span role="img" aria-label="chat">💬</span>
            Ask me anything
          </h2>
          <p className="text-text-secondary mb-6 text-lg">
            I can help with food options, activity modifications, packing advice, any other questions about your itinerary or help you plan another trip - Just say "Plan another trip" and I will assist you!
          </p>

          {/* Chat History */}
          <div className="bg-surface rounded-xl border-2 border-neutral-light shadow-sm mb-6">
            <div className="p-6 max-h-96 overflow-y-auto space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-8 text-text-secondary">
                  <div className="text-5xl mb-3" role="img" aria-label="waving hand">👋</div>
                  <p className="mb-2 font-medium">No questions yet. Start chatting!</p>
                  <p className="text-sm">Try asking about vegetarian options, activities, or logistics.</p>
                </div>
              ) : (
                <>
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md lg:max-w-lg px-4 py-3 rounded-lg shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-neutral-light text-text-primary border border-neutral'
                      }`}>
                        {msg.role === 'assistant' && (
                          <div className="font-semibold text-sm text-primary mb-1">
                            Travel Assistant
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </>
              )}

              {/* Loading indicator */}
              {isLoadingChat && (
                <div className="flex justify-start">
                  <div className="bg-neutral-light border border-neutral px-4 py-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Input */}
          <div className="bg-surface rounded-xl border-2 border-neutral-light focus-within:border-primary transition p-4 shadow-sm">
            <div className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="E.g., What are vegetarian food options? Can we add yoga on Day 2?"
                className="flex-1 px-4 py-3 border-0 focus:outline-none text-text-primary bg-transparent"
                disabled={isLoadingChat}
                aria-label="Chat message input"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isLoadingChat}
                className="px-6 py-3 bg-nature-gradient text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus hover:brightness-110"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="mt-5">
            <p className="text-sm text-text-secondary mb-3 font-medium">Quick questions to get started:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setChatInput(question)}
                  className="px-4 py-2 text-sm border-2 border-neutral-light rounded-full hover:bg-primary/5 hover:border-primary transition-colors text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`Ask: ${question}`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedItineraryView;
