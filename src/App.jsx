import { useEffect, useState, useMemo } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import SummaryCards from './components/dashboard/SummaryCards';
import AnalyticsSection from './components/dashboard/AnalyticsSection';
import ExpenseTable from './components/dashboard/ExpenseTable';
import ExpenseDetailPanel from './components/dashboard/ExpenseDetailPanel';
import AlertBanner from './components/common/AlertBanner';
import ProfileModal from './components/common/ProfileModal';
import DepartmentsView from './components/views/DepartmentsView';
import ReportsView from './components/views/ReportsView';
import SettingsView from './components/views/SettingsView';
import { getDepartments, getExpenses, getEmployees } from './services/api';

function App() {
  const [departments, setDepartments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showCriticalAlert, setShowCriticalAlert] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [settings, setSettings] = useState({
    currency: 'TRY',
    theme: 'light',
    notifications: {
      budget: true,
      pending: true,
      highExpense: true
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const depts = await getDepartments();
        setDepartments(depts);

        const exps = await getExpenses();
        setExpenses(exps);

        const emps = await getEmployees();
        setEmployees(emps);
      } catch (error) {
        console.error("❌ Hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Akıllı bildirim sistemi
  const smartNotifications = useMemo(() => {
    const notifs = [];
    let notifId = 1;

    // 1. Bütçe Aşımı Kontrolü
    departments.forEach(dept => {
      const deptExpenses = expenses.filter(
        exp => exp.departmentId === dept.id && exp.status === 'approved'
      );
      const totalSpent = deptExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const percentage = (totalSpent / dept.budget) * 100;

      if (percentage >= 100) {
        notifs.push({
          id: notifId++,
          type: 'budget',
          title: 'Kritik: Bütçe Aşıldı!',
          message: `${dept.name} departmanı bütçesinin %${percentage.toFixed(0)}'ini kullandı!`,
          time: 'Şimdi',
          read: false
        });
      } else if (percentage >= 80) {
        notifs.push({
          id: notifId++,
          type: 'budget',
          title: 'Dikkat: Bütçe Sınırına Yaklaşıldı',
          message: `${dept.name} departmanı bütçesinin %${percentage.toFixed(0)}'ini kullandı.`,
          time: '5 dk önce',
          read: false
        });
      }
    });

    // 2. Bekleyen Onaylar
    const pendingExpenses = expenses.filter(exp => exp.status === 'pending');
    if (pendingExpenses.length >= 3) {
      notifs.push({
        id: notifId++,
        type: 'pending',
        title: 'Bekleyen Onaylar',
        message: `${pendingExpenses.length} adet harcama talebi onay bekliyor.`,
        time: '10 dk önce',
        read: false
      });
    }

    // 3. Yüksek Tutarlı Harcamalar
    const highExpenses = expenses.filter(exp => exp.amount >= 10000 && exp.status === 'pending');
    highExpenses.forEach(exp => {
      const employee = employees.find(e => e.id === exp.employeeId);
      notifs.push({
        id: notifId++,
        type: 'high-expense',
        title: 'Yüksek Tutarlı Harcama',
        message: `${employee?.name || 'Bilinmeyen'} tarafından ${(exp.amount / 1000).toFixed(0)}K TL'lik harcama talebi.`,
        time: '15 dk önce',
        read: false
      });
    });

    return notifs;
  }, [expenses, departments, employees]);

  // Notifications state'ini güncelle
  useEffect(() => {
    setNotifications(smartNotifications);
  }, [smartNotifications]);

  // Kritik uyarı kontrolü
  const criticalAlert = useMemo(() => {
    const overBudgetDepts = departments.filter(dept => {
      const deptExpenses = expenses.filter(
        exp => exp.departmentId === dept.id && exp.status === 'approved'
      );
      const totalSpent = deptExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      return totalSpent > dept.budget;
    });

    if (overBudgetDepts.length > 0) {
      return `${overBudgetDepts.map(d => d.name).join(', ')} departman${overBudgetDepts.length > 1 ? 'ları' : 'ı'} bütçesini aştı!`;
    }
    return null;
  }, [expenses, departments]);

  // Bildirim okundu işaretleme
  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  // Profil kaydetme
  const handleProfileSave = (profileData) => {
    console.log('Profil güncellendi:', profileData);
  };

  // Logout
  const handleLogout = () => {
    if (window.confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      alert('Güvenli çıkış yapıldı! ✓');
      window.location.reload();
    }
  };

  // Settings kaydetme
  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    console.log('Ayarlar güncellendi:', newSettings);
  };

  // Türkçe karakter normalizasyon fonksiyonu
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c');
  };

  // Filtreleme mantığı
  const filteredExpenses = expenses.filter((expense) => {
    // Status filtresi
    if (statusFilter && expense.status !== statusFilter) {
      return false;
    }

    // Arama filtresi
    if (!searchTerm) return true;

    const search = searchTerm.toLowerCase().trim();
    const normalizedSearch = normalizeText(searchTerm.trim());
    
    // Çalışan adını bul
    const employee = employees.find(emp => emp.id === expense.employeeId);
    const employeeName = employee ? employee.name.toLowerCase() : '';
    const normalizedEmployeeName = employee ? normalizeText(employee.name) : '';
    
    // Departman adını bul
    const department = departments.find(dept => dept.id === expense.departmentId);
    const departmentName = department ? department.name.toLowerCase() : '';
    const normalizedDepartmentName = department ? normalizeText(department.name) : '';
    
    // Kategori ve açıklama
    const category = expense.category.toLowerCase();
    const normalizedCategory = normalizeText(expense.category);
    const description = expense.description.toLowerCase();
    const normalizedDescription = normalizeText(expense.description);
    
    // Arama kriterlerinden herhangi biri eşleşirse true döndür
    return (
      category.includes(search) ||
      normalizedCategory.includes(normalizedSearch) ||
      description.includes(search) ||
      normalizedDescription.includes(normalizedSearch) ||
      employeeName.includes(search) ||
      normalizedEmployeeName.includes(normalizedSearch) ||
      departmentName.includes(search) ||
      normalizedDepartmentName.includes(normalizedSearch)
    );
  });

  // Seçili harcama için çalışan ve departman bilgilerini bul
  const selectedEmployee = selectedExpense 
    ? employees.find(emp => emp.id === selectedExpense.employeeId)
    : null;
  
  const selectedDepartment = selectedExpense
    ? departments.find(dept => dept.id === selectedExpense.departmentId)
    : null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Fixed width, hidden on mobile */}
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        onNewExpense={() => alert('Yeni Harcama Formu Açılacak! 📝\n\nBu özellik yakında eklenecek.')}
      />
      
      {/* Main Content - Flex-1 with min-w-0 to prevent overflow */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onProfileClick={() => setShowProfileModal(true)}
          onLogout={handleLogout}
          onSettingsClick={() => setActiveView('settings')}
        />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {loading ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Skeleton for Greeting */}
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
              </div>

              {/* Skeleton for Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skeleton for Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
                <div className="p-6 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Dashboard View */}
              {activeView === 'dashboard' && (
                <div className="max-w-7xl mx-auto w-full">
                  {/* Critical Alert Banner */}
                  {criticalAlert && showCriticalAlert && (
                    <AlertBanner
                      message={criticalAlert}
                      onClose={() => setShowCriticalAlert(false)}
                    />
                  )}

                  {/* Greeting Section */}
                  <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Hoş geldiniz, Admin
                    </h2>
                    <div className="text-sm md:text-base text-gray-600">
                      {searchTerm || statusFilter ? (
                        <>
                          {searchTerm && (
                            <>
                              "<span className="font-semibold text-gray-900">{searchTerm}</span>" için{' '}
                            </>
                          )}
                          {statusFilter && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs md:text-sm font-medium mx-1">
                              {statusFilter === 'approved' ? 'Onaylanmış' : statusFilter === 'pending' ? 'Bekleyen' : 'Reddedilen'}
                            </span>
                          )}
                          <span className="font-semibold text-gray-900">{filteredExpenses.length}</span> sonuç bulundu
                          {(searchTerm || statusFilter) && (
                            <button
                              onClick={() => {
                                setSearchTerm('');
                                setStatusFilter(null);
                              }}
                              className="ml-2 text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium"
                            >
                              Temizle
                            </button>
                          )}
                        </>
                      ) : (
                        'İşte bu haftanın finansal özetiniz.'
                      )}
                    </div>
                  </div>

                  {/* Summary Cards - Filtrelenmiş verilerle */}
                  <SummaryCards 
                    expenses={filteredExpenses} 
                    departments={departments}
                    onFilterByStatus={setStatusFilter}
                    activeFilter={statusFilter}
                  />

                  {/* Analytics Section - Grafikler */}
                  <AnalyticsSection 
                    expenses={filteredExpenses} 
                    departments={departments}
                  />

                  {/* Expense Table - Filtrelenmiş verilerle */}
                  <ExpenseTable 
                    expenses={filteredExpenses} 
                    employees={employees} 
                    departments={departments}
                    onSelectExpense={setSelectedExpense}
                  />
                </div>
              )}

              {/* Departments View */}
              {activeView === 'departments' && (
                <DepartmentsView 
                  departments={departments}
                  expenses={expenses}
                />
              )}

              {/* Reports View */}
              {activeView === 'reports' && (
                <ReportsView expenses={expenses} />
              )}

              {/* Settings View */}
              {activeView === 'settings' && (
                <SettingsView 
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Expense Detail Panel */}
      {selectedExpense && (
        <ExpenseDetailPanel
          expense={selectedExpense}
          employee={selectedEmployee}
          department={selectedDepartment}
          onClose={() => setSelectedExpense(null)}
        />
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
}

export default App;
