export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Parent's Corner
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              國際處家長專區 - 學生與家長最新消息公告
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
              探索最新消息
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">最新消息</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Card Template */}
            {[1, 2, 3].map((item) => (
              <article key={item} className="card">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">課程資訊更新</h3>
                <p className="text-gray-600 mb-4">
                  最新的課程安排與重要通知，請家長們注意相關時程安排。
                </p>
                <div className="text-sm text-gray-500">
                  2025年1月10日
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">聯絡我們</h3>
            <p className="text-gray-600">
              國際處家長專區 | 為孩子的教育攜手合作
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}