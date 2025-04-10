
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DashboardSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DashboardSearch: React.FC<DashboardSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
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
  );
};

export default DashboardSearch;
