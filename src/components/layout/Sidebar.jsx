import { LayoutDashboard, Users, FileText } from 'lucide-react';

const Sidebar = ({ activeView, onViewChange, onNewExpense }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard
    },
    { 
      id: 'departments', 
      label: 'Departments', 
      icon: Users
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FileText
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-col h-full hidden md:flex flex-shrink-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded"></div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">SpendSync</h1>
            <p className="text-xs text-gray-500">Precision Architect</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-all duration-200 relative
                    ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  {/* Active indicator - blue left border */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r"></div>
                  )}
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* New Expense Button */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <button 
          onClick={onNewExpense}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <span className="text-lg">+</span>
          <span>New Expense</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
