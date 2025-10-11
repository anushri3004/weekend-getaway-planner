import { Clock, MapPin } from 'lucide-react';

const ItineraryDay = ({ day }) => {
  return (
    <div className="bg-surface rounded-xl shadow-md border-2 border-neutral-light overflow-hidden hover:shadow-lg transition-shadow">
      {/* Day Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-4">
        <h3 className="text-xl font-bold">{day.title || `Day ${day.dayNumber}`}</h3>
        {day.subtitle && (
          <p className="text-sm opacity-90 mt-1">{day.subtitle}</p>
        )}
      </div>

      {/* Activities */}
      <div className="p-6 space-y-4">
        {day.activities && day.activities.map((activity, index) => (
          <div
            key={index}
            className="flex gap-4 pb-4 border-b border-neutral-light last:border-0 last:pb-0"
          >
            {/* Time */}
            <div className="flex-shrink-0 w-24">
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">{activity.time}</span>
              </div>
            </div>

            {/* Activity Details */}
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary mb-1">{activity.activity}</h4>
              <p className="text-sm text-text-secondary mb-2 leading-relaxed">{activity.details}</p>

              {activity.location && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  <span>{activity.location}</span>
                </div>
              )}
            </div>

            {/* Cost */}
            {activity.cost && (
              <div className="flex-shrink-0 text-right">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent-dark rounded-full text-sm font-semibold">
                  {activity.cost}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDay;
