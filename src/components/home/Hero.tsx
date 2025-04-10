
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-market-primary/5 py-16 md:py-24">
      <div className="market-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-market-dark">
                From Farm to Table, <span className="text-market-primary">Directly</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700 max-w-md">
                Skip the middleman. Get fresher produce, support local farmers, and enjoy fair prices.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                className="bg-market-primary hover:bg-market-primary/90 text-white px-8 py-6"
                size="lg"
              >
                <Link to="/products">
                  Shop Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="bg-white border-market-primary text-market-primary hover:bg-market-primary/5 px-8 py-6"
                size="lg"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            
            <div className="relative mt-8">
              <div className="flex items-center border-2 border-market-primary/20 rounded-full overflow-hidden bg-white shadow-sm">
                <input 
                  type="text" 
                  placeholder="Search for fresh products..." 
                  className="w-full px-6 py-3 outline-none text-gray-700" 
                />
                <Button 
                  className="bg-market-primary hover:bg-market-primary/90 rounded-full px-6 py-6 mr-1"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="aspect-square bg-market-lightBrown rounded-full overflow-hidden">
              <img 
                src="/placeholder.svg"
                alt="Fresh produce" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="bg-market-secondary/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-market-secondary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <p className="font-medium">Quality Guaranteed</p>
                  <p className="text-sm text-gray-500">Verified sellers only</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="bg-market-accent/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-market-accent"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                </div>
                <div>
                  <p className="font-medium">Fast Delivery</p>
                  <p className="text-sm text-gray-500">From farm to doorstep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
