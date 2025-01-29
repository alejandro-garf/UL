"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Sample user profile data
interface UserProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  major: string;
  location: string;
  bio: string;
  education: string;
  skills: string[];
  connections: number;
  groups: string[];
}

// Sample networking events
const sampleEvents = [
  {
    id: 1,
    title: "Tech Networking Mixer",
    date: "February 15, 2025",
    time: "6:00 PM PST",
    location: "Virtual",
    description: "Connect with professionals in the tech industry",
    attendees: 45
  },
  {
    id: 2,
    title: "Healthcare Professionals Meetup",
    date: "March 1, 2025",
    time: "5:30 PM PST",
    location: "Los Angeles, CA",
    description: "Network with healthcare professionals and students",
    attendees: 30
  }
];

// Sample groups
const sampleGroups = [
  {
    id: 1,
    name: "Tech Professionals Network",
    members: 1200,
    description: "A community for tech professionals to connect and share opportunities"
  },
  {
    id: 2,
    name: "Healthcare Alliance",
    members: 800,
    description: "Supporting healthcare workers and students in their career journey"
  }
];

function AuthenticatedNetworkingPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'profile' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'connections' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Connections
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'groups' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Groups
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'events' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => setActiveTab('messaging')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'messaging' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700/50 hover:bg-gray-700'
          }`}
        >
          Secure Messaging
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {!isEditing ? (
            <div className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                  <p className="text-blue-400">Software Engineer at Tech Corp</p>
                  <p className="text-gray-400">Computer Science Major</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-400">
                  Passionate software engineer with experience in web development and AI.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "React", "Node.js", "Python"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Education</h3>
                <p className="text-gray-400">BS in Computer Science - University of California</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-lg p-6">
              {/* Add profile editing form here */}
            </div>
          )}
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sample connections */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <p className="text-gray-400">Product Designer</p>
              </div>
              <button className="px-3 py-1 border border-blue-400 rounded-md text-blue-400 hover:bg-blue-400/10">
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="space-y-6">
          {sampleGroups.map(group => (
            <div key={group.id} className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{group.name}</h3>
                  <p className="text-gray-400">{group.members} members</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                  Join Group
                </button>
              </div>
              <p className="text-gray-300">{group.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6">
          {sampleEvents.map(event => (
            <div key={event.id} className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-gray-400">{event.date} at {event.time}</p>
                  <p className="text-gray-400">{event.location}</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                  RSVP
                </button>
              </div>
              <p className="text-gray-300 mb-2">{event.description}</p>
              <p className="text-gray-400">{event.attendees} attending</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'messaging' && (
        <div className="space-y-6">
          {/* Discord Section */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">Join Our Discord Community</h3>
                <p className="text-gray-400">Connect with other members in real-time</p>
              </div>
              <button 
                onClick={() => window.open('your-discord-invite-link', '_blank')}
                className="px-4 py-2 bg-[#5865F2] rounded-md hover:bg-[#4752C4] transition-colors"
              >
                Join Discord
              </button>
            </div>
          </div>

          {/* Secure Messaging App Section */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">Download Our Secure Messaging App</h3>
                <p className="text-gray-400 mb-4">End-to-end encrypted messaging for secure communication</p>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li>✓ End-to-end encryption</li>
                  <li>✓ Self-destructing messages</li>
                  <li>✓ No data storage</li>
                  <li>✓ Anonymous profiles</li>
                </ul>
              </div>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                  iOS Download
                </button>
                <button className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                  Android Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UnauthenticatedNetworkingPage() {
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
          <span className="text-blue-400 block">Connect with Your</span>
          <span>Community</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Build your professional network, join industry groups, and connect with peers in a secure environment.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Join Network
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
          <h3 className="text-xl font-semibold mb-4">Professional Profile</h3>
          <p className="text-gray-400 mb-4">
            Create your professional profile and connect with others in your field.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Customizable profile</li>
            <li>✓ Skill highlighting</li>
            <li>✓ Professional networking</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Industry Groups</h3>
          <p className="text-gray-400 mb-4">
            Join professional groups in your industry and connect with peers.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Industry-specific groups</li>
            <li>✓ Resource sharing</li>
            <li>✓ Career discussions</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-800/50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Secure Communication</h3>
          <p className="text-gray-400 mb-4">
            Connect safely with end-to-end encrypted messaging and secure channels.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Encrypted messaging</li>
            <li>✓ Discord community</li>
            <li>✓ Private networking</li>
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
        <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
        <p className="text-gray-400 mb-8">
          Connect with peers, find mentors, and grow your professional network.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Free Account
        </button>
      </motion.div>

      {/* Discord Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-[#5865F2]/10 rounded-lg border border-[#5865F2]/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Join Our Discord Community</h2>
            <p className="text-gray-400 mb-6">
              Connect with other members, participate in discussions, and stay updated with the latest opportunities.
            </p>
            <button 
              onClick={() => window.open('your-discord-invite-link', '_blank')}
              className="px-6 py-3 bg-[#5865F2] rounded-md hover:bg-[#4752C4] transition-colors"
            >
              Join Discord Server
            </button>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-gray-400">Preview of Discord channels:</p>
            <ul className="space-y-2 mt-2">
              <li className="text-[#5865F2]"># general-chat</li>
              <li className="text-[#5865F2]"># job-opportunities</li>
              <li className="text-[#5865F2]"># resources</li>
              <li className="text-[#5865F2]"># events</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function NetworkingPage() {
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
        {isAuthenticated ? <AuthenticatedNetworkingPage /> : <UnauthenticatedNetworkingPage />}
      </main>
    </div>
  );
}