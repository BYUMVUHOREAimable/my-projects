import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Lock, Key, Users, ArrowRight, CheckCircle, Star } from 'lucide-react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold text-white">SecureAuth</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-gray-300 hover:text-white transition">Sign In</Link>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm mb-6">
              <Star className="h-4 w-4 mr-2" />
              Enterprise-Grade Security
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Protect Your Account with
              <span className="text-blue-400"> Multi-Factor Authentication</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Secure your digital identity with our advanced 2FA system. 
              Add an extra layer of protection to keep your account safe from unauthorized access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition group"
              >
                Start Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition border border-white/20"
              >
                View Demo
              </Link>
            </div>
          </div>
          
          {/* Security Card Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-center mb-8">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <Shield className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Two-Factor Authentication</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>QR Code Setup</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>TOTP Token Verification</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Session Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-800/30 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SecureAuth?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We provide enterprise-grade security with a simple, intuitive interface
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition group">
              <div className="h-14 w-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition">
                <Lock className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Bank-Level Security</h3>
              <p className="text-gray-400">
                Industry-standard TOTP encryption ensures your authentication tokens are secure and reliable.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition group">
              <div className="h-14 w-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition">
                <Key className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Easy Setup</h3>
              <p className="text-gray-400">
                Scan a QR code with your favorite authenticator app and you're protected in seconds.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-green-500/50 transition group">
              <div className="h-14 w-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition">
                <Users className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Universal Compatibility</h3>
              <p className="text-gray-400">
                Works with Google Authenticator, Microsoft Authenticator, Authy, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Account?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users who have already enhanced their account security.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold text-white">SecureAuth</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 SecureAuth. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
