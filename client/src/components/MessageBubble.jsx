import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MessageBubble({ message, isUser }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div className={`max-w-3xl rounded-2xl p-6 shadow-lg ${
        isUser
          ? 'bg-tropical-teal text-white'
          : 'bg-white text-dark-gray border border-gray-100'
      }`}>
        {isUser ? (
          <div className="whitespace-pre-wrap font-medium">{message.text}</div>
        ) : (
          <div className="prose prose-sm max-w-none
            prose-headings:text-coral prose-headings:font-bold
            prose-strong:text-dark-gray prose-strong:font-semibold
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700
            prose-table:border-collapse prose-table:w-full
            prose-th:bg-gradient-to-r prose-th:from-coral/20 prose-th:to-peach/20
            prose-th:text-dark-gray prose-th:font-bold prose-th:border prose-th:border-gray-300 prose-th:p-3
            prose-td:border prose-td:border-gray-200 prose-td:p-3 prose-td:text-gray-700
            prose-tr:hover:bg-peach/5 prose-tr:transition-colors
            prose-a:text-tropical-teal prose-a:no-underline hover:prose-a:underline
            prose-code:text-coral prose-code:bg-coral/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-blockquote:border-l-4 prose-blockquote:border-coral prose-blockquote:bg-coral/5 prose-blockquote:italic
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
          </div>
        )}
        <div className={`text-xs mt-3 ${isUser ? 'text-white/80' : 'text-gray-400'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
