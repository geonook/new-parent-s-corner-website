"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Mail, Phone, Search, ChevronDown, Sparkles, Users, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

/**
 * 首頁組件 - KCISLK Parents' Corner
 * Home Page Component - KCISLK Parents' Corner
 * 
 * @description 公開展示的家長專區，包括歡迎訊息、學校公告、活動資訊等
 * @features 響應式設計、流暢動畫、公開存取、無需登入
 * @author Claude Code | Generated for KCISLK Parents' Corner
 */
export default function HomePage() {
  // 頁面載入狀態 | Page loading state
  const [isLoaded, setIsLoaded] = useState(false)
  
  // 滾動效果相關 hooks | Scroll effect related hooks
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // 視差滾動變換 | Parallax scroll transforms
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 容器動畫變體 - 漸進式顯示子元素 | Container animation variants - staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // 項目動畫變體 - 從下往上淡入 | Item animation variants - fade up
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="relative bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  ES International Department
                </h1>
                <p className="text-xs text-gray-500">Parents' Corner</p>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", href: "/", active: true },
                { name: "Announcements", href: "/announcements" },
                { name: "Events", href: "/events" },
                { name: "Resources", href: "/resources" },
                { name: "Newsletter", href: "/newsletter" },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 ${
                      item.active
                        ? "text-purple-600 bg-purple-100/50"
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50/50"
                    }`}
                  >
                    {item.name}
                    {item.active && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full"
                        layoutId="activeTab"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-20 overflow-hidden">
          <motion.div className="container mx-auto px-4 text-center relative z-10" style={{ y: y1, opacity }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2
                className="text-6xl md:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 mb-6"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Welcome to our
              </motion.h2>
              <motion.h3
                className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-purple-600 to-pink-600 mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Parents' Corner
              </motion.h3>
            </motion.div>

            <motion.div
              className="flex justify-center gap-4 mt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/resources">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Explore Resources
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/announcements">
                  <Button
                    variant="outline"
                    className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                  >
                    Latest News
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
            transition={{
              delay: 1,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </section>

        {/* Parents Quote Section */}
        <motion.section
          className="py-20 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div className="lg:w-1/2" variants={itemVariants}>
                <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Parent and child learning together"
                    width={600}
                    height={400}
                    className="relative rounded-3xl shadow-2xl"
                  />
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>

              <motion.div className="lg:w-1/2 relative" variants={itemVariants}>
                <motion.div
                  className="absolute -top-8 -left-8 text-8xl text-purple-200 font-serif"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  "
                </motion.div>
                <blockquote className="text-3xl md:text-4xl text-gray-700 font-light leading-relaxed relative z-10">
                  <motion.span
                    className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    Parents are the cornerstone
                  </motion.span>{" "}
                  of a child's education; their support and collaboration with teachers create a powerful partnership
                  that inspires and nurtures lifelong learners.
                </blockquote>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Quick Links Section */}
        <motion.section
          className="py-20 bg-gradient-to-r from-purple-600/90 to-purple-800/90 relative overflow-hidden"
          style={{ y: y2 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              className="text-5xl font-bold text-white text-center mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Quick Access
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { title: "Latest Announcements", icon: BookOpen, href: "/announcements", desc: "School news and updates" },
                { title: "Upcoming Events", icon: Calendar, href: "/events", desc: "Activities and important dates" },
                { title: "Learning Resources", icon: Users, href: "/resources", desc: "Educational materials and guides" },
                { title: "Monthly Newsletter", icon: Mail, href: "/newsletter", desc: "Stay informed and connected" },
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link href={item.href}>
                    <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 overflow-hidden group hover:shadow-3xl transition-all duration-500 cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <item.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={itemVariants}>
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Stay Connected
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Have questions or need support? We're here to help you and your child succeed.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                  >
                    <Mail className="w-5 h-5" />
                    Contact School
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-12 flex justify-center items-center gap-8 text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>esid@kangchiao.com.tw</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>(02) 8195-8852</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">KCISLK ESID</h3>
                  <p className="text-xs text-gray-400">Parents' Corner</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Supporting your child's international education journey with resources, updates, and community connection.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: "Announcements", href: "/announcements" },
                  { name: "Events", href: "/events" },
                  { name: "Resources", href: "/resources" },
                  { name: "Newsletter", href: "/newsletter" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Contact Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>esid@kangchiao.com.tw</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>(02) 8195-8852</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 KCISLK Elementary School International Department. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}