
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Package } from 'lucide-react';

const RecentOrders = () => {
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Sarah Johnson",
      items: "Tomatoes, Lettuce",
      total: 45.50,
      status: "pending",
      date: "2024-06-24"
    },
    {
      id: "ORD-002",
      customer: "Mike Wilson",
      items: "Carrots, Potatoes",
      total: 32.00,
      status: "processing",
      date: "2024-06-23"
    },
    {
      id: "ORD-003",
      customer: "Emma Davis",
      items: "Organic Spinach",
      total: 28.75,
      status: "shipped",
      date: "2024-06-23"
    },
    {
      id: "ORD-004",
      customer: "John Smith",
      items: "Mixed Vegetables",
      total: 67.25,
      status: "delivered",
      date: "2024-06-22"
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest orders from your customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{order.customer}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{order.items}</p>
                <p className="text-sm font-medium text-market-primary">R{order.total.toFixed(2)}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <Package className="h-4 w-4 mr-2" />
          View All Orders
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
