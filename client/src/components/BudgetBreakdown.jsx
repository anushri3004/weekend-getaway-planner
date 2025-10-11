const BudgetBreakdown = ({ breakdown }) => {
  if (!breakdown || !breakdown.items) {
    return null;
  }

  return (
    <div className="bg-surface rounded-xl shadow-md border-2 border-neutral-light overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-success/10 to-primary/10">
              <th className="text-left px-6 py-4 text-text-primary font-semibold border-b-2 border-neutral">
                Category
              </th>
              <th className="text-left px-6 py-4 text-text-primary font-semibold border-b-2 border-neutral">
                Details
              </th>
              <th className="text-right px-6 py-4 text-text-primary font-semibold border-b-2 border-neutral">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {breakdown.items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-neutral-light hover:bg-primary/5 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-text-primary">{item.category}</td>
                <td className="px-6 py-4 text-text-secondary text-sm">{item.details}</td>
                <td className="px-6 py-4 text-right font-semibold text-text-primary">{item.cost}</td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-gradient-to-r from-accent/20 to-accent-light/20 border-t-2 border-accent">
              <td className="px-6 py-4 font-bold text-text-primary">TOTAL</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4 text-right">
                <span className="text-xl font-bold text-accent-dark">{breakdown.total}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Budget Note */}
      {breakdown.note && (
        <div className="px-6 py-4 bg-primary/5 border-t border-neutral-light">
          <p className="text-sm text-text-secondary flex items-start gap-2">
            <span className="text-primary" role="img" aria-label="info">💡</span>
            <span>{breakdown.note}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetBreakdown;
