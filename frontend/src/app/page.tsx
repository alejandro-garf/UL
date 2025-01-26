// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Responsive Navigation */}
      <nav className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Image 
            src="/logo.png" 
            alt="UndocuLink Logo" 
            width={32} 
            height={32} 
            className="rounded-full"
          />
          <span className="text-xl font-semibold">UndocuLink</span>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden absolute top-4 right-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link href="/jobs" className="hover:text-blue-400 transition-colors">Jobs</Link>
          <Link href="/internships" className="hover:text-blue-400 transition-colors">Internships</Link>
          <Link href="/scholarships" className="hover:text-blue-400 transition-colors">Scholarships</Link>
          <Link href="/networking" className="hover:text-blue-400 transition-colors">Networking</Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link 
            href="/login" 
            className="px-4 py-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto mt-12 md:mt-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-blue-400">Empowering Students</span> with
          <br className="hidden sm:block" />
          Opportunities
        </h1>
        
        <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-12 px-4">
          A centralized platform connecting undocumented and immigrant students with career resources
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link 
            href="/resources" 
            className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 font-medium transition-colors"
          >
            Explore Resources
          </Link>
          <Link 
            href="/get-started" 
            className="px-6 py-3 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Features Section */}
        <section className="mt-16 md:mt-32">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-8 md:mb-12">
            Why Choose UndocuLink?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Centralized Resources</h3>
              <p className="text-gray-400">
                All jobs, scholarships, and opportunities in one place.
              </p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
              <p className="text-gray-400">
                Clean, intuitive design for easy navigation.
              </p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">AI-Powered Tools</h3>
              <p className="text-gray-400">
                Tools to optimize your resume and career path.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 md:mt-32 py-8 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-400">
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-4">
            <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
          </div>
          <p>© 2024 UndocuLink. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}