"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const storedUsername = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      router.push('/login');
      return;
    }

    setUsername(storedUsername || '');
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/50 backdrop-blur-lg">
        <nav className="w-full mx-auto px-10 h-22 flex items-center justify-between">
          <Link href="/" className="ml-0">
            <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-full" />
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-blue-400">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-32 md:pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-blue-400 mb-4">Your Dashboard</h1>
            <p className="text-gray-400">Access all your resources and opportunities in one place.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
              <h2 className="text-xl font-semibold mb-4">Recent Job Opportunities</h2>
              <Link 
                href="/jobs" 
                className="text-blue-400 hover:underline block mt-4"
              >
                View All Jobs →
              </Link>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
              <h2 className="text-xl font-semibold mb-4">Scholarship Deadlines</h2>
              <Link 
                href="/scholarships" 
                className="text-blue-400 hover:underline block mt-4"
              >
                View All Scholarships →
              </Link>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
              <h2 className="text-xl font-semibold mb-4">Legal Resources</h2>
              <Link 
                href="/legal" 
                className="text-blue-400 hover:underline block mt-4"
              >
                View Legal Help →
              </Link>
            </div>
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Job Opportunities */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Featured Jobs</h2>
              <div className="space-y-4">
                {/* Sample job listings - replace with real data */}
                {[1, 2, 3].map((job) => (
                  <div key={job} className="p-4 bg-gray-700/50 rounded-md">
                    <h3 className="font-medium">Software Developer</h3>
                    <p className="text-gray-400 text-sm">Remote • Full-time</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Upcoming Scholarships</h2>
              <div className="space-y-4">
                {/* Sample scholarships - replace with real data */}
                {[1, 2, 3].map((scholarship) => (
                  <div key={scholarship} className="p-4 bg-gray-700/50 rounded-md">
                    <h3 className="font-medium">Dream.US Scholarship</h3>
                    <p className="text-gray-400 text-sm">Deadline: March 1, 2025</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Assistant Section */}
          <div className="mt-12 p-6 bg-gray-800/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">AI Career Assistant</h2>
            <div className="flex gap-6 flex-wrap">
              <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                Resume Analysis
              </button>
              <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                Career Path Suggestions
              </button>
              <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                Interview Prep
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}