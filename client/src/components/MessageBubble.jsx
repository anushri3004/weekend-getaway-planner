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
          ? 'bg-primary text-white border-2 border-primary'
          : 'bg-surface text-text-primary border-2 border-neutral-light'
      }`}>
        {isUser ? (
          <div className="whitespace-pre-wrap font-medium">{message.text}</div>
        ) : (
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
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
          </div>
        )}
        <div className={`text-xs mt-3 ${isUser ? 'text-white/90' : 'text-text-secondary'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
