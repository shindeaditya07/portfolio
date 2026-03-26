import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authAPI } from '../../utils/api'
import Button from '../../components/ui/Button'
import GlowCard from '../../components/ui/GlowCard'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
    }
  }, [token, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await authAPI.resetPassword(token as string, newPassword)
      setMessage(res.data.message)
      setTimeout(() => navigate('/admin/login'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Password reset failed. Token may be expired.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="glow-orb w-[400px] h-[400px] bg-teal-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="z-10 w-full max-w-md px-4">
        <GlowCard className="p-8 border-teal-500/20">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-2xl text-slate-100">Set New Password</h1>
            <p className="text-slate-400 mt-2 text-sm">Enter your new admin password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="At least 6 characters"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="Re-enter password"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {message && <p className="text-teal-400 text-sm">{message}</p>}

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-3 !bg-teal-600 hover:!bg-teal-500 shadow-glow-sm shadow-teal-500/30"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </GlowCard>
      </div>
    </div>
  )
}

export default ResetPassword
