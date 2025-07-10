import { ENGLISH_CONTENT, ENGLISH_SQUADS, SQUAD_COLORS } from '@/lib/constants'

export default function IDSquadsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">ID Squads</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            {ENGLISH_CONTENT.idSquads.description}
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {ENGLISH_SQUADS.map((squad, index) => (
              <div 
                key={squad}
                className="card hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-3">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: SQUAD_COLORS[index] }}
                  />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {squad}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Promoting leadership and cooperation
                </p>
              </div>
            ))}
          </div>
          
          <div className="card bg-primary-50 border-primary-200">
            <p className="text-primary-800 font-medium">
              {ENGLISH_CONTENT.idSquads.conclusion}
            </p>
          </div>
          
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Squad Values</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Leadership development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Teamwork and cooperation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Positive behavior reinforcement
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  School spirit and pride
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">How Squads Work</h2>
              <p className="text-gray-600 mb-4">
                Students are assigned to squads to foster a sense of belonging and encourage positive behavior throughout the school year.
              </p>
              <p className="text-gray-600">
                Each squad participates in various activities and competitions that promote collaboration and school community engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}