'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

interface InteractiveCardProps {
  href: string
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
  className?: string
}

export default function InteractiveCard({ 
  href, 
  title, 
  description, 
  icon, 
  delay = 0,
  className = '' 
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      <Link href={href} className="block h-full">
        <motion.div
          ref={cardRef}
          className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center h-full overflow-hidden"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          whileHover={{ 
            y: -8,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { duration: 0.1 }
          }}
        >
          {/* Background Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Sparkle Effect */}
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full"
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [1, 0.5, 1] : 0
            }}
            transition={{ 
              duration: 1.5, 
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          
          {/* Icon Container */}
          <motion.div 
            className="relative w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6"
            animate={{
              backgroundColor: isHovered ? "#9007e0" : "#f3e8ff",
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -5, 5, 0] : 0
            }}
            transition={{ 
              duration: 0.3,
              rotate: { duration: 0.6, ease: "easeInOut" }
            }}
          >
            <motion.div
              className="text-primary-600"
              animate={{
                color: isHovered ? "#ffffff" : "#7c3aed"
              }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
            
            {/* Icon Glow */}
            <motion.div
              className="absolute inset-0 bg-primary-500 rounded-xl blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <motion.h3 
              className="text-xl font-semibold mb-4 text-gray-900"
              animate={{
                color: isHovered ? "#4c1d95" : "#111827"
              }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 leading-relaxed"
              animate={{
                color: isHovered ? "#6d28d9" : "#6b7280"
              }}
              transition={{ duration: 0.2 }}
            >
              {description}
            </motion.p>
          </div>
          
          {/* Border Highlight */}
          <motion.div
            className="absolute inset-0 border-2 border-primary-500 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{
              x: isHovered ? ["-100%", "100%"] : "-100%",
              opacity: isHovered ? [0, 0.3, 0] : 0
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 1
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}