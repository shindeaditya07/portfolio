import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  texts: string[]
  className?: string
  speed?: number
  deletingSpeed?: number
  delayBetween?: number
}

const AnimatedText = ({
  texts,
  className = '',
  speed = 80,
  deletingSpeed = 50,
  delayBetween = 2000,
}: AnimatedTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const currentText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, delayBetween)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deletingSpeed : speed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, isPaused, textIndex, texts, speed, deletingSpeed, delayBetween])

  return (
    <span className={`cursor-blink ${className}`}>
      {displayText}
    </span>
  )
}

export default AnimatedText
