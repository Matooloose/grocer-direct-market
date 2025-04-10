
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProducts, mockOrders, mockUsers } from '@/services/mockData';
import DashboardHeader from '@/components/admin/DashboardHeader';
import DashboardSearch from '@/components/admin/DashboardSearch';
import SummaryCards from '@/components/admin/SummaryCards';
import DashboardOverview from '@/components/admin/DashboardOverview';
import OrdersTable from '@/components/admin/OrdersTable';
import ProductsTable from '@/components/admin/ProductsTable';
import UsersTable from '@/components/admin/UsersTable';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  const totalProducts = mockProducts.length;
  const totalUsers = mockUsers.length;
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  const processingOrders = mockOrders.filter(order => order.status === 'processing').length;
  const organicProducts = mockProducts.filter(p => p.isOrganic).length;
  
  return (
    <PageLayout>
      <div className="py-8">
        <div className="market-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <DashboardHeader 
              title="Admin Dashboard" 
              subtitle="Manage your marketplace and view analytics" 
            />
            <div className="mt-4 md:mt-0">
              <DashboardSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
            </div>
          </div>
          
          <SummaryCards 
            totalRevenue={totalRevenue}
            totalOrders={totalOrders}
            pendingOrders={pendingOrders}
            processingOrders={processingOrders}
            totalUsers={totalUsers}
            totalProducts={totalProducts}
            organicProducts={organicProducts}
          />
          
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
