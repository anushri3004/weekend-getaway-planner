import { Wallet } from 'lucide-react'

function BudgetSlider({ data, updateData }) {
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">
          What's your budget?
        </h3>
        <p className="text-secondary">
          Budget for 2 people, all-inclusive
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white text-center mb-6">
          <Wallet className="mx-auto mb-2" size={40} aria-hidden="true" />
          <div className="text-5xl font-bold mb-2">
            {formatCurrency(data.budget)}
          </div>
          <p className="text-white/90">Total trip budget</p>
        </div>

        <div className="px-4">
          <label htmlFor="budget-slider" className="sr-only">
            Budget amount in rupees, range from 20,000 to 1,00,000
          </label>
          <input
            id="budget-slider"
            type="range"
            min="20000"
            max="100000"
            step="5000"
            value={data.budget}
            onChange={(e) => updateData('budget', parseInt(e.target.value))}
            className="w-full h-3 bg-neutral-light rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus"
            aria-valuemin="20000"
            aria-valuemax="100000"
            aria-valuenow={data.budget}
            aria-valuetext={formatCurrency(data.budget)}
          />

          <div className="flex justify-between text-sm text-secondary mt-2">
            <span>₹20,000</span>
            <span>₹1,00,000</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-surface border border-neutral-light rounded-lg">
          <p className="text-sm text-primary text-center">
            <span role="img" aria-label="light bulb">💡</span> This includes accommodation, food, transport, and activities for 2 people
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0F766E, #7C3AED);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0F766E, #7C3AED);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.2);
        }

        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.2);
        }
      `}</style>
    </div>
  )
}

export default BudgetSlider
