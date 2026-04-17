import { X } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const ExpenseDetailPanel = ({ expense, employee, department, onClose }) => {
  if (!expense) return null;

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
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Harcama limiti yüzdesi
  const spendingPercentage = employee?.spendingLimit 
    ? ((expense.amount / employee.spendingLimit) * 100).toFixed(1)
    : 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 md:max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Harcama Detayı</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Amount - Hero Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 text-center border border-blue-100">
            <p className="text-xs md:text-sm text-gray-600 mb-2">Harcama Tutarı</p>
            <p className="text-3xl md:text-4xl font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Durum</span>
            <StatusBadge status={expense.status} />
          </div>

          {/* Category */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Kategori</span>
            <span className="text-sm font-semibold text-gray-900">{expense.category}</span>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Tarih</span>
            <span className="text-sm text-gray-900">{formatDate(expense.date)}</span>
          </div>

          {/* Description */}
          <div className="py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-600 mb-2">Açıklama</p>
            <p className="text-sm text-gray-900">{expense.description}</p>
          </div>

          {/* Employee Info */}
          {employee && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Harcamayı Yapan</p>
              
              <div className="flex items-center gap-3">
                <img 
                  src={employee.avatar} 
                  alt={employee.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <p className="font-semibold text-gray-900">{employee.name}</p>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                </div>
              </div>

              {/* Department */}
              {department && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Departman</p>
                  <p className="text-sm font-medium text-gray-900">{department.name}</p>
                </div>
              )}
            </div>
          )}

          {/* Spending Limit Info */}
          {employee?.spendingLimit && (
            <div className={`rounded-xl p-4 border-2 ${
              spendingPercentage > 80 
                ? 'bg-red-50 border-red-200' 
                : spendingPercentage > 50 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {spendingPercentage > 80 ? '⚠️' : spendingPercentage > 50 ? '⚡' : '✅'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Harcama Limiti Bilgisi
                  </p>
                  <p className="text-sm text-gray-700">
                    Bu harcama, <span className="font-semibold">{employee.name}</span>'in aylık 
                    limitinin (<span className="font-semibold">{formatCurrency(employee.spendingLimit)}</span>) 
                    <span className="font-bold text-gray-900"> %{spendingPercentage}</span> kadarıdır.
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          spendingPercentage > 80 
                            ? 'bg-red-500' 
                            : spendingPercentage > 50 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 space-y-2 md:space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 md:py-3 px-4 rounded-lg transition-colors text-sm md:text-base">
              Harcamayı Düzenle
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 md:py-3 px-4 rounded-lg transition-colors text-sm md:text-base">
              Yazdır
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseDetailPanel;
