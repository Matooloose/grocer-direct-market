
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryHighlights from '@/components/home/CategoryHighlights';
import HowItWorks from '@/components/home/HowItWorks';
import FarmerHighlight from '@/components/home/FarmerHighlight';
import Testimonials from '@/components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
          <Button
            asChild
            size="lg"
            className="bg-white text-market-primary hover:bg-white/90"
          >
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
