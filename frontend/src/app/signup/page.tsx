"use client";

import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Interface for form validation errors
interface FormErrors {
  username?: string;
  pin?: string;
  confirmPin?: string;
}

// Interface for user credentials
interface UserCredentials {
  username: string;
  pin: string;
  confirmPin: string;
}

export default function SignUp() {
  const router = useRouter();
  
  // State management
  const [seedPhrase, setSeedPhrase] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: '',
    pin: '',
    confirmPin: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPin, setShowPin] = useState(false);

  // Username validation rules
  const validateUsername = (username: string): string | undefined => {
    if (username.length < 3) return "Username must be at least 3 characters";
    if (username.length > 20) return "Username must be less than 20 characters";
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) return "Username can only contain letters, numbers, underscores, and hyphens";
    return undefined;
  };

  // PIN validation rules
  const validatePin = (pin: string, confirmPin: string): FormErrors => {
    const errors: FormErrors = {};
    
    if (pin.length !== 4) {
      errors.pin = "PIN must be exactly 4 digits";
    }
    
    if (confirmPin && pin !== confirmPin) {
      errors.confirmPin = "PINs do not match";
    }
    
    return errors;
  };

  // Handle all input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // If it's a PIN field, only allow numbers and max 4 digits
    if (name === 'pin' || name === 'confirmPin') {
      const pinValue = value.replace(/\D/g, '').slice(0, 4);
      setCredentials(prev => ({ ...prev, [name]: pinValue }));
    } else {
      setCredentials(prev => ({ ...prev, [name]: value }));
    }
  };

  // Validate form on submit
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Username validation
    const usernameError = validateUsername(credentials.username);
    if (usernameError) newErrors.username = usernameError;

    // PIN validation
    const pinErrors = validatePin(credentials.pin, credentials.confirmPin);
    Object.assign(newErrors, pinErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle successful account creation
  const handleAccountCreation = () => {
    if (validateForm()) {
      // Here you would typically make an API call to create the account
      console.log('Account created successfully');
      router.push('/onboarding');
    }
  };

  // Generate new recovery phrase
  const generateNewWallet = () => {
    const mnemonic = generateMnemonic(128); // 12 words
    setSeedPhrase(mnemonic);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-32">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl p-8"
        >
          {/* Sign In Link */}
          <div className="text-center mb-8">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button 
                onClick={() => router.push('/login')}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Step 1: Initial Screen */}
          {step === 1 && (
            <>
              <h1 className="text-3xl font-bold text-blue-400 mb-6">Create Your Secure Account</h1>
              <p className="text-gray-400 mb-8">
                First, you'll receive a 12-word recovery phrase. Keep this safe - it's the only way to recover your account if you forget your PIN.
              </p>
              <button
                onClick={generateNewWallet}
                className="w-full px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
              >
                Generate Recovery Phrase
              </button>
            </>
          )}

          {/* Step 2: Recovery Phrase */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-blue-400 mb-6">Save Your Recovery Phrase</h2>
              <div className="bg-gray-900/50 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-3 gap-4">
                  {seedPhrase.split(' ').map((word, index) => (
                    <div key={index} className="bg-gray-800 p-2 rounded">
                      <span className="text-gray-500">{index + 1}.</span> {word}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-yellow-400 text-sm">
                  ⚠️ WARNING: Save these words somewhere secure. They're needed to recover your account.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    I've Saved My Phrase
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 border border-blue-400 rounded-md hover:bg-blue-400/10 text-blue-400 transition-colors"
                  >
                    Print
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Create Login Details */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-blue-400 mb-6">Create Your Login Details</h2>
              <div className="space-y-6">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-900 rounded-md focus:ring-2 focus:ring-blue-400 outline-none ${
                      errors.username ? 'border border-red-500' : ''
                    }`}
                    placeholder="Choose a username"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                {/* PIN Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    4-Digit PIN
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? "text" : "password"}
                      name="pin"
                      value={credentials.pin}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-gray-900 rounded-md focus:ring-2 focus:ring-blue-400 outline-none ${
                        errors.pin ? 'border border-red-500' : ''
                      }`}
                      placeholder="Enter 4-digit PIN"
                      maxLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPin ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.pin && (
                    <p className="text-red-500 text-sm mt-1">{errors.pin}</p>
                  )}
                </div>

                {/* Confirm PIN Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Confirm PIN
                  </label>
                  <input
                    type={showPin ? "text" : "password"}
                    name="confirmPin"
                    value={credentials.confirmPin}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-900 rounded-md focus:ring-2 focus:ring-blue-400 outline-none ${
                      errors.confirmPin ? 'border border-red-500' : ''
                    }`}
                    placeholder="Confirm 4-digit PIN"
                    maxLength={4}
                  />
                  {errors.confirmPin && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPin}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleAccountCreation}
                  className="w-full px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}