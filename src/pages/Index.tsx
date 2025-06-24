
import PageLayout from '@/components/layout/PageLayout';
import FarmerStats from '@/components/farmer/FarmerStats';
import RecentOrders from '@/components/farmer/RecentOrders';
import ProductManagement from '@/components/farmer/ProductManagement';
import SalesChart from '@/components/farmer/SalesChart';
import { Button } from '@/components/ui/button';
import { Plus, Package, TrendingUp, Users, ShoppingCart } from 'lucide-react';

const Index = () => {
  return (
    <PageLayout>
      <div className="py-8">
        <div className="market-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Farmer Dashboard</h1>
              <p className="text-gray-600">Manage your products and track your sales</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button className="bg-market-primary hover:bg-market-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          <FarmerStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <SalesChart />
            <RecentOrders />
          </div>

          <div className="mt-6">
            <ProductManagement />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
