import MetricCard from '../common/MetricCard';

const SummaryCards = ({ expenses, departments }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Expenses Card */}
      <MetricCard
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon="💰"
        subtitle="Onaylanmış harcamalar"
      />

      {/* Pending Approvals Card */}
      <MetricCard
        title="Pending Approvals"
        value={`${pendingCount} adet`}
        icon="⏳"
        subtitle={`${formatCurrency(pendingAmount)} bekliyor`}
      />

      {/* Monthly Budget Card with Progress Bar */}
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
  );
};

export default SummaryCards;
