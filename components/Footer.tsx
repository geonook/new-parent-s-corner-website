import Link from 'next/link'
import { NAVIGATION, ENGLISH_CONTENT } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ES</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                International Department
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Welcome to the ES International Department homepage! We support student literacy, 
              promote teamwork through ID Squads, and provide comprehensive resources for parents and students.
            </p>
            <p className="text-sm text-gray-500">
              Parents are the cornerstone of a child's education; their support and collaboration 
              with teachers create a powerful partnership that inspires and nurtures lifelong learners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-primary-600 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">{ENGLISH_CONTENT.contact.extension}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">Mon - Fri: 8:00 AM - 4:00 PM</span>
              </div>
              
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">ES International Department</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 ES International Department. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/pacing-guides" className="text-sm text-gray-500 hover:text-primary-600">
              Pacing Guides
            </Link>
            <Link href="/id-squads" className="text-sm text-gray-500 hover:text-primary-600">
              ID Squads
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-primary-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}