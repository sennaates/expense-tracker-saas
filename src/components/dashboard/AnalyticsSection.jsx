import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsSection = ({ expenses, departments }) => {
  // Departmanlara göre harcama dağılımı
  const departmentData = departments.map(dept => {
    const deptExpenses = expenses.filter(exp => exp.departmentId === dept.id && exp.status === 'approved');
    const total = deptExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return {
      name: dept.name,
      value: total,
      budget: dept.budget
    };
  }).filter(item => item.value > 0); // Sadece harcaması olanları göster

  // Kategorilere göre harcama dağılımı
  const categoryData = expenses
    .filter(exp => exp.status === 'approved')
    .reduce((acc, exp) => {
      const existing = acc.find(item => item.name === exp.category);
      if (existing) {
        existing.value += exp.amount;
      } else {
        acc.push({ name: exp.category, value: exp.amount });
      }
      return acc;
    }, [])
    .sort((a, b) => b.value - a.value); // En yüksekten düşüğe sırala

  // Renk paleti
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Para formatı
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  // Custom Label for Pie Chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // %5'ten küçük dilimlerde label gösterme
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Departman Dağılımı - Donut Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Departman Bazlı Harcamalar</h3>
          <p className="text-sm text-gray-500 mt-1">Onaylanmış harcamaların departmanlara göre dağılımı</p>
        </div>

        {departmentData.length > 0 ? (
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Chart */}
            <div className="w-full lg:w-1/2">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={90}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="w-full lg:w-1/2 space-y-3">
              {departmentData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(item.value)}</p>
                    <p className="text-xs text-gray-500">
                      {((item.value / item.budget) * 100).toFixed(0)}% kullanıldı
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>Henüz onaylanmış harcama bulunmuyor</p>
          </div>
        )}
      </div>

      {/* Kategori Dağılımı - Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Kategori Bazlı Harcamalar</h3>
          <p className="text-sm text-gray-500 mt-1">En çok harcama yapılan kategoriler</p>
        </div>

        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>Henüz onaylanmış harcama bulunmuyor</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsSection;
