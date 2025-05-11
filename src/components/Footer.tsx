
import React from "react";
import { LogoPlaceholder } from "../assets/placeholder";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white pt-12 pb-8">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div className="flex flex-col space-y-4">
            <LogoPlaceholder className="text-gold" />
            <p className="text-gray-300 text-sm mt-4">
              Beauty Time offers exclusive luxury perfumes crafted by master perfumers using only the finest ingredients.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-serif mb-4 text-gold">Quick Links</h3>
            <Link to="/products" className="text-gray-300 hover:text-white text-sm">Our Collection</Link>
            <Link to="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white text-sm">Contact</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link>
          </div>
          
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-serif mb-4 text-gold">Contact Us</h3>
            <p className="text-gray-300 text-sm">123 Luxury Lane</p>
            <p className="text-gray-300 text-sm">Beverly Hills, CA 90210</p>
            <p className="text-gray-300 text-sm">contact@beautytime.com</p>
            <p className="text-gray-300 text-sm">+1 (888) 555-LUXE</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Beauty Time. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gold">Terms</a>
            <a href="#" className="text-gray-400 hover:text-gold">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gold">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
