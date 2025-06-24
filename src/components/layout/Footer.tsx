
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="market-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-market-primary text-xl font-bold font-poppins">farmers</span>
              <span className="text-market-dark text-xl font-bold font-poppins">bracket</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Connecting farmers directly with consumers for fresher food and fairer prices.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-market-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-market-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-market-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-market-primary text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-market-primary text-sm">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-market-primary text-sm">Contact</Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-market-primary text-sm">Admin</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-600 text-sm">
              <p>1234 Farm Road</p>
              <p>Harvest Valley, CA 90210</p>
              <p className="mt-3">Email: info@farmersbracket.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} farmersbracket. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
