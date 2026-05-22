import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, ArrowLeft, CheckCircle, AlertCircle, Copy, Key } from 'lucide-react'
import { setup2FA, verify2FA, reset2FA } from '../service/authApi'
import { useSession } from '../context/SessionContext'
import toast from 'react-hot-toast'

function Setup2FA() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const navigate = useNavigate()
  const { user, setUser } = useSession()

  useEffect(() => {
    if (user?.isMfaActive) {
      handleReset()
    } else {
      handleSetup()
    }
  }, [])

  const handleSetup = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await setup2FA()
      setQrCode(response.data.qrCode)
      setSecret(response.data.secret)
      setStep(2)
      toast.success('2FA setup initiated')
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to setup 2FA'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setLoading(true)
    setError('')

    try {
      await reset2FA()
      toast.success('2FA reset. Setting up new 2FA...')
      await handleSetup()
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to reset 2FA'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!verificationCode) {
      const message = 'Please enter the verification code'
      setError(message)
      toast.error(message)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await verify2FA(verificationCode)
      
      setUser({
        ...user,
        isMfaActive: true
      })

      setStep(3)
      toast.success('2FA enabled successfully!')
    } catch (err) {
      const message = err.response?.data?.error || 'Invalid verification code'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const copySecret = () => {
    navigator.clipboard.writeText(secret)
    toast.success('Secret copied to clipboard!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {user?.isMfaActive ? 'Reset 2FA' : 'Setup 2FA'}
            </h1>
            <p className="text-gray-400 mt-2">
              {user?.isMfaActive 
                ? 'Reset your two-factor authentication'
                : 'Enhance your account security with two-factor authentication'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {step === 1 && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Preparing 2FA setup...</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  Step 1: Scan QR Code
                </h3>
                <p className="text-gray-400 text-sm">
                  Use your authenticator app to scan this QR code
                </p>
              </div>

              {qrCode && (
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-xl">
                    <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Step 2: Manual Entry
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  Can't scan? Enter this code manually:
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={secret}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm"
                  />
                  <button
                    onClick={copySecret}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Step 3: Verify Setup
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  Enter the 6-digit code from your authenticator app:
                </p>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-center text-xl font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={loading || verificationCode.length !== 6}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Enable 2FA'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center h-20 w-20 bg-green-500/20 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">2FA Enabled!</h2>
              <p className="text-gray-400 mb-6">
                Your account is now protected with two-factor authentication.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-500/20 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">📱 Recommended Apps:</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• Google Authenticator (iOS/Android)</li>
              <li>• Microsoft Authenticator (iOS/Android)</li>
              <li>• Authy (iOS/Android/Desktop)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setup2FA
