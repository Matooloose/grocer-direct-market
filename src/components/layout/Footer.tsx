
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="market-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand and description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-market-primary text-xl font-bold font-poppins">farmers</span>
              <span className="text-market-dark text-xl font-bold font-poppins">bracket</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Connecting farmers directly with consumers for fresher food and fairer prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-market-primary text-sm">Farmers Dashboard</Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-market-primary text-sm">Admin Dashboard</Link>
              </li>
            </ul>
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
