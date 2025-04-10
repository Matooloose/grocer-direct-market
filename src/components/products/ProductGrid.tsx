
import { useState } from 'react';
import { Product } from '@/types/models';
import ProductCard from './ProductCard';
import { useToast } from '@/components/ui/use-toast';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const { toast } = useToast();
  
  const handleAddToCart = (product: Product) => {
    // In a real app, this would add to cart state or call an API
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={handleAddToCart} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
