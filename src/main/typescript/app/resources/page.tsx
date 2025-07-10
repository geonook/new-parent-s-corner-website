export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Resources</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Repository of learning materials and programs supporting student literacy and transition.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Reading Buddies</h2>
              <p className="text-gray-600 mb-4">
                Reading support program designed to help students develop their literacy skills through peer collaboration.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Visit Reading Buddies →
              </a>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">ReadWorks</h2>
              <p className="text-gray-600 mb-4">
                Comprehensive reading comprehension resources and materials for students at various grade levels.
              </p>
              <a 
                href="https://readworks.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Visit ReadWorks →
              </a>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Literacy Support</h2>
              <p className="text-gray-600 mb-4">
                Additional resources and programs designed to support student literacy development and academic success.
              </p>
              <div className="text-sm text-gray-500">
                Contact us for more information
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Transition Programs</h2>
              <p className="text-gray-600 mb-4">
                Programs supporting students as they transition between grade levels and academic milestones.
              </p>
              <div className="text-sm text-gray-500">
                Ongoing support throughout the school year
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}