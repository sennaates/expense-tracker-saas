import { useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import SummaryCards from './components/dashboard/SummaryCards';
import ExpenseTable from './components/dashboard/ExpenseTable';
import ExpenseDetailPanel from './components/dashboard/ExpenseDetailPanel';
import { getDepartments, getExpenses, getEmployees } from './services/api';

function App() {
  const [departments, setDepartments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const depts = await getDepartments();
        console.log("✅ Departmanlar:", depts);
        setDepartments(depts);

        const exps = await getExpenses();
        console.log("✅ Harcamalar:", exps);
        setExpenses(exps);

        const emps = await getEmployees();
        console.log("✅ Çalışanlar:", emps);
        setEmployees(emps);
      } catch (error) {
        console.error("❌ Hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main className="flex-1 p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Loading...</p>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              {/* Greeting Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Hoş geldiniz, Admin
                </h2>
                <p className="text-gray-600">
                  {searchTerm ? (
                    <>
                      "<span className="font-semibold text-gray-900">{searchTerm}</span>" için{' '}
                      <span className="font-semibold text-gray-900">{filteredExpenses.length}</span> sonuç bulundu
                    </>
                  ) : (
                    'İşte bu haftanın finansal özetiniz.'
                  )}
                </p>
              </div>

              {/* Summary Cards - Filtrelenmiş verilerle */}
              <SummaryCards expenses={filteredExpenses} departments={departments} />

              {/* Expense Table - Filtrelenmiş verilerle */}
              <ExpenseTable 
                expenses={filteredExpenses} 
                employees={employees} 
                departments={departments}
                onSelectExpense={setSelectedExpense}
              />
            </div>
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
    </div>
  );
}

export default App;
