
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FarmerHighlight = () => {
  return (
    <section className="py-16 bg-market-primary/5">
      <div className="market-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold text-market-dark mb-4">Meet Our Farmers</h2>
            <p className="text-gray-700 mb-6">
              Our marketplace is powered by passionate local farmers who are committed to sustainable agriculture and providing the freshest produce possible.
            </p>
            <p className="text-gray-700 mb-6">
              By buying directly from our network of verified farmers, you're supporting local agriculture, reducing food miles, and enjoying produce at its peak freshness.
            </p>
            <Button 
              asChild 
              className="bg-market-primary hover:bg-market-primary/90"
            >
              <Link to="/about">Learn About Our Farmers</Link>
            </Button>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Local farmers" 
                className="rounded-lg shadow-md w-full"
              />
              <div className="absolute -bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-start space-x-3">
                  <img 
                    src="/placeholder.svg" 
                    alt="Farmer" 
                    className="w-12 h-12 rounded-full" 
                  />
                  <div>
                    <p className="font-medium">Green Valley Farms</p>
                    <p className="text-sm text-gray-500 mb-2">Organic certified since 2015</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerHighlight;
