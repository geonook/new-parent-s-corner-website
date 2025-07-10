'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAVIGATION } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ES</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              International Department
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {NAVIGATION.map((item) => {
              const isActive = pathname === item.href
              const hasChildren = 'children' in item && item.children && item.children.length > 0
              
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      'px-3 py-2 text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    )}
                  >
                    {item.name}
                    {hasChildren && (
                      <svg
                        className="w-4 h-4 ml-1 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {hasChildren && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {NAVIGATION.map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200',
                        isActive
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Mobile Dropdown */}
                    {'children' in item && item.children && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}