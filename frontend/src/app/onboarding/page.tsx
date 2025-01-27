"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    title: "Dashboard",
    description: `
      The Dashboard is your personal hub. Here, you can update your profile, adjust preferences, 
      and keep track of your most-used resources, job applications, and scholarship submissions.
    `,
    icon: "📊",
  },
  {
    title: "Job Opportunities Hub",
    description: `
      Find opportunities tailored to your career goals. 
      The Job Opportunities Hub includes tabs for full-time jobs, internships, fellowships, and research positions. 
      Each tab links directly to undocu-friendly job postings and opportunities.
    `,
    icon: "💼",
  },
  {
    title: "Legal Hub",
    description: `
      Stay informed with real-time updates on legal news, ICE sightings, and resources to help you know your rights. 
      The Legal Hub is designed to empower and protect undocumented individuals.
    `,
    icon: "⚖️",
  },
  {
    title: "Financial Aid Hub",
    description: `
      Access scholarships, grants, and financial aid programs specifically designed for undocumented students. 
      Discover opportunities to fund your education without additional stress.
    `,
    icon: "🎓",
  },
  {
    title: "Networking Hub",
    description: `
      Connect with peers, mentors, and industry professionals who understand your journey. 
      Whether you're seeking career advice or a support system, the Networking Hub is your bridge to success.
    `,
    icon: "🤝",
  },
  {
    title: "Social Media Hub",
    description: `
      Follow undocu-friendly creators and organizations to stay updated on opportunities, events, and resources. 
      The Social Media Hub curates the best pages and profiles to support your journey.
    `,
    icon: "📱",
  },
  {
    title: "Future Features",
    description: `
      Exciting updates are coming! Here's what you can look forward to:
      - AI Legal Consultant: Personalized legal guidance for undocumented individuals.
      - AI Job and Scholarship Suggestions: Tailored recommendations based on your preferences.
      - Higher Education Resources Hub: Tools and guides to help you succeed in academia and beyond.
    `,
    icon: "🚀",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => (prev < features.length ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : prev));
  const progressPercentage = ((step + 1) / (features.length + 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      <header className="py-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-400">UndocuLink</h1>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors"
          >
            Skip
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <motion.div
          className="max-w-3xl px-6 py-12 bg-gray-800/50 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {step === 0 && (
            <div>
              <h1 className="text-3xl font-bold text-blue-400 mb-6">
                Account Created Successfully!
              </h1>
              <p className="text-gray-300 font-bold mb-8">
                Welcome to UndocuLink! Let’s walk you through our features to complete your onboarding and make the most out of our platform.
              </p>
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors font-bold"
              >
                Start Onboarding
              </button>
            </div>
          )}

          {step > 0 && step <= features.length && (
            <div>
              <motion.div
                key={features[step - 1].title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-4">{features[step - 1].icon}</div>
                  <h1 className="text-3xl font-bold text-blue-400 mb-6">
                    {features[step - 1].title}
                  </h1>
                  <p className="text-gray-300 font-bold text-center mb-8">
                    {features[step - 1].description.split("\n").map((line, index) => (
                      <span key={index} className="block">
                        {line.trim()}
                      </span>
                    ))}
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {step === features.length + 1 && (
            <div>
              <h1 className="text-3xl font-bold text-blue-400 mb-6">
                You're All Set!
              </h1>
              <p className="text-gray-300 font-bold mb-8">
                You've completed the onboarding. Start exploring all that UndocuLink has to offer!
              </p>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors font-bold"
              >
                Go to Dashboard
              </Link>
            </div>
          )}

          {step > 0 && (
            <>
              <div className="w-full mt-6">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-md transition-colors font-bold ${
                    step === 0 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  Back
                </button>
                {step < features.length ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors font-bold"
                  >
                    Next
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors font-bold"
                  >
                    Finish
                  </Link>
                )}
              </div>
            </>
          )}
        </motion.div>
      </main>

      <footer className="py-6 text-center text-gray-400">
        <p>© 2025 UndocuLink. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
