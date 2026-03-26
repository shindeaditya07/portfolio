import { motion } from 'framer-motion'
import AnimatedText from '../ui/AnimatedText'
import { PERSONAL_INFO, HOME_CONFIG } from '../../utils/constants'

const HeroHeadline = () => (
  <div>
    {/* Greeting */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3"
    >
      {HOME_CONFIG.heroBadge}
    </motion.p>

    {/* Name */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight"
    >
      <span className="gradient-text">{PERSONAL_INFO.name}</span>
    </motion.h1>

    {/* Typewriter role */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2 }}
      className="text-slate-300 text-xl md:text-2xl font-medium mb-2 h-8"
    >
      <AnimatedText
        texts={PERSONAL_INFO.taglines}
        className="text-slate-300"
        speed={70}
        deletingSpeed={45}
        delayBetween={2500}
      />
    </motion.div>
  </div>
)

export default HeroHeadline
