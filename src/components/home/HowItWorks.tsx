
import { Leaf, Truck, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: <Leaf className="h-10 w-10 text-market-primary" />,
    title: 'Farm Fresh Products',
    description: 'Our farmers harvest produce at peak freshness, ensuring you get the best quality.',
  },
  {
    icon: <CreditCard className="h-10 w-10 text-market-primary" />,
    title: 'Easy Purchase',
    description: 'Browse, select, and pay with our secure checkout system.',
  },
  {
    icon: <Truck className="h-10 w-10 text-market-primary" />,
    title: 'Fast Delivery',
    description: 'Get your order delivered right to your doorstep in the shortest time possible.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="market-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-market-dark mb-4">How It Works</h2>
          <p className="text-gray-600">
            GrocerDirect connects you directly with local farmers, cutting out the middleman to bring you fresher food at better prices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-market-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
