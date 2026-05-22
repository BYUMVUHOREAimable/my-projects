import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, ArrowLeft, AlertCircle, RefreshCw, Lock } from 'lucide-react'
import { verify2FA } from '../service/authApi'
import { useSession } from '../context/SessionContext'
import toast from 'react-hot-toast'

function Verify2FA() {
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const { setUser } = useSession()

  useEffect(() => {
    const storedUsername = localStorage.getItem('mfaUsername')
    if (!storedUsername) {
      navigate('/login')
      return
    }
    setUsername(storedUsername)
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!verificationCode || verificationCode.length !== 6) {
      const message = 'Please enter a valid 6-digit code'
      setError(message)
      toast.error(message)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await verify2FA(verificationCode)
      
      localStorage.removeItem('mfaUsername')
      
      setUser(response.data.user)
      
      toast.success('Verification successful!')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const message = err.response?.data?.error || 'Invalid verification code'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    localStorage.removeItem('mfaUsername')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Two-Factor Authentication
            </h1>
            <p className="text-gray-400 mt-2">
              Hi {username}, please enter your authentication code
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Authentication Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-center text-2xl font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                autoFocus
                disabled={loading}
              />
              <p className="text-gray-500 text-sm mt-2 text-center">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="inline-flex items-center text-gray-400 hover:text-white text-sm transition"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-500/20 rounded-xl">
            <h3 className="font-semibold text-blue-300 mb-2 flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              Security Notice
            </h3>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• Each code expires after 30 seconds</li>
              <li>• Your authenticator app generates new codes automatically</li>
              <li>• Never share your authentication codes with anyone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify2FA
