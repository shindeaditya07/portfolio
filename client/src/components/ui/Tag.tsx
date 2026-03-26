interface TagProps {
  text: string
  active?: boolean
  onClick?: () => void
  size?: 'sm' | 'md'
}

const Tag = ({ text, active = false, onClick, size = 'sm' }: TagProps) => {
  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-4 py-1.5'
  return (
    <span
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      className={`
        inline-flex items-center rounded-full font-medium border transition-all duration-200 select-none
        ${sizeClass}
        ${
          active
            ? 'bg-purple-500/20 border-purple-500/60 text-purple-300'
            : 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/40'
        }
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {text}
    </span>
  )
}

export default Tag
