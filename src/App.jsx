import { useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import SummaryCards from './components/dashboard/SummaryCards';
import ExpenseTable from './components/dashboard/ExpenseTable';
import { getDepartments, getExpenses, getEmployees } from './services/api';

function App() {
  const [departments, setDepartments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />
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
                  İşte bu haftanın finansal özetiniz.
                </p>
              </div>

              {/* Summary Cards */}
              <SummaryCards expenses={expenses} departments={departments} />

              {/* Expense Table */}
              <ExpenseTable 
                expenses={expenses} 
                employees={employees} 
                departments={departments} 
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
