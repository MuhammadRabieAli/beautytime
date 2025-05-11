
import React from "react";
import { Link } from "react-router-dom"; // Add this import
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import { ArrowRight } from "lucide-react";

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      
      {/* Luxury Brand Values Section */}
      <section className="py-20 bg-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-cream">
                <svg className="w-8 h-8 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-4">Artisanal Excellence</h3>
              <p className="text-gray-600">
                Our perfumes are crafted by master artisans with decades of expertise, using rare ingredients sourced from around the world.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-cream">
                <svg className="w-8 h-8 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-4">Sustainable Luxury</h3>
              <p className="text-gray-600">
                We are committed to ethical sourcing and environmentally conscious practices, ensuring guilt-free indulgence.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-cream">
                <svg className="w-8 h-8 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-4">Timeless Elegance</h3>
              <p className="text-gray-600">
                Our fragrances transcend trends, creating signature scents that become an enduring part of your personal legacy.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Luxury Brand Story Section */}
      <section className="py-20 bg-cream">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Crafted with Passion and Precision</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Beauty Time, we believe that a fragrance is more than just a scent—it's an emotion, a memory, and a statement. Our master perfumers select only the finest ingredients from around the world to create distinctive scents that leave a lasting impression.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Each bottle represents hundreds of hours of artisanal craftsmanship, from the initial concept to the final composition. This dedication to excellence has made Beauty Time a symbol of luxury and refinement.
              </p>
              
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607960402358-a5ceb04ebeb4?q=80&w=1462&auto=format&fit=crop')] bg-cover bg-center rounded-sm shadow-soft"></div>
              <div className="absolute -bottom-4 -right-4 h-[200px] w-[200px] border-2 border-gold rounded-sm"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="luxury-container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream p-8 shadow-soft rounded-sm">
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "Beauty Time's Elysian Rose has become my signature scent. Everywhere I go, people ask what perfume I'm wearing. The quality and longevity are unmatched."
              </p>
              <p className="font-medium text-right">— Olivia S.</p>
            </div>
            
            <div className="bg-cream p-8 shadow-soft rounded-sm">
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "The attention to detail in both the fragrances and packaging shows true craftsmanship. I've tried many luxury perfumes, but Beauty Time stands out for their unique, sophisticated scents."
              </p>
              <p className="font-medium text-right">— James L.</p>
            </div>
            
            <div className="bg-cream p-8 shadow-soft rounded-sm">
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "Oud Royale is exceptional. The complexity and evolution of the scent throughout the day make it worth every penny. It's become an essential part of my daily ritual."
              </p>
              <p className="font-medium text-right">— Elena M.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Subscription Banner */}
      <section className="py-16 bg-charcoal text-white">
        <div className="luxury-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-serif mb-3">Join Our Exclusive List</h3>
              <p className="text-gray-300">Be the first to know about new launches and special offers</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-sm w-full sm:w-64 text-charcoal"
                  required
                />
                <button type="submit" className="btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
