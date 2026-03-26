import { motion } from 'framer-motion'
import { PERSONAL_INFO } from '../../utils/constants'

const HeroAvatar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative flex items-center justify-center"
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-purple-500/20 to-transparent animate-glow-pulse" />

      {/* Avatar card */}
      <div className="relative w-52 h-52 md:w-64 md:h-64">
        {/* Glassmorphism card */}
        <div className="w-full h-full rounded-full glass border-2 border-purple-500/30 shadow-glow-lg overflow-hidden animate-float flex items-center justify-center">
          {/* Profile photo */}
          <img
            src="/assets/avatar/avatar.jpeg"
            alt={PERSONAL_INFO.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-1.5 glass border border-purple-500/30 rounded-full text-xs font-medium text-slate-300 shadow-card"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to opportunities
        </motion.div>

        {/* Floating tech bubbles */}
        <motion.div
          className="absolute -top-3 -right-3 w-11 h-11 glass border border-purple-500/30 rounded-xl flex items-center justify-center text-lg shadow-glow-sm"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          ⚛️
        </motion.div>
        <motion.div
          className="absolute -bottom-3 -left-3 w-11 h-11 glass border border-indigo-500/30 rounded-xl flex items-center justify-center text-lg shadow-glow-sm"
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🤖
        </motion.div>
        <motion.div
          className="absolute top-1/2 -right-10 w-10 h-10 glass border border-violet-500/30 rounded-xl flex items-center justify-center text-base"
          animate={{ y: [-2, 6, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          🐍
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HeroAvatar
