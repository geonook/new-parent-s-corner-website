'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  strength?: number // 磁吸強度 1-10
}

export default function MagneticButton({ 
  href, 
  children, 
  variant = 'primary', 
  className = '',
  strength = 5 
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    const magnetRange = 100 * (strength / 10) // 磁吸範圍
    const maxDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    
    if (maxDistance < magnetRange) {
      const magnetStrength = (magnetRange - maxDistance) / magnetRange
      const moveX = (distanceX * magnetStrength * strength) / 10
      const moveY = (distanceY * magnetStrength * strength) / 10
      
      x.set(moveX * 0.1)
      y.set(moveY * 0.1)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
    
    // 觸覺回饋
    if ('vibrate' in navigator && isHovered) {
      navigator.vibrate(20)
    }
  }

  const handleClick = () => {
    // 點擊觸覺回饋
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 100, 30])
    }
  }

  const baseClasses = variant === 'primary' 
    ? "relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold text-lg shadow-lg transition-all duration-300"
    : "relative inline-flex items-center px-8 py-4 border-2 border-primary-500 text-primary-600 rounded-xl font-semibold text-lg transition-all duration-300"

  return (
    <Link 
      href={href} 
      className={`${baseClasses} ${className}`}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative z-10 flex items-center"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
      >
        {children}
      </motion.div>

      {/* 發光效果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl blur-md"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 粒子效果 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${20 + (i % 2) * 60}%`,
            }}
            animate={{
              y: isHovered ? [0, -10, 0] : 0,
              opacity: isHovered ? [1, 0.5, 1] : 0,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>
    </Link>
  )
}