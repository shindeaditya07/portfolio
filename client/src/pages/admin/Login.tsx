import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../utils/api'
import Button from '../../components/ui/Button'
import GlowCard from '../../components/ui/GlowCard'

const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isForgotMode, setIsForgotMode] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await authAPI.login(password)
      if (res.data.token) {
        localStorage.setItem('admin_token', res.data.token)
        navigate('/admin/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await authAPI.forgotPassword(email)
      setMessage(res.data.message)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset email')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="glow-orb w-[400px] h-[400px] bg-purple-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="z-10 w-full max-w-md px-4">
        <GlowCard className="p-8">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-2xl text-slate-100">
              {isForgotMode ? 'Reset Password' : 'Admin Login'}
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              {isForgotMode ? 'Enter your admin email to receive a reset link' : 'Secure access to portfolio data'}
            </p>
          </div>

          {!isForgotMode ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Login'}
              </Button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsForgotMode(true)}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgot} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="admin@example.com"
                  required
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              {message && <p className="text-teal-400 text-sm">{message}</p>}

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsForgotMode(false)}
                  className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </GlowCard>
      </div>
    </div>
  )
}

export default Login
