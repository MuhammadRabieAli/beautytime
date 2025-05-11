
import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[85vh] min-h-[550px] bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2069&auto=format&fit=crop')]">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      <div className="luxury-container relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
            Crafted for the <span className="italic">Extraordinary</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed">
            Experience our collection of handcrafted luxury fragrances, 
            designed to evoke emotions and create lasting memories.
          </p>
          <div className="space-x-6">
            <Link to="/products" className="btn-primary">Discover Collection</Link>
            <Link to="/about" className="btn-secondary">Our Story</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
