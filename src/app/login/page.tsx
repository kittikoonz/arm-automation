'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    pin: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', formData);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Top Decorative Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600" />
        
        {/* Sunflower Icon */}
        <div className="absolute top-2 right-2">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-45">
            <div className="w-12 h-12 bg-yellow-300 rounded-full" />
          </div>
        </div>

        <div className="relative">
          <h2 className="text-4xl font-bold text-green-800 text-center mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-center mb-8">Login to your farm account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="form-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="form-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">PIN</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  maxLength={4}
                  className="form-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  value={formData.pin}
                  onChange={(e) => setFormData({...formData, pin: e.target.value})}
                  placeholder="Enter your 4-digit PIN"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Decorative Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-green-400" />
      </div>
    </div>
  );
} 