import { LayoutDashboard, Users, FileText } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      active: true 
    },
    { 
      id: 'departments', 
      label: 'Departments', 
      icon: Users, 
      active: false 
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FileText, 
      active: false 
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
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
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-all duration-200 relative
                    ${
                      item.active
                        ? 'bg-gray-50 text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  {/* Active indicator - green left border */}
                  {item.active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r"></div>
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
      <div className="p-4 border-t border-gray-200">
        <button className="w-full bg-navy-900 hover:bg-navy-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200">
          <span className="text-lg">+</span>
          <span>New Expense</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
