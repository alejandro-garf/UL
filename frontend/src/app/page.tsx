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
   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
     <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/50 backdrop-blur-lg' : ''}`}>
     {/*logo left*/}
       <nav className="w-full mx-auto px-10 h-22 flex items-center justify-between">
         <Link href="/" className="ml-0">
           <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-full" />
         </Link>

         {/* Desktop Navigation */}
         <div className="hidden md:flex items-center gap-8">
           <Link href="/dashboard" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Dashboard</Link>
           <Link href="/jobs" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Job Opportunities</Link>
           <Link href="/legal" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Legal Help</Link>
           <Link href="/scholarships" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Scholarships</Link>
           <Link href="/networking" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Networking</Link>
           <Link href="/socialmedia" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Social Media</Link>
         </div>
        
        {/*sign in and sign out*/}
         <div className="hidden md:flex items-center gap-4 mr-0">
           <Link href="/login" className="px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors">
             Login
           </Link>
           <Link href="/signup" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
             Sign Up
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
         <div className="px-6 py-4 bg-gray-900/90 backdrop-blur-lg space-y-4">
           <Link href="/dashboard" className="block hover:text-blue-400 transition-colors">Dashboard</Link>
           <Link href="/jobs" className="block hover:text-blue-400 transition-colors">Job Opportunities</Link>
           <Link href="/legal" className="block hover:text-blue-400 transition-colors">Legal Help</Link>
           <Link href="/scholarships" className="block hover:text-blue-400 transition-colors">Scholarships</Link>
           <Link href="/networking" className="block hover:text-blue-400 transition-colors">Networking</Link>
           <Link href="/socialmedia" className="block hover:text-blue-400 transition-colors">Social Media</Link>
           <div className="pt-4 border-t border-gray-800">
             <Link href="/login" className="px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors">
               Login
             </Link>
             <Link href="/signup" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
               Sign Up
             </Link>
           </div>
         </div>
       </motion.div>
     </header>

     <main className="pt-32 md:pt-56">
       {/* Hero Section */}
       <div className="max-w-7xl mx-auto px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center"
         >
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-shadow">
             <motion.span
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-blue-400 block text-shadow"
             >
               Empowering Students
             </motion.span>
             <motion.span
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
             >
               with Opportunities
             </motion.span>
           </h1>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.6 }}
             className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 text-shadow"
           >
             A centralized platform connecting undocumented and immigrant students with career resources
           </motion.p>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
             className="flex flex-col sm:flex-row justify-center gap-4"
           >
             <Link 
               href="/get-started"
               className="px-6 py-3 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors text-shadow"
             >
               Get Started
             </Link>
           </motion.div>
         </motion.div>
       </div>

       {/* Features Grid */}
       <div className="max-w-7xl mx-auto px-6 mt-32">
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="text-3xl font-bold text-blue-400 text-center mb-12"
         >
           Why Choose UndocuLink?
         </motion.h2>
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.2 }}
               viewport={{ once: true }}
               className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
             >
               <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
               <p className="text-gray-400">{feature.description}</p>
             </motion.div>
           ))}
         </motion.div>
       </div>
     </main>

     <footer className="mt-32 py-8 border-t border-gray-800">
       <div className="max-w-7xl mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-400">
           <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
           <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
           <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
           <p>© 2024 UndocuLink. All Rights Reserved.</p>
         </div>
       </div>
     </footer>
   </div>
 );
}