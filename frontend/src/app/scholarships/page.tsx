"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Sample scholarship data
const sampleScholarships = {
  undergraduate: [
    {
      id: 1,
      name: "Dream.US National Scholarship",
      amount: "$33,000",
      deadline: "February 28, 2025",
      eligibility: ["DACA or TPS", "High School Senior or College Student", "GPA 2.5+"],
      description: "Scholarship for first-time college students or community college graduates.",
      status: "Open"
    },
    {
      id: 2,
      name: "Golden Door Scholars",
      amount: "Full Tuition",
      deadline: "March 15, 2025",
      eligibility: ["DACA or Undocumented", "High School Senior", "GPA 3.0+"],
      description: "Full tuition scholarship for undocumented students.",
      status: "Coming Soon"
    }
  ],
  graduate: [
    {
      id: 3,
      name: "Paul & Daisy Soros Fellowship",
      amount: "$90,000",
      deadline: "October 30, 2025",
      eligibility: ["New American", "Graduate Student", "Under 30"],
      description: "Fellowship for graduate students who are new Americans.",
      status: "Open"
    }
  ],
  research: [
    {
      id: 4,
      name: "Research Initiative Grant",
      amount: "$5,000",
      deadline: "Rolling",
      eligibility: ["Current Student", "Research Proposal", "Faculty Sponsor"],
      description: "Grant for students conducting academic research.",
      status: "Open"
    }
  ]
};

function AuthenticatedScholarshipsPage() {
  const [activeTab, setActiveTab] = useState('undergraduate');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState(sampleScholarships);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Add real API call here to fetch scholarships
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredScholarships(sampleScholarships);
      return;
    }

    const filtered = Object.keys(sampleScholarships).reduce((acc, category) => {
      acc[category] = sampleScholarships[category].filter(scholarship =>
        scholarship.name.toLowerCase().includes(term) ||
        scholarship.description.toLowerCase().includes(term)
      );
      return acc;
    }, {});

    setFilteredScholarships(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search scholarships..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
        />
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="coming">Coming Soon</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('undergraduate')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'undergraduate' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Undergraduate
        </button>
        <button
          onClick={() => setActiveTab('graduate')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'graduate' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Graduate
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'research' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Research Grants
        </button>
      </div>

      {/* Scholarship Listings */}
      <div className="space-y-6">
        {filteredScholarships[activeTab]?.map((scholarship) => (
          <div key={scholarship.id} className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{scholarship.name}</h3>
                <p className="text-blue-400 text-lg">{scholarship.amount}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                scholarship.status === 'Open' 
                  ? 'bg-green-500/20 text-green-400'
                  : scholarship.status === 'Coming Soon'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {scholarship.status}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-gray-400">Deadline: {scholarship.deadline}</p>
            </div>
            <p className="text-gray-300 mb-4">{scholarship.description}</p>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Eligibility:</h4>
              <ul className="list-disc list-inside text-gray-400">
                {scholarship.eligibility.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UnauthenticatedScholarshipsPage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-blue-400 block">Scholarships &</span>
          <span>Financial Aid</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Access hundreds of scholarship opportunities specifically available for undocumented and DACA students.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Find Scholarships
        </button>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Undergraduate Scholarships</h3>
          <p className="text-gray-400 mb-4">
            Find scholarships for high school seniors and current undergraduate students.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Full tuition awards</li>
            <li>✓ Merit-based scholarships</li>
            <li>✓ Need-based grants</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Graduate Fellowships</h3>
          <p className="text-gray-400 mb-4">
            Explore opportunities for graduate and professional degree programs.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Research fellowships</li>
            <li>✓ Professional development</li>
            <li>✓ Leadership programs</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Application Support</h3>
          <p className="text-gray-400 mb-4">
            Get help with your scholarship applications and essays.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Essay writing tips</li>
            <li>✓ Application checklists</li>
            <li>✓ Document preparation</li>
          </ul>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center py-16 bg-gray-800/50 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Don't Miss Any Deadlines</h2>
        <p className="text-gray-400 mb-8">
          Join UndocuLink to get notifications about new scholarships and upcoming deadlines.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Free Account
        </button>
      </motion.div>
    </div>
  );
}

export default function ScholarshipsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
      <main className="pt-32 md:pt-40 pb-20">
        {isAuthenticated ? <AuthenticatedScholarshipsPage /> : <UnauthenticatedScholarshipsPage />}
      </main>
    </div>
  );
}