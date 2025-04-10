
import React from 'react';
import SummaryCard from './SummaryCard';
import { ShoppingCart, Users, Package } from 'lucide-react';

interface SummaryCardsProps {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  totalUsers: number;
  totalProducts: number;
  organicProducts: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalRevenue,
  totalOrders,
  pendingOrders,
  processingOrders,
  totalUsers,
  totalProducts,
  organicProducts,
}) => {
  const summaryCardsData = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
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
      description: `${organicProducts} organic products`,
      icon: <Package className="h-5 w-5 text-orange-500" />,
      iconBg: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {summaryCardsData.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          iconBg={card.iconBg}
        />
      ))}
    </div>
  );
};

export default SummaryCards;
