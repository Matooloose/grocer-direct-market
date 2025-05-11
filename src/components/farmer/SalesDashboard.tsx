import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ShoppingBag, DollarSign, Truck, Star, MoreHorizontal, Calendar, Download } from 'lucide-react';
import { Product } from '@/types/models';

// Mock data for sales dashboard
const salesData = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 1900 },
  { name: 'Wed', sales: 1500 },
  { name: 'Thu', sales: 2200 },
  { name: 'Fri', sales: 2500 },
  { name: 'Sat', sales: 2800 },
  { name: 'Sun', sales: 1800 },
];

const monthlySalesData = [
  { name: 'Jan', sales: 12000 },
  { name: 'Feb', sales: 19000 },
  { name: 'Mar', sales: 15000 },
  { name: 'Apr', sales: 22000 },
  { name: 'May', sales: 25000 },
  { name: 'Jun', sales: 28000 },
  { name: 'Jul', sales: 18000 },
  { name: 'Aug', sales: 21000 },
  { name: 'Sep', sales: 24000 },
  { name: 'Oct', sales: 26000 },
  { name: 'Nov', sales: 19000 },
  { name: 'Dec', sales: 22000 },
];

const topProducts = [
  {
    id: '1',
    name: 'Organic Carrots',
    category: 'vegetables',
    sales: 78,
    revenue: 233.22,
    growth: 12.5,
    image: 'https://images.unsplash.com/photo-1598170845058-c2b7a51db3f0?w=150&auto=format',
  },
  {
    id: '2',
    name: 'Fresh Strawberries',
    category: 'fruits',
    sales: 65,
    revenue: 292.5,
    growth: 8.3,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=150&auto=format',
  },
  {
    id: '3',
    name: 'Farm Fresh Eggs',
    category: 'dairy',
    sales: 54,
    revenue: 323.46,
    growth: -4.2,
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=150&auto=format',
  },
  {
    id: '4',
    name: 'Heirloom Tomatoes',
    category: 'vegetables',
    sales: 42,
    revenue: 167.58,
    growth: 15.7,
    image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=150&auto=format',
  },
];

const customerReviews = [
  {
    id: 'rev1',
    customerName: 'Emily Johnson',
    rating: 5,
    comment: 'The organic carrots were incredibly fresh and flavorful. Will definitely buy again!',
    product: 'Organic Carrots',
    date: '2023-06-10',
  },
  {
    id: 'rev2',
    customerName: 'Michael Brown',
    rating: 4,
    comment: 'Great strawberries, but a few were slightly damaged during delivery.',
    product: 'Fresh Strawberries',
    date: '2023-06-09',
  },
  {
    id: 'rev3',
    customerName: 'Sarah Williams',
    rating: 5,
    comment: 'Best farm eggs I\'ve ever had. The yolks are so vibrant and tasty!',
    product: 'Farm Fresh Eggs',
    date: '2023-06-08',
  },
];

const SalesDashboard = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [chartView, setChartView] = useState('daily');

  const totalSales = chartView === 'daily'
    ? salesData.reduce((sum, day) => sum + day.sales, 0)
    : monthlySalesData.reduce((sum, month) => sum + month.sales, 0);
  
  const totalOrders = 64;
  const averageOrderValue = (totalSales / totalOrders).toFixed(2);
  const totalCustomers = 42;

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sales Dashboard</h2>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Custom Range</span>
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{totalSales.toLocaleString()}</div>
            <div className="flex items-center mt-1 text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12.5% increase</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center mt-1 text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8.3% increase</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{averageOrderValue}</div>
            <div className="flex items-center mt-1 text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>3.7% increase</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>2.1% decrease</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                {chartView === 'daily' ? 'Daily sales for the past week' : 'Monthly sales for the year'}
              </CardDescription>
            </div>
            <div>
              <Tabs value={chartView} onValueChange={setChartView} className="w-full">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                sales: { color: "#8B5CF6" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartView === 'daily' ? salesData : monthlySalesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="var(--color-sales)" 
                    name="sales" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Products & Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Products with the highest sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <Badge variant="outline" className="mt-1 capitalize">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-2 text-gray-400" />
                        {product.sales}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                        R{product.revenue.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center ${
                        product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.growth >= 0 
                          ? <TrendingUp className="h-4 w-4 mr-1" /> 
                          : <TrendingDown className="h-4 w-4 mr-1" />
                        }
                        {Math.abs(product.growth)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Customer Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Customer Reviews</CardTitle>
            <CardDescription>What customers are saying about your products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{review.customerName}</h4>
                      <p className="text-sm text-gray-500">{review.product} • {review.date}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesDashboard;
