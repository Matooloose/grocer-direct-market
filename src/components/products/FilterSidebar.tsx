
import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const FilterSidebar = ({ onFilterChange, onReset }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showOrganic, setShowOrganic] = useState(true);
  
  // Categories list
  const categories = [
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'meat', name: 'Meat' },
    { id: 'grains', name: 'Grains' },
    { id: 'herbs', name: 'Herbs' },
  ];
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const applyFilters = () => {
    onFilterChange({
      priceRange,
      categories: selectedCategories,
      organic: organicOnly,
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 50]);
    setSelectedCategories([]);
    setOrganicOnly(false);
    onReset();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Categories</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowCategories(!showCategories)}
            >
              {showCategories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>
          
          {showCategories && (
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div className="flex items-center space-x-2" key={category.id}>
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Price Range</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowPrice(!showPrice)}
            >
              {showPrice ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>
          
          {showPrice && (
            <>
              <Slider 
                defaultValue={[0, 50]} 
                max={50} 
                step={1} 
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mt-6"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}+</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Product Type</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowOrganic(!showOrganic)}
            >
              {showOrganic ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>
          
          {showOrganic && (
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox 
                id="organic-only"
                checked={organicOnly}
                onCheckedChange={() => setOrganicOnly(!organicOnly)}
              />
              <Label 
                htmlFor="organic-only"
                className="text-sm font-normal cursor-pointer"
              >
                Organic Only
              </Label>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={resetFilters}
        >
          Reset
        </Button>
        <Button 
          className="flex-1 bg-market-primary hover:bg-market-primary/90"
          onClick={applyFilters}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
