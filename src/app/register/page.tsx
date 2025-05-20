'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    discordUsername: '',
    password: '',
    confirmPassword: '',
    pin: '',
    key: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      // Send registration data to your API
      const response = await axios.post('/api/auth/register', formData);
      
      // Send webhook notification with only the key
      await axios.post('/api/webhook/register', {
        key: formData.key,
        username: formData.username
      });

      toast.success('Registration successful!');
      router.push('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
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
          <h2 className="text-4xl font-bold text-green-800 text-center mb-2">Create Account</h2>
          <p className="text-gray-600 text-center mb-8">Join our farming community</p>

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
                  placeholder="Enter Username"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gmail</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  className="form-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter Gmail"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discord Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="form-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  value={formData.discordUsername}
                  onChange={(e) => setFormData({...formData, discordUsername: e.target.value})}
                  placeholder="Enter Discord Username"
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
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Re-enter Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="form-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="Re-enter Password"
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
                  placeholder="Enter PIN"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Key</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="form-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  value={formData.key}
                  onChange={(e) => setFormData({...formData, key: e.target.value})}
                  placeholder="Enter key"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Register
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                Login here
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