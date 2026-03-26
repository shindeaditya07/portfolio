import { motion } from 'framer-motion'
import { ORBIT_ITEMS, ORBIT_RADII } from '../../utils/constants'

const OrbitAnimation = () => {
  return (
    <div className="relative w-[440px] h-[440px] flex items-center justify-center mx-auto">
      {/* Center glow */}
      <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/40 to-indigo-500/40 blur-xl animate-glow-pulse" />

      {/* Center brain/code icon */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-20 h-20 glass border border-purple-500/40 rounded-2xl flex items-center justify-center text-4xl shadow-glow"
      >
        💜
      </motion.div>

      {/* Orbit rings */}
      {([1, 2, 3] as const).map((ring) => (
        <div
          key={ring}
          className="absolute rounded-full border border-purple-500/10"
          style={{ width: ORBIT_RADII[ring] * 2, height: ORBIT_RADII[ring] * 2 }}
        />
      ))}

      {/* Orbiting icons */}
      {ORBIT_ITEMS.map((item, i) => {
        const radius = ORBIT_RADII[item.orbit]
        const startAngle = (item.offset || 0) * (Math.PI / 180)

        return (
          <motion.div
            key={i}
            className="absolute w-10 h-10"
            style={{
              top: '50%',
              left: '50%',
              marginTop: -20,
              marginLeft: -20,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: 0,
            }}
          >
            <motion.div
              style={{
                x: radius * Math.cos(startAngle),
                y: radius * Math.sin(startAngle),
              }}
              animate={{
                x: [
                  radius * Math.cos(startAngle),
                  radius * Math.cos(startAngle + Math.PI / 2),
                  radius * Math.cos(startAngle + Math.PI),
                  radius * Math.cos(startAngle + (3 * Math.PI) / 2),
                  radius * Math.cos(startAngle + 2 * Math.PI),
                ],
                y: [
                  radius * Math.sin(startAngle),
                  radius * Math.sin(startAngle + Math.PI / 2),
                  radius * Math.sin(startAngle + Math.PI),
                  radius * Math.sin(startAngle + (3 * Math.PI) / 2),
                  radius * Math.sin(startAngle + 2 * Math.PI),
                ],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
              title={item.label}
              className="w-10 h-10 glass border border-purple-500/20 rounded-xl flex items-center justify-center text-lg shadow-glow-sm hover:border-purple-500/50 cursor-default transition-all"
            >
              {item.icon}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default OrbitAnimation
