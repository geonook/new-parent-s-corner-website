export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Events</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Details on school events such as "Coffee with the Principal," aimed at parent-school engagement.
          </p>
          
          <div className="grid gap-8">
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Coffee with the Principal</h2>
              <p className="text-gray-600 mb-4">
                Join us for informal conversations with the principal to discuss your child's education and school developments.
              </p>
              <div className="text-sm text-gray-500">
                Regular monthly meetings - Check announcements for specific dates
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Parent-School Engagement</h2>
              <p className="text-gray-600 mb-4">
                Various activities designed to strengthen the partnership between parents and the school community.
              </p>
              <div className="text-sm text-gray-500">
                Upcoming events will be announced through our newsletter
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}