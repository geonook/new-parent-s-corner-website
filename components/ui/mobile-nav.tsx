'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Calendar, BookOpen, Settings, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  requiresAuth?: boolean
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  { name: '首頁', href: '/', icon: Home },
  { name: '活動資訊', href: '/events', icon: Calendar },
  { name: '學習資源', href: '/resources', icon: BookOpen },
  { name: '教師專區', href: '/teachers', icon: GraduationCap, requiresAuth: true },
  { name: '管理後台', href: '/admin', icon: Settings, requiresAuth: true, adminOnly: true }
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAdmin } = useAuth()

  const toggleNav = () => setIsOpen(!isOpen)
  const closeNav = () => setIsOpen(false)

  const filteredNavItems = navItems.filter(item => {
    if (item.requiresAuth && !user) return false
    if (item.adminOnly && !isAdmin) return false
    return true
  })

  return (
    <>
      {/* 漢堡選單按鈕 - 只在行動裝置顯示 */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden p-2"
        onClick={toggleNav}
        aria-label="開啟選單"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* 背景遮罩 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeNav}
          />
        )}
      </AnimatePresence>

      {/* 側邊選單 */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              type: 'spring', 
              damping: 20, 
              stiffness: 300 
            }}
            className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden overflow-y-auto"
          >
            {/* 選單標題區域 */}
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  KCISLK ESID
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  國際部資訊中心
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={closeNav}
                aria-label="關閉選單"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* 用戶資訊區域 */}
            {user && (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-b dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {isAdmin ? '管理員' : '一般用戶'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 導航連結 */}
            <div className="py-6">
              <nav className="space-y-2 px-6">
                {filteredNavItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeNav}
                      className="flex items-center gap-4 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 group"
                    >
                      <IconComponent className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* 底部區域 */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {!user ? (
                <Link 
                  href="/login" 
                  onClick={closeNav}
                  className="block w-full"
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    登入系統
                  </Button>
                </Link>
              ) : (
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  KCISLK ESID Info Hub v1.0
                </p>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}