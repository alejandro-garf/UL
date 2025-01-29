"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AlertMap from '@/app/components/AlertMap';

// Sample news data - replace with API call
const sampleNews = [
  {
    id: 1,
    title: "DACA Updates: Recent Court Decisions and Impact",
    date: "2025-01-28",
    source: "Immigration Policy Center",
    summary: "Recent federal court ruling affects DACA renewals...",
    link: "#"
  },
  {
    id: 2,
    title: "New Immigration Relief Programs Announced",
    date: "2025-01-25",
    source: "USCIS",
    summary: "The administration announces new pathways...",
    link: "#"
  }
];

// Sample legal services data
const legalServices = [
  {
    id: 1,
    name: "Immigration Law Center",
    location: "Los Angeles, CA",
    services: ["DACA renewals", "Work permit applications", "Legal consultations"],
    phone: "(555) 123-4567",
    website: "www.example.com"
  },
  // Add more services
];

// Mock ICE sighting data
const sightings = [
  { lat: 34.0522, lng: -118.2437, intensity: 0.8 },
  { lat: 34.0622, lng: -118.2537, intensity: 0.5 },
  // Add more data points
];

function AuthenticatedLegalPage() {
  const [activeTab, setActiveTab] = useState('news');
  const [region, setRegion] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Emergency Alert Banner */}
      <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-8">
        <h2 className="text-xl font-bold text-red-400 mb-2">Know Your Rights</h2>
        <p className="text-white">
          If you encounter immigration enforcement, remember:
          You have the right to remain silent and the right to an attorney.
          Save the Immigration Defense Hotline: (555) 123-4567
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'news' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Latest Updates
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'map' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Community Alerts Map
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'services' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Legal Services
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Latest Immigration News</h2>
          {sampleNews.map((news) => (
            <div key={news.id} className="p-6 bg-gray-800/50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{news.title}</h3>
                <span className="text-sm text-gray-400">{news.date}</span>
              </div>
              <p className="text-gray-400 mb-4">{news.source}</p>
              <p className="text-gray-300 mb-4">{news.summary}</p>
              <a href={news.link} className="text-blue-400 hover:underline">
                Read More →
              </a>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'map' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Community Alert Map</h2>
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="aspect-video relative bg-gray-700 rounded-lg overflow-hidden">
              {/* Replace with actual map implementation */}
              <AlertMap 
                sightings={sightings} 
                center={[-98.5795, 39.8283]} 
                zoom={4} 
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Recent Reports</h3>
              <div className="space-y-2">
                <p className="text-gray-400">• Checkpoint reported on Main St. (2 hours ago)</p>
                <p className="text-gray-400">• Activity reported in Downtown area (5 hours ago)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Free Legal Services</h2>
          
          {/* Region Filter */}
          <div className="mb-6">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            >
              <option value="all">All Regions</option>
              <option value="west">West Coast</option>
              <option value="east">East Coast</option>
              <option value="central">Central</option>
            </select>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalServices.map((service) => (
              <div key={service.id} className="p-6 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
                <p className="text-gray-400 mb-4">{service.location}</p>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Services Offered:</h4>
                  <ul className="list-disc list-inside text-gray-400">
                    {service.services.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-gray-400">
                  <p>Phone: {service.phone}</p>
                  <p>Website: {service.website}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UnauthenticatedLegalPage() {
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
          <span className="text-blue-400 block">Legal Resources</span>
          <span>& Community Protection</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Access vital legal resources, stay informed about your rights, and connect with free legal services.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Access Resources
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
          <h3 className="text-xl font-semibold mb-4">Latest Updates</h3>
          <p className="text-gray-400 mb-4">
            Stay informed about immigration policy changes, DACA updates, and important legal developments.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Policy changes</li>
            <li>✓ Court decisions</li>
            <li>✓ Program updates</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Community Alerts</h3>
          <p className="text-gray-400 mb-4">
            Real-time community alerts and interactive map to help keep our community safe and informed.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Interactive map</li>
            <li>✓ Real-time updates</li>
            <li>✓ Community reports</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Free Legal Help</h3>
          <p className="text-gray-400 mb-4">
            Connect with trusted legal services and resources in your area.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Free consultations</li>
            <li>✓ DACA assistance</li>
            <li>✓ Legal workshops</li>
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
        <h2 className="text-3xl font-bold mb-4">Stay Informed & Protected</h2>
        <p className="text-gray-400 mb-8">
          Join our community to access vital legal resources and stay updated.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}

export default function LegalPage() {
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
        {isAuthenticated ? <AuthenticatedLegalPage /> : <UnauthenticatedLegalPage />}
      </main>
    </div>
  );
}