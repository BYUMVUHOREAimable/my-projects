import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, LogOut, User, Key } from 'lucide-react'
import { useSession } from '../context/SessionContext'

function HomePage() {
  const { user, logout } = useSession();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-gray-600">
              Status: {user?.isMfaActive ? '🛡️ 2FA Enabled' : '⚠️ 2FA Disabled'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Security</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-full ${user?.isMfaActive ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <Shield className={`h-5 w-5 ${user?.isMfaActive ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
              <h3 className="font-semibold text-gray-800">
                Two-Factor Authentication
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {user?.isMfaActive 
                ? 'Your account is protected with 2FA. You can disable it or reset it if needed.'
                : 'Enhance your account security by enabling two-factor authentication.'}
            </p>
            <div className="flex space-x-3">
              {!user?.isMfaActive ? (
                <Link
                  to="/setup-2fa"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition inline-flex items-center space-x-2"
                >
                  <Key className="h-4 w-4" />
                  <span>Enable 2FA</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/setup-2fa"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                  >
                    Reset 2FA
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Account Information</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Username:</span>
                <span className="font-medium">{user?.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">2FA Status:</span>
                <span className={`font-medium ${user?.isMfaActive ? 'text-green-600' : 'text-yellow-600'}`}>
                  {user?.isMfaActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Session:</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">🔒 Security Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Keep your 2FA backup codes in a safe place</li>
          <li>• Never share your authentication codes with anyone</li>
          <li>• Use a unique password for this account</li>
          <li>• Regularly check your account activity</li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage