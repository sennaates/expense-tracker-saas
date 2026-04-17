import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ReportsView = ({ expenses }) => {
  // Para formatı
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Aylık harcama dağılımı
  const monthlyData = expenses
    .filter(exp => exp.status === 'approved')
    .reduce((acc, exp) => {
      const date = new Date(exp.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' });
      
      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthName, total: 0, count: 0 };
      }
      acc[monthKey].total += exp.amount;
      acc[monthKey].count += 1;
      return acc;
    }, {});

  const monthlyChartData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  // Status dağılımı
  const statusData = [
    { name: 'Onaylandı', value: expenses.filter(e => e.status === 'approved').length },
    { name: 'Bekliyor', value: expenses.filter(e => e.status === 'pending').length },
    { name: 'Reddedildi', value: expenses.filter(e => e.status === 'rejected').length },
  ];

  const totalExpenses = expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0);
  const avgExpense = totalExpenses / expenses.filter(e => e.status === 'approved').length || 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Raporlar</h2>
        <p className="text-gray-600">Harcama analizleri ve istatistikler</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Toplam Harcama</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
          <p className="text-xs text-gray-500 mt-2">{expenses.filter(e => e.status === 'approved').length} işlem</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Ortalama Harcama</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(avgExpense)}</p>
          <p className="text-xs text-gray-500 mt-2">İşlem başına</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Bekleyen Talepler</p>
          <p className="text-3xl font-bold text-yellow-600">{statusData[1].value}</p>
          <p className="text-xs text-gray-500 mt-2">Onay bekliyor</p>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aylık Harcama Trendi</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Durum Dağılımı</h3>
        <div className="space-y-4">
          {statusData.map((item, index) => {
            const total = statusData.reduce((sum, s) => sum + s.value, 0);
            const percentage = ((item.value / total) * 100).toFixed(1);
            const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500'];
            
            return (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="font-semibold text-gray-900">{item.value} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colors[index]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
