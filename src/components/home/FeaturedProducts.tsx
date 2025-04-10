
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/models';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/products/ProductGrid';
import { ChevronRight } from 'lucide-react';
import { getFeaturedProducts } from '@/services/mockData';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(getFeaturedProducts());
  }, []);

  return (
    <section className="py-16">
      <div className="market-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-market-dark">Featured Products</h2>
          <Button 
            asChild 
            variant="ghost" 
            className="text-market-primary hover:text-market-primary/90 hover:bg-market-primary/5"
          >
            <Link to="/products" className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
        
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
