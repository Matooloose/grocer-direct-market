
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import FilterSidebar from '@/components/products/FilterSidebar';
import ProductGrid from '@/components/products/ProductGrid';
import { getProducts } from '@/services/mockData';
import { Product } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  
  useEffect(() => {
    // Initialize search from URL parameters
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    // Fetch products
    const filteredProducts = getProducts(
      categoryParam !== 'all' ? categoryParam : undefined, 
      searchParam
    );
    setProducts(filteredProducts);
  }, [categoryParam, searchParam]);
  
  const handleFilterChange = (filters: any) => {
    // In a real app, this would use the filters to get products from API
    console.log('Filters applied:', filters);
    
    // For demo, just apply category filter
    if (filters.categories && filters.categories.length > 0) {
      setSearchParams(prev => {
        prev.set('category', filters.categories[0]);
        return prev;
      });
    }
  };
  
  const handleFilterReset = () => {
    setSearchParams(prev => {
      prev.delete('category');
      return prev;
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (searchQuery) {
        prev.set('search', searchQuery);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <PageLayout>
      <div className="bg-gray-50 py-8">
        <div className="market-container">
          <h1 className="text-3xl font-bold mb-6">Shop Fresh Products</h1>
          
          <form onSubmit={handleSearch} className="flex mb-6">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-10 top-0 h-full"
                  onClick={() => {
                    setSearchQuery('');
                    if (searchParam) {
                      setSearchParams(prev => {
                        prev.delete('search');
                        return prev;
                      });
                    }
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button type="submit" className="ml-2 bg-market-primary hover:bg-market-primary/90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="w-full flex items-center justify-center"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
              <FilterSidebar 
                onFilterChange={handleFilterChange} 
                onReset={handleFilterReset} 
              />
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing <span className="font-medium">{products.length}</span> products
                    {categoryParam !== 'all' && (
                      <span> in <span className="font-medium capitalize">{categoryParam}</span></span>
                    )}
                    {searchParam && (
                      <span> matching "<span className="font-medium">{searchParam}</span>"</span>
                    )}
                  </p>
                  {/* Additional controls like sort could be added here */}
                </div>
              </div>
              
              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleFilterReset}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
