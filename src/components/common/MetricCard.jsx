const MetricCard = ({ title, value, icon, trend, subtitle, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-xs md:text-sm font-medium text-gray-600">{title}</h3>
        {icon && (
          <div className="text-xl md:text-2xl text-gray-400">
            {icon}
          </div>
        )}
      </div>

      {/* Main Value */}
      <div className="mb-2">
        <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
      </div>

      {/* Trend or Subtitle */}
      {(trend || subtitle) && (
        <p className="text-xs md:text-sm text-gray-500 mb-3">
          {trend || subtitle}
        </p>
      )}

      {/* Custom Content (e.g., Progress Bar) */}
      {children && (
        <div className="mt-3 md:mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
