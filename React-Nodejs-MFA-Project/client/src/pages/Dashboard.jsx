import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Shield, LogOut, User, Key, Lock, Clock, 
  Activity, Bell, Settings, ChevronRight, 
  CheckCircle, AlertTriangle, RefreshCw
} from 'lucide-react'
import { useSession } from '../context/SessionContext'
import toast from 'react-hot-toast'

function Dashboard() {
  const { user, logout } = useSession()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">SecureAuth</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <Settings className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-blue-100">
                {formatDate(currentTime)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-1">{formatTime(currentTime)}</div>
              <div className="text-blue-100 flex items-center justify-end space-x-2">
                <Activity className="h-4 w-4" />
                <span>System Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${user?.isMfaActive ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <Shield className={`h-6 w-6 ${user?.isMfaActive ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
              <span className="text-xs text-gray-500">Status</span>
            </div>
            <div className={`text-2xl font-bold ${user?.isMfaActive ? 'text-green-600' : 'text-yellow-600'}`}>
              {user?.isMfaActive ? 'Protected' : 'At Risk'}
            </div>
            <p className="text-sm text-gray-500 mt-1">2FA Status</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">Session</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">Active</div>
            <p className="text-sm text-gray-500 mt-1">Current Session</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs text-gray-500">Account</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">Verified</div>
            <p className="text-sm text-gray-500 mt-1">Account Status</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100">
                <Key className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-xs text-gray-500">Security</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {user?.isMfaActive ? 'Strong' : 'Medium'}
            </div>
            <p className="text-sm text-gray-500 mt-1">Security Level</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Security Settings
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${user?.isMfaActive ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      {user?.isMfaActive ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">
                        {user?.isMfaActive 
                          ? 'Your account is protected with 2FA' 
                          : 'Add an extra layer of security to your account'}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/setup-2fa"
                    className={`px-4 py-2 rounded-lg font-medium transition flex items-center ${
                      user?.isMfaActive 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {user?.isMfaActive ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Enable
                      </>
                    )}
                  </Link>
                </div>

                {!user?.isMfaActive && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="h-4 w-4 inline mr-2" />
                      Your account is not protected with two-factor authentication. 
                      Enable it now to keep your account secure.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-4">
                <Link
                  to="/setup-2fa"
                  className="flex items-center p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                >
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Setup 2FA</h3>
                    <p className="text-sm text-gray-500">Configure authenticator</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center p-4 border rounded-lg hover:border-red-500 hover:bg-red-50 transition group w-full text-left"
                >
                  <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition">
                    <LogOut className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Logout</h3>
                    <p className="text-sm text-gray-500">Sign out of your account</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Account Info</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-20 w-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Username</span>
                    <span className="font-medium text-gray-800">{user?.username}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">2FA Status</span>
                    <span className={`font-medium ${user?.isMfaActive ? 'text-green-600' : 'text-yellow-600'}`}>
                      {user?.isMfaActive ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Session</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Tips
              </h3>
              <ul className="space-y-3 text-sm text-blue-100">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Never share your authentication codes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Keep backup codes in a safe place</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Use a unique password for your account</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Enable 2FA for added protection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
