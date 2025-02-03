// app/jobs/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Sample job data
const sampleJobs = {
  fullTime: [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Corp",
      location: "Remote",
      salary: "$80,000 - $120,000",
      description: "Looking for a full-stack developer...",
      requirements: ["React", "Node.js", "SQL"],
      type: "Independent Contractor"
    }
  ],
  internships: [
    {
      id: 1,
      title: "Summer Research Intern",
      organization: "Research Institute",
      location: "Hybrid",
      stipend: "$5,000",
      duration: "10 weeks",
      description: "Research opportunity in environmental science..."
    }
  ],
  research: [
    {
      id: 1,
      title: "Research Assistant",
      institution: "University Lab",
      field: "Computer Science",
      funding: "Grant-funded",
      duration: "1 year",
      description: "AI/ML research project..."
    }
  ]
};

function AuthenticatedJobsPage() {
  const [activeTab, setActiveTab] = useState('fullTime');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredJobs(sampleJobs);
      return;
    }

    const filtered = {
      fullTime: sampleJobs.fullTime.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term)
      ),
      internships: sampleJobs.internships.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.organization.toLowerCase().includes(term)
      ),
      research: sampleJobs.research.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.institution.toLowerCase().includes(term)
      )
    };

    setFilteredJobs(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('fullTime')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'fullTime' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Full-Time Jobs
        </button>
        <button
          onClick={() => setActiveTab('internships')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'internships' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Internships & Fellowships
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'research' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Research Opportunities
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === 'fullTime' && filteredJobs.fullTime.map(job => (
          <div key={job.id} className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-400">{job.company}</p>
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {job.type}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-gray-300">{job.location} • {job.salary}</p>
            </div>
            <p className="text-gray-400 mb-4">{job.description}</p>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <span key={index} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm">
                  {req}
                </span>
              ))}
            </div>
          </div>
        ))}

        {activeTab === 'internships' && filteredJobs.internships.map(internship => (
          <div key={internship.id} className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <h3 className="text-xl font-semibold mb-2">{internship.title}</h3>
            <p className="text-gray-400 mb-2">{internship.organization}</p>
            <div className="mb-4">
              <p className="text-gray-300">
                {internship.location} • {internship.stipend} • {internship.duration}
              </p>
            </div>
            <p className="text-gray-400">{internship.description}</p>
          </div>
        ))}

        {activeTab === 'research' && filteredJobs.research.map(research => (
          <div key={research.id} className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <h3 className="text-xl font-semibold mb-2">{research.title}</h3>
            <p className="text-gray-400 mb-2">{research.institution}</p>
            <div className="mb-4">
              <p className="text-gray-300">
                {research.field} • {research.funding} • {research.duration}
              </p>
            </div>
            <p className="text-gray-400">{research.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UnauthenticatedJobsPage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-blue-400 block">Find Your Next</span>
          <span>Opportunity</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Access hundreds of job opportunities, internships, and research positions open to undocumented students.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Get Started
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Full-Time Opportunities</h3>
          <p className="text-gray-400 mb-4">
            Browse through verified independent contractor positions and remote work opportunities.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Remote positions</li>
            <li>✓ Independent contractor roles</li>
            <li>✓ Verified employers</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Internships & Fellowships</h3>
          <p className="text-gray-400 mb-4">
            Discover paid internships and fellowships specifically open to undocumented students.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Paid opportunities</li>
            <li>✓ Summer programs</li>
            <li>✓ Professional development</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Research Opportunities</h3>
          <p className="text-gray-400 mb-4">
            Find research positions and academic opportunities at top institutions.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Research assistantships</li>
            <li>✓ Grant-funded positions</li>
            <li>✓ Academic collaborations</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center py-16 bg-gray-800/50 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-gray-400 mb-8">
          Join thousands of students who have found their path through UndocuLink.
        </p>
        <Link 
          href="/signup" 
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Free Account
        </Link>
      </motion.div>
    </div>
  );
}

export default function JobsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('username');
          router.push('/login');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/50 backdrop-blur-lg' : ''}`}>
        <nav className="w-full mx-auto px-10 h-22 flex items-center justify-between">
          <Link href="/" className="ml-0">
            <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-full" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Dashboard</Link>
            <Link href="/jobs" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Job Opportunities</Link>
            <Link href="/legal" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Legal Help</Link>
            <Link href="/scholarships" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Scholarships</Link>
            <Link href="/networking" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Networking</Link>
            <Link href="/socialmedia" className="hover:text-blue-400 transition-colors px-4 py-2 rounded-md hover:bg-white/[0.02]">Social Media</Link>
          </div>

          <div className="hidden md:flex items-center gap-4 mr-0">
            {isAuthenticated ? (
              <button
                onClick={() => router.push('/logout')}
                className="px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
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
              {isAuthenticated ? (
                <button
                  onClick={() => router.push('/logout')}
                  className="w-full px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors mb-2">
                    Login
                  </Link>
                  <Link href="/signup" className="block px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </header>

      <main className="pt-32 md:pt-40 pb-20">
        {isAuthenticated ? <AuthenticatedJobsPage /> : <UnauthenticatedJobsPage />}
      </main>
    </div>
  );
}