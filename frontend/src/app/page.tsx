"use client"; // Indicates this is a client-side component in Next.js

import { useState, useEffect } from 'react'; // Importing React hooks for state management
import Link from 'next/link'; // Next.js component for client-side navigation
import Image from 'next/image'; // Next.js optimized image component
import { motion } from 'framer-motion'; // Animation library for React

export default function Home() {
 // State for tracking scroll position to change header styling
 const [scrolled, setScrolled] = useState(false);
 // State for mobile menu toggle
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 // Effect hook to handle scroll events
 useEffect(() => {
   const handleScroll = () => {
     // Update scrolled state based on window scroll position
     setScrolled(window.scrollY > 0);
   };
   // Add scroll event listener when component mounts
   window.addEventListener('scroll', handleScroll);
   // Clean up event listener when component unmounts
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
     {/* Header with dynamic background based on scroll position */}
     <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/50 backdrop-blur-lg' : ''}`}>
       <nav className="w-full mx-auto px-10 h-22 flex items-center justify-between">
         {/* Site logo */}
         <Link href="/" className="ml-0">
           <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-full" />
         </Link>

         {/* Desktop Navigation Menu - hidden on mobile */}
         <div className="hidden md:flex items-center gap-8">
           <Link href="/dashboard" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Dashboard</Link>
           <Link href="/jobs" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Job Opportunities</Link>
           <Link href="/legal" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Legal Help</Link>
           <Link href="/scholarships" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Scholarships</Link>
           <Link href="/networking" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Networking</Link>
           <Link href="/socialmedia" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Social Media</Link>
         </div>
        
         {/* Authentication buttons - hidden on mobile */}
         <div className="hidden md:flex items-center gap-4 mr-0">
           <Link href="/login" className="px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors">
             Login
           </Link>
           <Link href="/signup" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
             Sign Up
           </Link>
         </div>

         {/* Mobile Menu Toggle Button - visible only on mobile */}
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

       {/* Mobile Menu - animated with framer-motion */}
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
           {/* Mobile navigation links */}
           <Link href="/dashboard" className="block hover:text-blue-400 transition-colors">Dashboard</Link>
           <Link href="/jobs" className="block hover:text-blue-400 transition-colors">Job Opportunities</Link>
           <Link href="/legal" className="block hover:text-blue-400 transition-colors">Legal Help</Link>
           <Link href="/scholarships" className="block hover:text-blue-400 transition-colors">Scholarships</Link>
           <Link href="/networking" className="block hover:text-blue-400 transition-colors">Networking</Link>
           <Link href="/socialmedia" className="block hover:text-blue-400 transition-colors">Social Media</Link>
           {/* Mobile authentication buttons */}
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
       {/* Hero Section with animated elements */}
       <div className="max-w-7xl mx-auto px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center"
         >
           {/* Animated headline with staggered text reveal */}
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-shadow">
             <motion.span
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-blue-400 block text-shadow"
             >
               Linking Students
             </motion.span>
             <motion.span
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
             >
               with Opportunities
             </motion.span>
           </h1>
           
           {/* Animated subtitle with delayed reveal */}
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.6 }}
             className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 text-shadow"
           >
             A Centralized, Secure and 100% Free Platform Connecting Undocumented and Immigrant Students with Resources
           </motion.p>

           {/* Call-to-action button with animation */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
             className="flex flex-col sm:flex-row justify-center gap-4"
           >
             <Link 
               href="/signup"
               className="px-6 py-3 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors text-shadow"
             >
               Get Started
             </Link>
           </motion.div>
         </motion.div>
       </div>

       {/* Features Grid Section with scroll-triggered animations */}
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
         
         {/* Features grid with staggered animation on scroll */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-3 gap-8"
         >
           {/* Map through feature data to generate cards */}
           {[
             {
               title: "Centralized Resources",
               description: "Jobs, Internships, Fellowships, Research Opportunities and every resaource imagginable collected from across the web in one place."
             },
             {
               title: "Secure and UI Friendly Design",
               description: "Clean, intuitive design with modern security protocals designed to collect ZERO personal data"
             },
             {
               title: "AI-Powered Tools",
               description: "Tools to optimize your resume and career path to help you stay informed and forge your path forward"
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
       
       {/* About Us Section with responsive grid layout */}
       <div id="about" className="max-w-7xl mx-auto px-6 mt-32">
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="text-3xl font-bold text-blue-400 text-center mb-12"
         >
           About Us
         </motion.h2>

         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
         >
           {/* Text content with staggered paragraph animations */}
           <div className="space-y-6">
             <div className="flex items-center gap-4 mb-8">
               <h3 className="text-2xl font-semibold">Our Mission</h3>
             </div>

             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               viewport={{ once: true }}
               className="text-gray-400 leading-relaxed mb-6"
             >
               UndocuLink was founded with one simple mission, to connect the undocumented
               population with the needed resources and opportunities to succeed in higher 
               education and professionally.
             </motion.p>
             
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               viewport={{ once: true }}
               className="text-gray-400 leading-relaxed mb-6"
             >
               Whether you are in high school, college, are about to graduate, or are already 
               in the workforce, we are here to help you succeed in whatever you set your mind to.
             </motion.p>

             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               viewport={{ once: true }}
               className="text-gray-400 leading-relaxed mb-6"
             >
               Our platform serves as a comprehensive resource hub collecting undocu friendly 
               opportunities from all across the web. We achieve this while keeping your security 
               as a priority as we do not collect any personal data nor do we ever lock any 
               resources behind a paywall.
             </motion.p>
           </div>

           {/* Image with overlay gradient */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             viewport={{ once: true }}
             className="relative h-[600px] rounded-xl overflow-hidden"
           >
             <Image
               src="/logo.png"
               alt="Empowered Students"
               fill
               className="object-cover rounded-xl"
             />
             {/* Dark gradient overlay on image bottom */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>
           </motion.div>
         </motion.div>
       </div>
       
       {/* Features Offered Section with icon cards */}
       <div className="max-w-7xl mx-auto px-6 mt-32">
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="text-3xl font-bold text-blue-400 text-center mb-12"
         >
           Features Offered
         </motion.h2>

         {/* Features grid with hover effects and staggered animations */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-3 gap-8"
         >
           {/* Map through detailed feature data to generate cards with icons */}
           {[
             {
               title: "Our Job Opportunities Hub",
               description: "Access to independent contracting job listings, stipend internship, fellowships and reseaerch opportunities. As well as entreneprenuership resources for undocu business owners.",
               icon: "💼"
             },
             {
               title: "Legal Resources",
               description: "Stay on top of the latest news, your rights, and find free legal services near you.",
               icon: "⚖️"
             },
             {
               title: "Financial Aid",
               description: "Discover scholarships, grants, and financial assistance programs open to undocumented students.",
               icon: "🎓"
             },
             {
               title: "Community Support",
               description: "Join a network of students, professionals, and allies who understand and support your journey.",
               icon: "🤝"
             },
             {
               title: "Social Media",
               description: "Find Undocu-friendly creators or connect with businesses and other resources through social media",
               icon: "📱"
             },
             {
               title: "Secure Platform",
               description: "Your privacy is our priority. We use Signal's industry-leading encryption standards and collect minimal information if you decide to use our networking features, ensuring your data stays secure and private. ",
               icon: "🔒"
             }
           ].map((feature, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               viewport={{ once: true }}
               className="p-8 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-all hover:-translate-y-1"
             >
               <div className="text-4xl mb-4">{feature.icon}</div>
               <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
               <p className="text-gray-400">{feature.description}</p>
             </motion.div>
           ))}
         </motion.div>
       </div>
     </main>

     {/* Footer with site links and copyright info */}
     <footer className="mt-32 py-8 border-t border-gray-800">
       <div className="max-w-7xl mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-400">
           <Link href="/#about" className="hover:text-blue-400 transition-colors">About Us</Link>
           <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
           <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
           <p>© 2025 UndocuLink. All Rights Reserved.</p>
         </div>
       </div>
     </footer>
   </div>
 );
}