import { MapPin } from 'lucide-react'

function DepartureCity({ data, updateData }) {
  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Pune',
    'Hyderabad',
    'Chennai'
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">
          Where are you starting from?
        </h3>
        <p className="text-secondary">
          Select your departure city
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral" size={20} aria-hidden="true" />
          <label htmlFor="departure-city" className="sr-only">
            Select your departure city
          </label>
          <select
            id="departure-city"
            value={data.departureCity || ''}
            onChange={(e) => updateData('departureCity', e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-neutral-light rounded-lg focus:border-primary focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus text-lg appearance-none bg-surface cursor-pointer text-primary"
            aria-label="Departure city selection"
          >
            <option value="">Select your city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {data.departureCity && (
          <div className="mt-4 p-4 bg-surface border border-primary rounded-lg text-center animate-fadeIn">
            <p className="text-primary">
              <span role="img" aria-label="airplane">✈️</span> Starting from <strong>{data.departureCity}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DepartureCity
