import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glowColor?: string
}

const GlowCard = ({ children, className = '', hover = true, glowColor }: GlowCardProps) => {
  const style = glowColor
    ? { '--glow-color': glowColor } as React.CSSProperties
    : {}

  return (
    <motion.div
      style={style}
      className={`glass ${hover ? 'glass-hover' : ''} ${className}`}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

export default GlowCard
