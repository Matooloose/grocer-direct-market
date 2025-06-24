
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminAnalytics = () => {
  const categoryData = [
    { name: 'Vegetables', value: 45, color: '#4CAF50' },
    { name: 'Fruits', value: 30, color: '#FF9800' },
    { name: 'Dairy', value: 15, color: '#2196F3' },
    { name: 'Grains', value: 10, color: '#9C27B0' },
  ];

  const userGrowthData = [
    { month: 'Jan', farmers: 12, customers: 45 },
    { month: 'Feb', farmers: 18, customers: 67 },
    { month: 'Mar', farmers: 25, customers: 89 },
    { month: 'Apr', farmers: 32, customers: 123 },
    { month: 'May', farmers: 38, customers: 156 },
    { month: 'Jun', farmers: 45, customers: 189 },
  ];

  const topFarmersData = [
    { name: 'Green Valley Farm', sales: 2850, orders: 45 },
    { name: 'Sunrise Organics', sales: 2340, orders: 38 },
    { name: 'Fresh Fields', sales: 1980, orders: 32 },
    { name: 'Nature\'s Best', sales: 1756, orders: 28 },
    { name: 'Organic Harvest', sales: 1423, orders: 24 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Categories Distribution</CardTitle>
            <CardDescription>Breakdown of products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly farmer and customer registration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="farmers" stroke="#4CAF50" strokeWidth={2} />
                  <Line type="monotone" dataKey="customers" stroke="#2196F3" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Farmers</CardTitle>
          <CardDescription>Farmers ranked by total sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topFarmersData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip formatter={(value, name) => [name === 'sales' ? `R${value}` : value, name === 'sales' ? 'Sales' : 'Orders']} />
                <Bar dataKey="sales" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-sm font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="text-sm font-medium">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-medium text-green-600">120ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">New farmer registered</p>
                <p className="text-gray-500">Organic Valley Farm</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Large order placed</p>
                <p className="text-gray-500">R850.00 - 12 items</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Product reported</p>
                <p className="text-gray-500">Quality concern raised</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm hover:bg-gray-50 rounded">
                Send platform announcement
              </button>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-50 rounded">
                Review pending farmers
              </button>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-50 rounded">
                Generate monthly report
              </button>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-50 rounded">
                Update platform settings
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
