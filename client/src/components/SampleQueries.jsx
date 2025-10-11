import { SAMPLE_QUERIES } from '../config'

function SampleQueries({ onQuerySelect }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
        Popular Getaways
      </h3>
      <div className="space-y-3">
        {SAMPLE_QUERIES.map((item, index) => (
          <button
            key={index}
            onClick={() => onQuerySelect(item.query)}
            className="w-full text-left p-4 rounded-xl bg-surface hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 shadow-sm hover:shadow-md border-2 border-neutral-light hover:border-primary group focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus"
            aria-label={`Select ${item.title}`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-3xl transition-transform duration-200" role="img" aria-label={item.title}>
                {item.emoji}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SampleQueries
