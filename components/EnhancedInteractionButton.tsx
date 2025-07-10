'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

interface EnhancedButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
  className?: string
}

export default function EnhancedInteractionButton({ 
  href, 
  children, 
  variant = 'primary', 
  icon,
  className = '' 
}: EnhancedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const baseClasses = "group relative inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden"
  
  const variantClasses = {
    primary: "bg-white text-primary-600 shadow-lg",
    secondary: "border-2 border-white text-white"
  }

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? (variant === 'secondary' ? 1 : 0.1) : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />
      
      <motion.div
        className="relative z-10 flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        whileHover={{ 
          scale: 1.02,
          y: -2
        }}
        whileTap={{ 
          scale: 0.98,
          y: 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        }}
      >
        <motion.span
          animate={{
            color: isHovered && variant === 'secondary' ? '#ffffff' : undefined
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
        
        {icon && (
          <motion.div
            className="ml-2"
            animate={{
              x: isHovered ? 4 : 0,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
          >
            {icon}
          </motion.div>
        )}
      </motion.div>
      
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-white rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isPressed ? 1.5 : 0,
          opacity: isPressed ? 0.3 : 0
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />
      
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl blur opacity-0"
        animate={{
          opacity: isHovered ? 0.4 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}