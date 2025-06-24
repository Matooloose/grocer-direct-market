
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts, mockOrders, mockUsers } from '@/services/mockData';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  ArrowUpRight, 
  BarChart as BarChartIcon,
  Search,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardOverview from '@/components/admin/DashboardOverview';
import OrdersTable from '@/components/admin/OrdersTable';
import ProductsTable from '@/components/admin/ProductsTable';
import UsersTable from '@/components/admin/UsersTable';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import { Input } from '@/components/ui/input';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  const totalProducts = mockProducts.length;
  const totalUsers = mockUsers.length;
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  const processingOrders = mockOrders.filter(order => order.status === 'processing').length;
  const lowStockProducts = mockProducts.filter(p => p.quantity <= 5).length;
  
  const summaryCards = [
    {
      title: "Total Revenue",
      value: `R${totalRevenue.toFixed(2)}`,
      description: "12% increase from last month",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      iconBg: "bg-green-50",
      trend: "+12%"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      description: `${pendingOrders} pending • ${processingOrders} processing`,
      icon: <ShoppingCart className="h-5 w-5 text-blue-500" />,
      iconBg: "bg-blue-50",
      trend: "+8%"
    },
    {
      title: "Active Users",
      value: totalUsers,
      description: "18 new users this week",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      iconBg: "bg-purple-50",
      trend: "+15%"
    },
    {
      title: "Products",
      value: totalProducts,
      description: `${lowStockProducts} low stock alerts`,
      icon: <Package className="h-5 w-5 text-orange-500" />,
      iconBg: "bg-orange-50",
      alert: lowStockProducts > 0
    },
  ];
  
  return (
    <PageLayout>
      <div className="py-8">
        <div className="market-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your marketplace and monitor performance</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <div className="relative max-w-xs md:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-market-primary hover:bg-market-primary/90">
                <BarChartIcon className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryCards.map((card, index) => (
              <Card key={index} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription>{card.title}</CardDescription>
                    {card.alert && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                  <CardTitle className="text-2xl">{card.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      {card.trend && (
                        <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                      )}
                      <span>{card.description}</span>
                    </div>
                    <div className={`p-2 rounded-full ${card.iconBg}`}>
                      {card.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm p-2">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview">
              <DashboardOverview 
                salesData={[
                  { name: 'Jan', sales: 4000 },
                  { name: 'Feb', sales: 3000 },
                  { name: 'Mar', sales: 5000 },
                  { name: 'Apr', sales: 7000 },
                  { name: 'May', sales: 6000 },
                  { name: 'Jun', sales: 8000 },
                ]}
                recentOrders={mockOrders.slice(0, 5)}
                topProducts={mockProducts.slice(0, 5)}
              />
            </TabsContent>
            
            <TabsContent value="orders">
              <OrdersTable orders={mockOrders} searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="products">
              <ProductsTable products={mockProducts} searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="users">
              <UsersTable users={mockUsers} searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="analytics">
              <AdminAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
