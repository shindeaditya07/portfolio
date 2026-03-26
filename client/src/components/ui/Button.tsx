import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  target?: string
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  className = '',
  target,
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }

  const variantClasses = {
    primary:
      'bg-purple-600 hover:bg-purple-500 text-white shadow-glow hover:shadow-glow-lg border border-purple-500/30',
    secondary:
      'bg-transparent border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400',
    ghost: 'bg-transparent text-slate-300 hover:text-purple-300 hover:bg-white/5',
  }

  const classes = `
    inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200
    ${sizeClasses[size]} ${variantClasses[variant]} ${className}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `

  const inner = (
    <motion.div whileHover={{ scale: disabled ? 1 : 1.02 }} whileTap={{ scale: disabled ? 1 : 0.97 }} className={classes}>
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="contents">
      {inner}
    </button>
  )
}

export default Button
