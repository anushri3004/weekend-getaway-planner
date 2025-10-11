function VibeSelection({ data, updateData }) {
  const vibes = [
    {
      id: 'Beach Bliss',
      emoji: '🏖️',
      title: 'Beach Bliss',
      description: 'Sun, sand, and waves',
      gradient: 'nature-gradient'
    },
    {
      id: 'Mountain Escape',
      emoji: '⛰️',
      title: 'Mountain Escape',
      description: 'Hills, valleys, and fresh air',
      gradient: 'nature-gradient'
    },
    {
      id: 'Adventure Rush',
      emoji: '🎒',
      title: 'Adventure Rush',
      description: 'Thrills, treks, and excitement',
      gradient: 'warm-gradient'
    },
    {
      id: 'Peaceful Retreat',
      emoji: '🧘',
      title: 'Peaceful Retreat',
      description: 'Calm, quiet, and rejuvenating',
      gradient: 'violet-gradient'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">
          What's your ideal getaway vibe?
        </h3>
        <p className="text-secondary">
          Choose the atmosphere that speaks to you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vibes.map((vibe) => (
          <button
            key={vibe.id}
            onClick={() => updateData('selectedVibe', vibe.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus ${
              data.selectedVibe === vibe.id
                ? 'border-primary shadow-lg scale-105'
                : 'border-neutral-light hover:border-primary hover:shadow-md'
            }`}
            aria-label={`Select ${vibe.title}: ${vibe.description}`}
            aria-pressed={data.selectedVibe === vibe.id}
          >
            <div className={`bg-gradient-to-br ${vibe.gradient} w-16 h-16 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto`}>
              <span role="img" aria-label={vibe.title}>{vibe.emoji}</span>
            </div>
            <h4 className="text-xl font-semibold text-primary mb-2">
              {vibe.title}
            </h4>
            <p className="text-sm text-secondary">
              {vibe.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default VibeSelection
