
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  const salesData = [
    { name: 'Jan', sales: 1200 },
    { name: 'Feb', sales: 1800 },
    { name: 'Mar', sales: 2200 },
    { name: 'Apr', sales: 2800 },
    { name: 'May', sales: 2400 },
    { name: 'Jun', sales: 2850 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Your monthly sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`R${value}`, 'Sales']} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#4CAF50" 
                strokeWidth={2}
                dot={{ fill: '#4CAF50' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
