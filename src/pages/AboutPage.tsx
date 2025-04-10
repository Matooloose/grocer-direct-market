
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, MapPin, ShieldCheck, Truck } from 'lucide-react';

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="bg-gray-50 py-8">
        <div className="market-container">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About farmers<span className="text-market-primary">bracket</span></h1>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Connecting local farmers directly with consumers for fresher produce, fair prices, and a sustainable food system.
            </p>
            <div className="flex justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Farmers Market" 
                className="rounded-lg shadow-lg max-w-full h-auto"
                width={800}
                height={400}
              />
            </div>
          </section>

          {/* Our Mission */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-4">
                At farmersbracket, our mission is to revolutionize the way fresh produce moves from farm to table. We believe in:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Leaf className="h-6 w-6 text-market-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Supporting local agriculture and sustainable farming practices</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-6 w-6 text-market-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ensuring fair compensation for farmers and affordable prices for consumers</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 text-market-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reducing food miles and carbon footprint in the food supply chain</span>
                </li>
                <li className="flex items-start">
                  <Truck className="h-6 w-6 text-market-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Creating efficient, transparent logistics for fresh food delivery</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Our Story */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-4">
                farmersbracket began with a simple observation: fresh produce travels too far, passes through too many hands, and costs too much before reaching consumers. Meanwhile, local farmers struggle to get fair prices and reliable distribution channels.
              </p>
              <p className="text-gray-700 mb-4">
                Founded in 2023, we set out to create a platform that connects farmers directly with consumers and local businesses, cutting out middlemen and creating a more efficient, sustainable food system.
              </p>
              <p className="text-gray-700">
                Today, we're proud to support hundreds of farmers and deliver thousands of orders of fresh, local produce to customers who appreciate the difference in quality, price, and environmental impact.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-8 bg-market-primary rounded-lg shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to join our community?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-6">
              Whether you're a farmer looking to sell your produce or a customer searching for the freshest local food, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-market-primary hover:bg-white/90"
              >
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
