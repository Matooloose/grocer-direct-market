
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FarmerProfile from '@/components/farmer/FarmerProfile';
import ProductManagement from '@/components/farmer/ProductManagement';
import InventoryManagement from '@/components/farmer/InventoryManagement';
import OrdersManagement from '@/components/farmer/OrdersManagement';
import BuyerMessages from '@/components/farmer/BuyerMessages';
import SalesDashboard from '@/components/farmer/SalesDashboard';
import NotificationsPanel from '@/components/farmer/NotificationsPanel';
import ReportsDownload from '@/components/farmer/ReportsDownload';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <PageLayout>
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Farmer Dashboard</h1>
          
          <Tabs defaultValue="profile" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <FarmerProfile />
            </TabsContent>
            
            <TabsContent value="products" className="mt-6">
              <ProductManagement />
            </TabsContent>
            
            <TabsContent value="inventory" className="mt-6">
              <InventoryManagement />
            </TabsContent>
            
            <TabsContent value="orders" className="mt-6">
              <OrdersManagement />
            </TabsContent>
            
            <TabsContent value="messages" className="mt-6">
              <BuyerMessages />
            </TabsContent>
            
            <TabsContent value="sales" className="mt-6">
              <SalesDashboard />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <NotificationsPanel />
            </TabsContent>
            
            <TabsContent value="reports" className="mt-6">
              <ReportsDownload />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default FarmerDashboard;
