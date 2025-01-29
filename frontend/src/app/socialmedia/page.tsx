"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Sample social media links
const undoculinkSocials = [
  {
    platform: "Instagram",
    handle: "@undoculink",
    url: "https://instagram.com/undoculink",
    followers: "10K+",
    icon: "/instagram.svg"
  },
  {
    platform: "TikTok",
    handle: "@undoculink",
    url: "https://tiktok.com/@undoculink",
    followers: "15K+",
    icon: "/tiktok.svg"
  },
  {
    platform: "YouTube",
    handle: "UndocuLink",
    url: "https://youtube.com/undoculink",
    subscribers: "5K+",
    icon: "/youtube.svg"
  },
  {
    platform: "Twitter",
    handle: "@undoculink",
    url: "https://twitter.com/undoculink",
    followers: "8K+",
    icon: "/twitter.svg"
  }
];

// Sample creator/organization directory
const creatorDirectory = {
  creators: [
    {
      name: "Maria's Journey",
      platforms: {
        instagram: "@mariasjourney",
        tiktok: "@mariasjourney",
        youtube: "Maria's Journey"
      },
      focus: "Education & DACA Updates",
      description: "Daily updates on immigration policy and educational resources",
      verified: true
    },
    {
      name: "UndocuHustlers",
      platforms: {
        instagram: "@undocuhustlers",
        tiktok: "@undocuhustlers"
      },
      focus: "Entrepreneurship",
      description: "Business tips and success stories for undocumented entrepreneurs",
      verified: true
    }
  ],
  organizations: [
    {
      name: "ImmigrantRise",
      platforms: {
        instagram: "@immigrantrise",
        twitter: "@immigrantrise"
      },
      focus: "Legal Resources",
      description: "Legal updates and resources for the immigrant community",
      verified: true
    },
    {
      name: "DreamersUnited",
      platforms: {
        instagram: "@dreamersunited",
        tiktok: "@dreamersunited",
        twitter: "@dreamersunited"
      },
      focus: "Advocacy & Community",
      description: "Advocacy organization fighting for immigrant rights",
      verified: true
    }
  ]
};

function AuthenticatedSocialMediaPage() {
  const [activeTab, setActiveTab] = useState('latest');

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* UndocuLink Social Media Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {undoculinkSocials.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={social.icon}
                alt={social.platform}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <h3 className="text-xl font-semibold">{social.platform}</h3>
            </div>
            <p className="text-gray-400 mb-2">{social.handle}</p>
            <p className="text-blue-400">
              {social.followers || social.subscribers}
            </p>
          </a>
        ))}
      </div>

      {/* Latest YouTube Video */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Latest Video</h2>
        <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/your-video-id"
            title="UndocuLink Latest Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Creator Directory */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Creator Directory</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Featured Creators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creatorDirectory.creators.map((creator) => (
                <div key={creator.name} className="bg-gray-800/50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{creator.name}</h4>
                      <p className="text-blue-400">{creator.focus}</p>
                    </div>
                    {creator.verified && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{creator.description}</p>
                  <div className="flex gap-4">
                    {Object.entries(creator.platforms).map(([platform, handle]) => (
                      <span key={platform} className="text-gray-400">
                        {handle}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Featured Organizations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creatorDirectory.organizations.map((org) => (
                <div key={org.name} className="bg-gray-800/50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{org.name}</h4>
                      <p className="text-blue-400">{org.focus}</p>
                    </div>
                    {org.verified && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{org.description}</p>
                  <div className="flex gap-4">
                    {Object.entries(org.platforms).map(([platform, handle]) => (
                      <span key={platform} className="text-gray-400">
                        {handle}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Creator Form */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Know a Creator?</h3>
        <p className="text-gray-400 mb-4">
          Help us grow our directory by submitting undocu-friendly creators and organizations.
        </p>
        <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
          Submit Creator
        </button>
      </div>
    </div>
  );
}

function UnauthenticatedSocialMediaPage() {
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
          <span className="text-blue-400 block">Stay Connected</span>
          <span>With Our Community</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Follow us on social media for the latest updates, resources, and community stories.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Join Community
        </button>
      </motion.div>

      {/* Social Media Preview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {undoculinkSocials.map((social) => (
          <motion.a
            key={social.platform}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={social.icon}
                alt={social.platform}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <h3 className="text-xl font-semibold">{social.platform}</h3>
            </div>
            <p className="text-gray-400 mb-2">{social.handle}</p>
            <p className="text-blue-400">
              {social.followers || social.subscribers}
            </p>
          </motion.a>
        ))}
      </div>

      {/* Featured Content Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Latest Content</h2>
        <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/your-video-id"
            title="UndocuLink Latest Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center py-16 bg-gray-800/50 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-400 mb-8">
          Get access to our full creator directory and stay connected with the community.
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

export default function SocialMediaPage() {
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
        {isAuthenticated ? <AuthenticatedSocialMediaPage /> : <UnauthenticatedSocialMediaPage />}
      </main>
    </div>
  );
}