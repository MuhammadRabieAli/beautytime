
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogoPlaceholder } from "../assets/placeholder";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-cream border-b border-gray-200">
      <div className="luxury-container">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <LogoPlaceholder />
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-charcoal focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-charcoal hover:text-gold tracking-wide text-sm uppercase">
              Home
            </Link>
            <Link to="/products" className="text-charcoal hover:text-gold tracking-wide text-sm uppercase">
              Shop
            </Link>
            <Link to="/about" className="text-charcoal hover:text-gold tracking-wide text-sm uppercase">
              About
            </Link>
            <Link to="/contact" className="text-charcoal hover:text-gold tracking-wide text-sm uppercase">
              Contact
            </Link>
            <Link to="/login" className="text-charcoal hover:text-gold tracking-wide text-sm uppercase">
              Admin
            </Link>
            <button className="text-charcoal hover:text-gold">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-cream pt-2 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-charcoal hover:text-gold text-center py-2 tracking-wide text-sm uppercase"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-charcoal hover:text-gold text-center py-2 tracking-wide text-sm uppercase"
                onClick={toggleMenu}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className="text-charcoal hover:text-gold text-center py-2 tracking-wide text-sm uppercase"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-charcoal hover:text-gold text-center py-2 tracking-wide text-sm uppercase"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link 
                to="/login" 
                className="text-charcoal hover:text-gold text-center py-2 tracking-wide text-sm uppercase"
                onClick={toggleMenu}
              >
                Admin
              </Link>
              <div className="flex justify-center pt-2">
                <button className="text-charcoal hover:text-gold">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
