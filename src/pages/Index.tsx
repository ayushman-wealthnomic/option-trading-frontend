import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative overflow-hidden flex flex-col w-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="/cover.jpg"
          alt="Industrial background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-70"></div>
      </div>

      <header className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">100X</span>
          <span className="text-2xl font-bold">SPACE</span>
          <img
            src="/logo.png"
            alt="100X Space Logo" // Changed alt text to be more specific
            className="w-[98px] h-[47px] object-cover"
          />
        </div>

        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#" className="hover:text-gray-300 transition-colors">Mission</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Blog</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Sign Up</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Login</a>
        </nav>

        <div className="lg:hidden w-10"></div>
      </header>


      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 z-20 bg-black bg-opacity-95 backdrop-blur-sm">
          <nav className="flex flex-col p-6 space-y-4">
            <a href="#" className="text-lg hover:text-gray-300 transition-colors">Mission</a>
            <a href="#" className="text-lg hover:text-gray-300 transition-colors">Blog</a>
            <a href="#" className="text-lg hover:text-gray-300 transition-colors">Sign Up</a>
            <a href="#" className="text-lg hover:text-gray-300 transition-colors">Login</a>
          </nav>
        </div>
      )}

      {/* Main content now takes up available space */}
      <main className="relative z-10 flex flex-col justify-center px-6 lg:px-12 pb-32 flex-grow"> {/* Removed min-h-screen, Added flex-grow */}
        <div className="max-w-4xl">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 leading-none">
            Discover
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-400 mb-12 font-light">
            the strategy
          </p>

          <div className="mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">
              INDIA'S FIRST AI DRIVEN
            </h2>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
              Trading PLATFORM
            </h2>
          </div>

          {/* CTA Button */}
          <button onClick={() => { navigate('/dashboard') }} className="inline-flex items-center space-x-3 border-2 border-white px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 group">
            <span className="text-lg font-medium">EXPLORE PLATFORM</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between p-6 lg:px-12">
        <p className="text-sm text-gray-400 mb-4 sm:mb-0">
          © 100X SPACE INVESTMENT TECHNOLOGIES PVT LTD 2022
        </p>

        <div className="flex items-center space-x-4">
          <a href="#" className="p-2 hover:bg-white hover:bg-opacity-10 hover:text-black rounded-full transition-colors">
            <MessageCircle size={20} />
          </a>
          <a href="#" className="p-2 hover:bg-white hover:bg-opacity-10 hover:text-black rounded-full transition-colors">
            <Youtube size={20} />
          </a>
          <a href="#" className="p-2 hover:bg-white hover:bg-opacity-10 hover:text-black rounded-full transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="p-2 hover:bg-white hover:bg-opacity-10  hover:text-black rounded-full transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="p-2 hover:bg-white hover:bg-opacity-10 hover:text-black rounded-full transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;