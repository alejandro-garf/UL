"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function AuthenticatedScholarshipsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Scholarships</h1>
      <div className="mb-10 bg-gray-800/50 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Live Scholarship Listings</h2>
        <a href="https://immigrantsrising.org/resource/list-of-scholarships-and-fellowships/" target="_blank" rel="noopener noreferrer">
          <h3 className="text-1.5xl font-bold mb-4 text-blue-500 hover:text-blue-400 transition duration-300 ease-in-out"
              style={{ textShadow: "0 0 10px rgba(0, 0, 255, 0.8), 0 0 20px rgba(0, 0, 255, 0.6)" }}>
              From Immigrants Rising
          </h3>
        </a>
        <iframe
          src="https://airtable.com/embed/appNgk0gw9a6VJVMM/shrMq8wbNCW47j9cY/tblKfgGXrIEkpwPUM?layout=card&viewControls=on"
          width="100%"
          height="600px"
          style={{ border: "none" }}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default function ScholarshipsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const storedUsername = localStorage.getItem("username");
      if (token) {
        try {
          setIsAuthenticated(true);
          setUsername(storedUsername || "");
        } catch (error) {
          localStorage.removeItem("accessToken");
          router.push("/login");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white text-center">
      <header className="fixed top-0 w-full z-50 bg-gray-900/50 backdrop-blur-lg flex justify-center">
        <nav className="w-full max-w-7xl mx-auto px-10 h-22 flex items-center justify-between">
          <Link href="/">
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
          <div className="hidden md:flex items-center gap-4">
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
      <main className="pt-32 md:pt-40 pb-20 max-w-7xl mx-auto px-6">
        {isAuthenticated ? <AuthenticatedScholarshipsPage /> : <p className='text-center text-gray-400'>Please log in to view scholarships.</p>}
      </main>
    </div>
  );
}
