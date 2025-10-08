import { SAMPLE_QUERIES } from '../config'

function SampleQueries({ onQuerySelect }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-dark-gray mb-3 uppercase tracking-wide">
        Popular Getaways
      </h3>
      <div className="space-y-3">
        {SAMPLE_QUERIES.map((item, index) => (
          <button
            key={index}
            onClick={() => onQuerySelect(item.query)}
            className="w-full text-left p-4 rounded-xl bg-white hover:bg-gradient-to-br hover:from-coral/10 hover:to-peach/10 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 hover:border-coral/30 group"
          >
            <div className="flex items-start space-x-3">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {item.emoji}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-dark-gray group-hover:text-coral transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
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
