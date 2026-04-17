const DepartmentsView = ({ departments, expenses }) => {
  // Para formatı
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Departman bazlı harcama hesaplama
  const getDepartmentStats = (deptId) => {
    const deptExpenses = expenses.filter(
      exp => exp.departmentId === deptId && exp.status === 'approved'
    );
    const totalSpent = deptExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return { totalSpent, count: deptExpenses.length };
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Departmanlar</h2>
        <p className="text-gray-600">Tüm departmanların bütçe durumu ve harcama özeti</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept) => {
          const stats = getDepartmentStats(dept.id);
          const percentage = (stats.totalSpent / dept.budget) * 100;
          const remaining = dept.budget - stats.totalSpent;

          return (
            <div key={dept.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stats.count} harcama kaydı</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  percentage >= 100 
                    ? 'bg-red-100 text-red-800'
                    : percentage >= 80
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {percentage >= 100 ? 'Aşıldı' : percentage >= 80 ? 'Dikkat' : 'Normal'}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Toplam Bütçe</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(dept.budget)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harcanan</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(stats.totalSpent)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kalan</span>
                  <span className={`font-semibold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(remaining)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Kullanım Oranı</span>
                    <span>{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentage >= 100
                          ? 'bg-red-500'
                          : percentage >= 80
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentsView;
