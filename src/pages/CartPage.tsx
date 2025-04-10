
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { CartItem as CartItemType } from '@/types/models';
import { Button } from '@/components/ui/button';
import { ShoppingBasket, ArrowLeft } from 'lucide-react';
import { getCartItems } from '@/services/mockData';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this would fetch cart from API or state management
    setCartItems(getCartItems());
    setIsLoading(false);
  }, []);
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
    
    toast({
      title: "Cart updated",
      description: "Item quantity has been updated.",
      duration: 2000,
    });
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
      duration: 2000,
    });
  };
  
  const handleCheckout = () => {
    // In a real app, this would proceed to checkout flow
    toast({
      title: "Proceeding to checkout",
      description: "This would navigate to the checkout page in a complete application.",
      duration: 3000,
    });
  };

  return (
    <PageLayout>
      <div className="py-8">
        <div className="market-container">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Your Shopping Cart</h1>
            <Button 
              asChild 
              variant="ghost" 
              className="text-market-primary hover:text-market-primary/90"
            >
              <Link to="/products" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-market-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading your cart...</p>
            </div>
          ) : cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {cartItems.map(item => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <CartSummary 
                  items={cartItems}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBasket className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button 
                asChild 
                className="bg-market-primary hover:bg-market-primary/90"
              >
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CartPage;
