"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function AuthenticatedScholarshipsPage() {
  const [activeTab, setActiveTab] = useState("undergraduate");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Scholarships</h1>

      {/* Airtable Embed Section */}
      <div className="mb-10 bg-gray-800/50 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Live Scholarship Listings</h2>
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
          onClick={() => router.push("/signup")}
          className="inline-block px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Find Scholarships
        </button>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: "Undergraduate Scholarships",
            description: "Find scholarships for high school seniors and current undergraduate students.",
            items: ["✓ Full tuition awards", "✓ Merit-based scholarships", "✓ Need-based grants"],
            delay: 0.2,
          },
          {
            title: "Graduate Fellowships",
            description: "Explore opportunities for graduate and professional degree programs.",
            items: ["✓ Research fellowships", "✓ Professional development", "✓ Leadership programs"],
            delay: 0.3,
          },
          {
            title: "Application Support",
            description: "Get help with your scholarship applications and essays.",
            items: ["✓ Essay writing tips", "✓ Application checklists", "✓ Document preparation"],
            delay: 0.4,
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: feature.delay }}
            viewport={{ once: true }}
            className="p-6 bg-gray-800/50 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-400 mb-4">{feature.description}</p>
            <ul className="text-gray-400 space-y-2">
              {feature.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
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
          onClick={() => router.push("/signup")}
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
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("username");
          router.push("/login");
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
