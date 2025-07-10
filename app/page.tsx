import Link from 'next/link'
import { ENGLISH_CONTENT } from '@/lib/constants'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {ENGLISH_CONTENT.home.welcomeMessage}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              {ENGLISH_CONTENT.home.newsletterNote}
            </p>
            <Link 
              href="/resources"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Monthly Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Monthly Newsletter</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="card bg-primary-50 border-primary-200">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-primary-900 mb-4">
                  Latest Newsletter Available
                </h3>
                <p className="text-primary-700 mb-6">
                  Stay updated with the latest news, events, and notices for parents and students.
                </p>
                <button className="btn-primary">
                  Access Monthly Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/pacing-guides" className="card hover:shadow-lg transition-shadow duration-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Pacing Guides</h3>
                <p className="text-gray-600 text-sm">Access curriculum guides for all grades and English levels</p>
              </div>
            </Link>
            
            <Link href="/id-squads" className="card hover:shadow-lg transition-shadow duration-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">ID Squads</h3>
                <p className="text-gray-600 text-sm">Learn about our 14 student squads promoting teamwork</p>
              </div>
            </Link>
            
            <Link href="/events" className="card hover:shadow-lg transition-shadow duration-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Events</h3>
                <p className="text-gray-600 text-sm">Coffee with Principal and parent engagement activities</p>
              </div>
            </Link>
            
            <Link href="/contact" className="card hover:shadow-lg transition-shadow duration-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <p className="text-gray-600 text-sm">Get in touch with us at ext. 8130</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}