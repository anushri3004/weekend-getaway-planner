import DestinationComparisonCard from './DestinationComparisonCard';
import { RefreshCw } from 'lucide-react';

const ComparisonView = ({ destinations, onDestinationSelect, onRefine }) => {
  if (!destinations || destinations.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center">
        <div className="bg-accent/10 border-2 border-accent/30 rounded-lg p-8">
          <div className="text-6xl mb-4" role="img" aria-label="thinking">🤔</div>
          <p className="text-lg text-text-primary mb-4 font-semibold">
            Hmm, we couldn't find destinations matching all your criteria.
          </p>
          <p className="text-text-secondary mb-6">
            Let's adjust your preferences to find the perfect getaway!
          </p>
          <button
            onClick={onRefine}
            className="bg-nature-gradient text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus hover:brightness-110"
            aria-label="Adjust your preferences"
          >
            Adjust Preferences
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 pb-12">
      {/* Header */}
      <div className="mb-8 text-center animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          Based on your preferences, here are your top matches!
          <span className="ml-2" role="img" aria-label="sparkles">✨</span>
        </h2>
        <p className="text-text-secondary text-lg">
          Compare these destinations and choose the one that excites you most
        </p>
      </div>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {destinations.map((destination, index) => (
          <div key={destination.name} className="animate-fadeIn" style={{ animationDelay: `${index * 150}ms` }}>
            <DestinationComparisonCard
              destination={destination}
              onSelect={onDestinationSelect}
              isTopPick={index === 0} // First one is top pick
            />
          </div>
        ))}
      </div>

      {/* Refine Search Option */}
      <div className="text-center pt-6 border-t-2 border-neutral-light">
        <p className="text-text-secondary mb-3">Not feeling these options?</p>
        <button
          onClick={onRefine}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
          aria-label="Adjust your search preferences"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          <span>Tell me what to adjust</span>
        </button>
      </div>
    </div>
  );
};

export default ComparisonView;
