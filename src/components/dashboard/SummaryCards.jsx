import MetricCard from '../common/MetricCard';

const SummaryCards = ({ expenses, departments, onFilterByStatus, activeFilter }) => {
  // Hesaplamalar
  const totalExpenses = expenses
    .filter(exp => exp.status === 'approved')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const pendingExpenses = expenses.filter(exp => exp.status === 'pending');
  const pendingCount = pendingExpenses.length;
  const pendingAmount = pendingExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const budgetUsagePercent = ((totalExpenses / totalBudget) * 100).toFixed(1);

  // Para formatı
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      {/* Total Expenses Card */}
      <div 
        onClick={() => onFilterByStatus(activeFilter === 'approved' ? null : 'approved')}
        className={`cursor-pointer transition-all duration-200 ${
          activeFilter === 'approved' ? 'ring-2 ring-green-500 ring-offset-2' : ''
        }`}
      >
        <MetricCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon="💰"
          subtitle="Onaylanmış harcamalar"
        />
      </div>

      {/* Pending Approvals Card */}
      <div 
        onClick={() => onFilterByStatus(activeFilter === 'pending' ? null : 'pending')}
        className={`cursor-pointer transition-all duration-200 ${
          activeFilter === 'pending' ? 'ring-2 ring-yellow-500 ring-offset-2' : ''
        }`}
      >
        <MetricCard
          title="Pending Approvals"
          value={`${pendingCount} adet`}
          icon="⏳"
          subtitle={`${formatCurrency(pendingAmount)} bekliyor`}
        />
      </div>

      {/* Monthly Budget Card with Progress Bar */}
      <div className="transition-all duration-200 sm:col-span-2 lg:col-span-1">
        <MetricCard
          title="Monthly Budget"
          value={formatCurrency(remainingBudget)}
          icon="📊"
          subtitle={`Toplam bütçe: ${formatCurrency(totalBudget)}`}
        >
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Kullanılan</span>
              <span>{budgetUsagePercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  budgetUsagePercent > 90
                    ? 'bg-red-500'
                    : budgetUsagePercent > 75
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${budgetUsagePercent}%` }}
              />
            </div>
          </div>
        </MetricCard>
      </div>
    </div>
  );
};

export default SummaryCards;
