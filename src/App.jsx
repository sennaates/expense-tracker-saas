import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header />

        {/* Main Content - Placeholder for future content */}
        <main className="pt-16 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Greeting Section Placeholder */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Good morning, Admin
              </h2>
              <p className="text-gray-600">
                Here's your financial overview for this week.
              </p>
            </div>

            {/* Content will be added in next phases */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-400">
              <p>Dashboard content will be added in the next phase</p>
              <p className="text-sm mt-2">(Metric cards and expense table)</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
