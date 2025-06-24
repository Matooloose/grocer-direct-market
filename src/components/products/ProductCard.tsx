
import { Link } from 'react-router-dom';
import { Product } from '@/types/models';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { id, name, price, images, isOrganic, farmer, unit } = product;

  return (
    <Card className="product-card h-full flex flex-col">
      <div className="relative overflow-hidden group h-48">
        <Link to={`/products/${id}`}>
          <img 
            src={images[0]} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          {isOrganic && (
            <Badge className="absolute top-2 left-2 bg-market-secondary text-white">
              Organic
            </Badge>
          )}
        </Link>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-market-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      
      <CardContent className="flex-grow py-4">
        <div className="mb-1 text-sm text-gray-500">{farmer.name}</div>
        <Link to={`/products/${id}`} className="hover:text-market-primary">
          <h3 className="font-medium text-lg mb-1 line-clamp-2">{name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-market-primary">R{price.toFixed(2)}</span>
            <span className="ml-1 text-gray-500 text-sm">/ {unit}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <Button 
          className="w-full bg-market-primary hover:bg-market-primary/90"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
