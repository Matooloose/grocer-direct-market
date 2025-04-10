
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/models';

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

const CartSummary = ({ items, onCheckout }: CartSummaryProps) => {
  const subtotal = items.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0);
  
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-market-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-market-primary hover:bg-market-primary/90"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Secure payment processing</p>
        <div className="flex justify-center space-x-2 mt-2">
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
