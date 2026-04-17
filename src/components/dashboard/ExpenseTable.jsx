import StatusBadge from '../common/StatusBadge';

const ExpenseTable = ({ expenses, employees, departments, onSelectExpense }) => {
  // Para formatı
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Tarih formatı
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // İlişkisel veri birleştirme
  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Bilinmiyor';
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find(dept => dept.id === departmentId);
    return department ? department.name : 'Bilinmiyor';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-0">
      {/* Table Header */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Son Harcamalar</h3>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Tüm departmanlardan gelen harcama talepleri</p>
      </div>

      {/* Table - With horizontal scroll */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Çalışan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departman
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tutar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-gray-500 font-medium mb-1">Aradığınız kriterlere uygun harcama bulunamadı</p>
                    <p className="text-gray-400 text-sm">Farklı bir arama terimi deneyin</p>
                  </div>
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr 
                  key={expense.id} 
                  onClick={() => onSelectExpense(expense)}
                  className="hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{expense.category}</div>
                    <div className="text-xs text-gray-500">{expense.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getEmployeeName(expense.employeeId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {getDepartmentName(expense.departmentId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={expense.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {expenses.length > 0 && (
        <div className="px-4 md:px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs md:text-sm text-gray-600">
            Toplam <span className="font-semibold">{expenses.length}</span> harcama kaydı gösteriliyor
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;
