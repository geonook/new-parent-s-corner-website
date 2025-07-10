'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ENGLISH_CONTENT } from '@/lib/constants'

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects for hero background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div className="min-h-screen">
      {/* Hero Section with Large Background */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden hero-gradient"
        style={{ y: backgroundY }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] bg-repeat"></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          className="container-custom relative z-10"
          style={{ y: textY }}
        >
          <div className="text-center text-white">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {ENGLISH_CONTENT.home.welcomeMessage}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-primary-100 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {ENGLISH_CONTENT.home.newsletterNote}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Link 
                href="/resources"
                className="group inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Resources
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="/events"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300"
              >
                View Events
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Monthly Newsletter Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Monthly Newsletter
          </motion.h2>
          
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 p-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
              </div>
              <h3 className="text-3xl font-semibold text-primary-900 mb-6">
                Latest Newsletter Available
              </h3>
              <p className="text-xl text-primary-700 mb-8 leading-relaxed">
                Stay updated with the latest news, events, and notices for parents and students.
              </p>
              <motion.button 
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Access Monthly Newsletter
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Access Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Quick Access
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                href: "/pacing-guides",
                title: "Pacing Guides",
                description: "Access curriculum guides for all grades and English levels",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                delay: 0
              },
              {
                href: "/id-squads",
                title: "ID Squads",
                description: "Learn about our 14 student squads promoting teamwork",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                delay: 0.1
              },
              {
                href: "/events",
                title: "Events",
                description: "Coffee with Principal and parent engagement activities",
                icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                delay: 0.2
              },
              {
                href: "/contact",
                title: "Contact",
                description: "Get in touch with us at ext. 8130",
                icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                delay: 0.3
              }
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
              >
                <Link href={item.href} className="block">
                  <motion.div 
                    className="card h-full p-8 text-center bg-white border-2 border-gray-100"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                      borderColor: "#9007e0"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, backgroundColor: "#9007e0" }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}