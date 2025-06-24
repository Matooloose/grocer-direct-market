
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
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardOverview from '@/components/admin/DashboardOverview';
import OrdersTable from '@/components/admin/OrdersTable';
import ProductsTable from '@/components/admin/ProductsTable';
import UsersTable from '@/components/admin/UsersTable';
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
  
  const summaryCards = [
    {
      title: "Total Revenue",
      value: `R${totalRevenue.toFixed(2)}`,
      description: "12% increase",
      icon: <ShoppingCart className="h-5 w-5 text-market-primary" />,
      iconBg: "bg-market-primary/10",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      description: `Pending: ${pendingOrders} • Processing: ${processingOrders}`,
      icon: <Package className="h-5 w-5 text-blue-500" />,
      iconBg: "bg-blue-50",
    },
    {
      title: "Total Users",
      value: totalUsers,
      description: "8% increase",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      iconBg: "bg-purple-50",
    },
    {
      title: "Total Products",
      value: totalProducts,
      description: `${mockProducts.filter(p => p.isOrganic).length} organic products`,
      icon: <Package className="h-5 w-5 text-orange-500" />,
      iconBg: "bg-orange-50",
    },
  ];
  
  return (
    <PageLayout>
      <div className="py-8">
        <div className="market-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your marketplace and view analytics</p>
            </div>
            <div className="mt-4 md:mt-0">
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
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {summaryCards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className="text-2xl">{card.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center">
                      {card.title === "Total Revenue" && (
                        <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                      )}
                      {card.description}
                    </span>
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
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
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
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
