
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingUp, Users, ShoppingCart, Star } from 'lucide-react';

const FarmerStats = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "R2,850.00",
      description: "+12% from last month",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      iconBg: "bg-green-50",
    },
    {
      title: "Active Products",
      value: "24",
      description: "8 low in stock",
      icon: <Package className="h-5 w-5 text-blue-500" />,
      iconBg: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: "156",
      description: "18 pending",
      icon: <ShoppingCart className="h-5 w-5 text-purple-500" />,
      iconBg: "bg-purple-50",
    },
    {
      title: "Customer Rating",
      value: "4.8",
      description: "Based on 45 reviews",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      iconBg: "bg-yellow-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardDescription>{stat.title}</CardDescription>
            <CardTitle className="text-2xl">{stat.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{stat.description}</span>
              <div className={`p-2 rounded-full ${stat.iconBg}`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FarmerStats;
