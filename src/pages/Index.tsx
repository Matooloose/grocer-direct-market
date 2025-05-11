
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryHighlights from '@/components/home/CategoryHighlights';
import HowItWorks from '@/components/home/HowItWorks';
import FarmerHighlight from '@/components/home/FarmerHighlight';
import Testimonials from '@/components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Images, Calculator } from 'lucide-react';

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <FeaturedProducts />
      <CategoryHighlights />
      <HowItWorks />
      <FarmerHighlight />
      <Testimonials />
      
      {/* Call to Action */}
      <section className="py-16 bg-market-primary">
        <div className="market-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to start shopping?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Browse our selection of fresh, locally-sourced products and support farmers in your community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-market-primary hover:bg-white/90"
            >
              <Link to="/products">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Shop Now
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/gallery">
                <Images className="h-5 w-5 mr-2" />
                Image Gallery
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/math-game">
                <Calculator className="h-5 w-5 mr-2" />
                Math Game
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
