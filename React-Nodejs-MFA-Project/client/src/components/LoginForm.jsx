import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, login, verify2FA, authStatus } from "../service/authApi";
import toast from "react-hot-toast";
import { useSession } from "../context/SessionContext";

function LoginForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMfa, setShowMfa] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useSession();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(formData.username, formData.password);
      
      if (response.data.requiresMfa) {
        setUsername(response.data.username);
        setShowMfa(true);
        toast.success('Enter your 2FA code');
      } else {
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      const message = err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleMfaVerify = async (e) => {
    e.preventDefault();
    
    if (!mfaCode || mfaCode.length !== 6) {
      const message = "Please enter a valid 6-digit code";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await verify2FA(mfaCode);
      
      // Update session context with user data from response
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        // Fallback: fetch auth status to update session
        const statusResponse = await authStatus();
        setUser(statusResponse.data);
        setIsAuthenticated(true);
      }
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || "Invalid verification code";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowMfa(false);
    setMfaCode("");
    setUsername("");
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      const message = "Passwords do not match";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register(formData.username, formData.password);
      toast.success("Registration successful! Please login.");
      setIsRegister(false);
      setFormData({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      const message = err.response?.data?.error || "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">SecureAuth</h1>
          <p className="text-gray-400 mt-2">Multi-Factor Authentication Portal</p>
        </div>

        {showMfa ? (
          <form
            onSubmit={handleMfaVerify}
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white text-center">
                Two-Factor Authentication
              </h2>
              <p className="text-gray-400 text-center mt-2">
                Hi {username}, enter your authentication code
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-300 text-sm mb-2">Authentication Code</label>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                autoFocus
              />
              <p className="text-gray-500 text-sm mt-2 text-center">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || mfaCode.length !== 6}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold mt-6 hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-gray-400 hover:text-white text-sm transition"
              >
                ← Back to Login
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-200 text-center">
                Each code expires after 30 seconds. Your authenticator app generates new codes automatically.
              </p>
            </div>
          </form>
        ) : (
          <form
            onSubmit={isRegister ? handleRegister : handleLogin}
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white text-center">
                {isRegister ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-400 text-center mt-2">
                {isRegister ? "Create your account to get started" : "Sign in to access your dashboard"}
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {isRegister && (
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold mt-6 hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : (isRegister ? "Create Account" : "Sign In")}
            </button>

            <p className="text-center text-gray-400 mt-6">
              {isRegister ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                {isRegister ? "Sign In" : "Create Account"}
              </button>
            </p>

            <div className="mt-6 pt-6 border-t border-white/10">
              <Link
                to="/"
                className="block text-center text-gray-400 hover:text-white transition"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          © 2026 SecureAuth. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
