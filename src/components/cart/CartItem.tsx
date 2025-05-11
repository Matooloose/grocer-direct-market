
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { id, product, quantity } = item;
  const [isUpdating, setIsUpdating] = useState(false);

  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b">
      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-0 sm:mr-4 mb-4 sm:mb-0">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium hover:text-market-primary">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Sold by: {product.farmer.name}</p>
        <div className="mt-2 flex items-center">
          <p className="font-medium text-market-primary">R{product.price.toFixed(2)}</p>
          <span className="mx-2 text-gray-400">×</span>
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-md"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-3 min-w-8 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-md"
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0">
        <div className="block sm:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 text-red-500 rounded-md border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-right">
          <p className="font-semibold">R{(product.price * quantity).toFixed(2)}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-600 hover:bg-red-50 hidden sm:inline-flex mt-1 h-8 px-2"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
