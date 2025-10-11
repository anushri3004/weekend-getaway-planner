function InterestTags({ data, updateData }) {
  const interests = [
    { id: 'Foodie', emoji: '🍜', label: 'Foodie' },
    { id: 'Instagram-worthy', emoji: '📸', label: 'Instagram-worthy' },
    { id: 'Culture', emoji: '🏛️', label: 'Culture' },
    { id: 'Water Sports', emoji: '🌊', label: 'Water Sports' },
    { id: 'Romantic Sunsets', emoji: '🌅', label: 'Romantic Sunsets' },
    { id: 'Nightlife', emoji: '🎭', label: 'Nightlife' },
    { id: 'Wellness', emoji: '🧘', label: 'Wellness' },
    { id: 'Nature', emoji: '🏞️', label: 'Nature' }
  ]

  const toggleInterest = (interestId) => {
    const currentInterests = data.interests || []
    if (currentInterests.includes(interestId)) {
      updateData('interests', currentInterests.filter(i => i !== interestId))
    } else {
      updateData('interests', [...currentInterests, interestId])
    }
  }

  const isSelected = (interestId) => {
    return (data.interests || []).includes(interestId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">
          What interests you?
        </h3>
        <p className="text-secondary">
          Select all that apply (optional)
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="group" aria-label="Interest selection">
          {interests.map((interest) => (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus ${
                isSelected(interest.id)
                  ? 'border-primary bg-gradient-to-br accent-gradient shadow-md scale-105'
                  : 'border-neutral-light hover:border-primary hover:shadow-sm bg-surface'
              }`}
              aria-label={interest.label}
              aria-pressed={isSelected(interest.id)}
            >
              <div className="text-3xl mb-2">
                <span role="img" aria-label={interest.label}>{interest.emoji}</span>
              </div>
              <div className={`text-sm font-medium ${
                isSelected(interest.id) ? 'text-primary' : 'text-secondary'
              }`}>
                {interest.label}
              </div>
            </button>
          ))}
        </div>

        {data.interests && data.interests.length > 0 && (
          <div className="mt-6 p-4 bg-surface border border-primary rounded-lg">
            <p className="text-sm text-primary text-center">
              <span role="img" aria-label="sparkles">✨</span> Selected <strong>{data.interests.length}</strong> interest{data.interests.length > 1 ? 's' : ''}: {data.interests.join(', ')}
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-surface border border-neutral-light rounded-lg">
          <p className="text-sm text-secondary text-center">
            <span role="img" aria-label="light bulb">💡</span> Don't see what you're looking for? No worries! You can specify more in the chat later.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InterestTags
