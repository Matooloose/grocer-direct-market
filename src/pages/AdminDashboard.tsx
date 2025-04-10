
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts, mockOrders, mockUsers } from '@/services/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  ArrowUpRight, 
  BarChart as BarChartIcon
} from 'lucide-react';

// Mock data for sales chart
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 7000 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 8000 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const totalProducts = mockProducts.length;
  const totalUsers = mockUsers.length;
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  const processingOrders = mockOrders.filter(order => order.status === 'processing').length;
  
  return (
    <PageLayout>
      <div className="py-8">
        <div className="market-container">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">Manage your marketplace and view analytics</p>
          
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm p-2">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-2xl">${totalRevenue.toFixed(2)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-500 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        12% increase
                      </span>
                      <div className="p-2 bg-market-primary/10 rounded-full">
                        <ShoppingCart className="h-5 w-5 text-market-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Orders</CardDescription>
                    <CardTitle className="text-2xl">{totalOrders}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500 block">
                          Pending: {pendingOrders}
                        </span>
                        <span className="text-sm text-gray-500 block">
                          Processing: {processingOrders}
                        </span>
                      </div>
                      <div className="p-2 bg-blue-50 rounded-full">
                        <Package className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Users</CardDescription>
                    <CardTitle className="text-2xl">{totalUsers}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-500 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        8% increase
                      </span>
                      <div className="p-2 bg-purple-50 rounded-full">
                        <Users className="h-5 w-5 text-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Products</CardDescription>
                    <CardTitle className="text-2xl">{totalProducts}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {mockProducts.filter(p => p.isOrganic).length} organic products
                      </span>
                      <div className="p-2 bg-orange-50 rounded-full">
                        <Package className="h-5 w-5 text-orange-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Sales Overview</CardTitle>
                      <CardDescription>Monthly sales data for the year</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <BarChartIcon className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={salesData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#4CAF50" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.slice(0, 5).map(order => (
                        <div key={order.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{order.user.name}</p>
                            <p className="text-sm text-gray-500">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Best selling products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProducts.slice(0, 5).map(product => (
                        <div key={product.id} className="flex items-center">
                          <div className="w-10 h-10 rounded-md bg-gray-100 mr-3 overflow-hidden">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.farmer.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${product.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">{product.quantity} in stock</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>View and manage all orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-12">
                    Order management content would be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>View and manage all products</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-12">
                    Product management content would be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage all users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-12">
                    User management content would be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
