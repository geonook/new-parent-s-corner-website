'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimationContextType {
  prefersReducedMotion: boolean
  isHighPerformance: boolean
  animationIntensity: 'low' | 'medium' | 'high'
  enableHaptics: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  isHighPerformance: true,
  animationIntensity: 'high',
  enableHaptics: false
})

export const useAnimationContext = () => useContext(AnimationContext)

interface AdvancedAnimationProviderProps {
  children: React.ReactNode
}

export default function AdvancedAnimationProvider({ children }: AdvancedAnimationProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isHighPerformance, setIsHighPerformance] = useState(true)
  const [animationIntensity, setAnimationIntensity] = useState<'low' | 'medium' | 'high'>('high')
  const [enableHaptics, setEnableHaptics] = useState(false)

  useEffect(() => {
    // 檢測用戶動畫偏好
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
      setAnimationIntensity(e.matches ? 'low' : 'high')
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // 檢測設備性能
    const checkPerformance = () => {
      // 檢測 GPU 支援
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const hasWebGL = !!gl
      
      // 檢測硬體加速
      const hasHardwareAcceleration = window.navigator.hardwareConcurrency > 2
      
      // 檢測記憶體
      const hasEnoughMemory = (navigator as any).deviceMemory ? 
        (navigator as any).deviceMemory >= 4 : true
      
      const isHighPerf = hasWebGL && hasHardwareAcceleration && hasEnoughMemory
      setIsHighPerformance(isHighPerf)
      
      if (!isHighPerf) {
        setAnimationIntensity('medium')
      }
    }
    
    checkPerformance()
    
    // 檢測觸控設備支援
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const hasVibration = 'vibrate' in navigator
    
    setEnableHaptics(hasTouchSupport && hasVibration)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const contextValue: AnimationContextType = {
    prefersReducedMotion,
    isHighPerformance,
    animationIntensity,
    enableHaptics
  }

  return (
    <AnimationContext.Provider value={contextValue}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.5 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimationContext.Provider>
  )
}