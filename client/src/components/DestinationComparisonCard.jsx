import { Check, MapPin, Clock, DollarSign, Sparkles } from 'lucide-react';

const DestinationComparisonCard = ({ destination, onSelect, isTopPick }) => {
  // Determine match score color
  const getScoreColor = (score) => {
    if (score >= 90) return 'from-success to-primary-light';
    if (score >= 80) return 'from-accent to-accent-light';
    return 'from-secondary to-secondary-light';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-success/10 text-success';
    if (score >= 80) return 'bg-accent/10 text-accent-dark';
    return 'bg-secondary/10 text-secondary';
  };

  return (
    <div className="relative bg-surface rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 border-2 border-neutral-light hover:border-primary">
      {/* Top Pick Badge */}
      {isTopPick && (
        <div className="absolute -top-3 -right-3 bg-accent text-text-primary px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-10 flex items-center gap-1">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Top Pick</span>
        </div>
      )}

      {/* Destination Name & Tagline */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-text-primary mb-1">{destination.name}</h3>
        <p className="text-text-secondary text-sm">{destination.tagline}</p>
      </div>

      {/* Match Score */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">Perfect Match</span>
          <span className={`text-lg font-bold px-3 py-1 rounded-full ${getScoreBgColor(destination.matchScore)}`}>
            {destination.matchScore}%
          </span>
        </div>
        <div className="w-full bg-neutral-light rounded-full h-2.5">
          <div
            className={`bg-gradient-to-r ${getScoreColor(destination.matchScore)} rounded-full h-2.5 transition-all duration-500`}
            style={{ width: `${destination.matchScore}%` }}
            role="progressbar"
            aria-valuenow={destination.matchScore}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`Match score: ${destination.matchScore}%`}
          />
        </div>
      </div>

      {/* Why Perfect Section */}
      <div className="mb-5 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
        <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
          Why it's perfect for you
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">{destination.whyPerfect}</p>
      </div>

      {/* Pros List */}
      <div className="mb-5">
        <ul className="space-y-2.5" role="list">
          {destination.pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="leading-snug">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-3 mb-5">
        {/* Budget */}
        <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
          <DollarSign className="w-5 h-5 text-neutral flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs text-text-secondary font-medium">Budget</p>
            <p className="text-sm font-semibold text-text-primary">{destination.budget}</p>
          </div>
        </div>

        {/* Travel Time */}
        <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
          <Clock className="w-5 h-5 text-neutral flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs text-text-secondary font-medium">Travel Time</p>
            <p className="text-sm font-semibold text-text-primary">{destination.travelTime}</p>
          </div>
        </div>

        {/* Best For */}
        <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
          <MapPin className="w-5 h-5 text-neutral flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs text-text-secondary font-medium">Best For</p>
            <p className="text-sm font-semibold text-text-primary">{destination.bestFor}</p>
          </div>
        </div>
      </div>

      {/* Hidden Gem Highlight */}
      <div className="mb-5 p-4 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg border border-secondary/30">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-lg" role="img" aria-label="gem">💎</span>
          <h4 className="text-xs font-semibold text-secondary uppercase tracking-wide">
            Hidden Gem
          </h4>
        </div>
        <p className="text-sm text-text-secondary">{destination.hiddenGem}</p>
      </div>

      {/* Quick Preview */}
      <div className="mb-5 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-xs text-primary font-medium mb-1">Quick Itinerary Preview:</p>
        <p className="text-sm text-text-secondary">{destination.quickItineraryPreview}</p>
      </div>

      {/* Best Time to Visit */}
      <div className="mb-5">
        <p className="text-xs text-text-secondary">
          <span className="font-medium">Best Time:</span> {destination.bestTimeToVisit}
        </p>
      </div>

      {/* Choose Button */}
      <button
        onClick={() => onSelect(destination.name)}
        className="w-full bg-nature-gradient text-white py-3.5 px-6 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:brightness-110 flex items-center justify-center gap-2 focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus"
        aria-label={`Choose ${destination.name} for your trip`}
      >
        Choose {destination.name}
        <span className="text-xl" aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default DestinationComparisonCard;
