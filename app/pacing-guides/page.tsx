import { ENGLISH_CONTENT, PACING_GUIDE_TEMPLATES } from '@/lib/constants'

export default function PacingGuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Pacing Guides</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            {ENGLISH_CONTENT.pacingGuides.description}
          </p>
          
          <div className="grid gap-8">
            {/* Grade 1 */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Grade 1</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 1 E1 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 1 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 1 E2 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 2 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 1 E3 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 3 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
            
            {/* Grade 2 */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Grade 2</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 2 E1 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 1 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 2 E2 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 2 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 2 E3 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 3 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
            
            {/* Grade 3 */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Grade 3</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 3 E1 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 1 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 3 E2 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 2 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 3 E3 Pacing Guide</h3>
                  <p className="text-sm text-gray-600 mb-3">English Level 3 curriculum guide</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> {ENGLISH_CONTENT.pacingGuides.note}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}