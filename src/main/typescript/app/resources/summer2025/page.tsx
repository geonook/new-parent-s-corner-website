export default function Summer2025Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Summer 2025</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Seasonal learning resources specific to summer 2025.
          </p>
          
          <div className="grid gap-8">
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Summer Reading Program</h2>
              <p className="text-gray-600 mb-4">
                Maintain and improve reading skills during the summer break with our carefully curated reading materials and activities.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 1 Materials</h3>
                  <p className="text-sm text-gray-600">Age-appropriate books and activities</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 2 Materials</h3>
                  <p className="text-sm text-gray-600">Intermediate reading challenges</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Grade 3 Materials</h3>
                  <p className="text-sm text-gray-600">Advanced reading and comprehension</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Family Activities</h3>
                  <p className="text-sm text-gray-600">Engaging activities for the whole family</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Summer Learning Packets</h2>
              <p className="text-gray-600 mb-4">
                Downloadable learning packets to help students maintain their academic progress during the summer months.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">English Language Arts - Grade 1</span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">English Language Arts - Grade 2</span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">English Language Arts - Grade 3</span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Summer Preparation Tips</h2>
              <p className="text-gray-600 mb-4">
                Helpful tips for parents to support their child's learning during the summer break.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Establish a daily reading routine</li>
                <li>Visit local libraries and participate in summer reading programs</li>
                <li>Practice English conversation during daily activities</li>
                <li>Encourage creative writing and journaling</li>
                <li>Explore educational websites and apps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}