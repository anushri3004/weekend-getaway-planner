import { Calendar, Sparkles } from 'lucide-react'

function DateRangePicker({ data, updateData }) {
  const isLongWeekend = () => {
    if (!data.startDate || !data.endDate) return false

    const start = new Date(data.startDate)
    const end = new Date(data.endDate)

    const startDay = start.getDay() // 0 = Sunday, 5 = Friday, 6 = Saturday
    const endDay = end.getDay() // 1 = Monday

    // Check if starts on Friday/Saturday and ends on Monday
    return (startDay === 5 || startDay === 6) && endDay === 1
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getTripDuration = () => {
    if (data.startDate && data.endDate && new Date(data.endDate) > new Date(data.startDate)) {
      return Math.ceil((new Date(data.endDate) - new Date(data.startDate)) / (1000 * 60 * 60 * 24))
    }
    return 0
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">
          When do you want to travel?
        </h3>
        <p className="text-secondary">
          Pick your travel dates
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Start Date */}
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-primary mb-2">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral" size={20} aria-hidden="true" />
            <input
              id="start-date"
              type="date"
              value={data.startDate}
              min={getTodayDate()}
              onChange={(e) => updateData('startDate', e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-neutral-light rounded-lg focus:border-primary focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus text-lg bg-surface text-primary"
              aria-label="Select start date for your trip"
            />
          </div>
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-primary mb-2">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral" size={20} aria-hidden="true" />
            <input
              id="end-date"
              type="date"
              value={data.endDate}
              min={data.startDate || getTodayDate()}
              onChange={(e) => updateData('endDate', e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-neutral-light rounded-lg focus:border-primary focus:outline-none focus:ring-focus focus:ring-primary focus:ring-offset-focus text-lg bg-surface text-primary"
              aria-label="Select end date for your trip"
            />
          </div>
        </div>

        {/* Long Weekend Detection */}
        {isLongWeekend() && (
          <div className="p-4 bg-gradient-to-r violet-gradient border-2 border-secondary rounded-lg animate-fadeIn" role="status" aria-live="polite">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={24} className="text-secondary" aria-hidden="true" />
              <p className="font-semibold">
                Long weekend! <span role="img" aria-label="sparkles">✨</span> Perfect timing for a getaway!
              </p>
            </div>
          </div>
        )}

        {/* Trip Duration */}
        {getTripDuration() > 0 && (
          <div className="p-4 bg-surface border border-neutral-light rounded-lg text-center" role="status" aria-live="polite">
            <p className="text-primary">
              <span role="img" aria-label="calendar">📅</span> Trip Duration: <strong>{getTripDuration()} days</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DateRangePicker
