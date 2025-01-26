"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-lg' : ''}`}>
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded-full" />
            <span className="text-xl font-medium">UndocuLink</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="/resources" className="text-sm text-gray-300 hover:text-white transition-colors">Resources</Link>
            <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <motion.div 
          className="md:hidden"
          initial="closed"
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { height: 'auto', opacity: 1 },
            closed: { height: 0, opacity: 0 }
          }}
        >
          <div className="px-6 py-4 bg-black/90 backdrop-blur-lg space-y-4">
            <Link href="/features" className="block text-gray-300 hover:text-white">Features</Link>
            <Link href="/resources" className="block text-gray-300 hover:text-white">Resources</Link>
            <Link href="/about" className="block text-gray-300 hover:text-white">About</Link>
            <div className="pt-4 border-t border-gray-800">
              <Link href="/login" className="block text-gray-300 hover:text-white mb-4">Log in</Link>
              <Link href="/signup" className="block px-4 py-2 bg-white text-black text-center rounded-full hover:bg-gray-200">
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="pt-32 md:pt-40">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              Empowering Students with
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Opportunities
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              A centralized platform connecting undocumented and immigrant students with career resources
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/get-started"
                className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Get Started
              </Link>
              <Link 
                href="/explore"
                className="px-8 py-4 border border-gray-800 rounded-full hover:border-gray-700 transition-colors text-sm font-medium"
              >
                Explore Resources
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mt-32 md:mt-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Centralized Resources",
                description: "All jobs, scholarships, and opportunities in one place."
              },
              {
                title: "User-Friendly Interface",
                description: "Clean, intuitive design for easy navigation."
              },
              {
                title: "AI-Powered Tools",
                description: "Tools to optimize your resume and career path."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-b from-gray-800/50 to-transparent border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <footer className="mt-32 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={24} height={24} className="rounded-full" />
              <span className="text-sm">© 2024 UndocuLink</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}