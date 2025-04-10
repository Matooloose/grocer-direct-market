
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  description,
  icon,
  iconBg,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 flex items-center">
            {title === "Total Revenue" && (
              <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
            )}
            {description}
          </span>
          <div className={`p-2 rounded-full ${iconBg}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
