import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import useScrollAnimation from '../../hooks/useScrollAnimation'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  children?: ReactNode
  align?: 'left' | 'center'
}

const SectionHeading = ({ title, subtitle, align = 'center' }: SectionHeadingProps) => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-display text-3xl md:text-4xl font-bold gradient-text mb-3"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-lg max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  )
}

export default SectionHeading
