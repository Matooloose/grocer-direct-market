
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, X, User, Brackets, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemsCount = 3;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 safe-area-top">
      <div className="market-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <Brackets className="h-6 w-6 text-market-primary mr-1" />
                <span className="text-market-dark text-xl font-bold font-poppins">farmers</span>
                <span className="text-market-primary text-xl font-bold font-poppins">bracket</span>
              </div>
              <div className="flex items-center ml-2 text-xs text-market-brown">
                <ArrowLeft className="h-3 w-3 mr-1" />
                <span>shop left</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-market-primary font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-market-primary font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-market-primary font-medium">Contact</Link>
          </div>

          {/* Search, Cart, User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-market-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/admin" className="w-full">Admin Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-market-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-market-primary font-medium py-2" onClick={toggleMenu}>Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-market-primary font-medium py-2" onClick={toggleMenu}>About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-market-primary font-medium py-2" onClick={toggleMenu}>Contact</Link>
              
              <div className="relative pt-2">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <input type="text" placeholder="Search products..." className="w-full px-4 py-2 outline-none" />
                  <Button variant="ghost" size="icon" className="border-l">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="pt-2 flex flex-col space-y-2">
                <Link to="/admin" className="text-gray-700 hover:text-market-primary font-medium py-2" onClick={toggleMenu}>Admin Dashboard</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
