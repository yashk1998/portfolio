export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Yash Khivasara
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Full-Stack Developer
        </p>
        <div className="space-y-4">
          <p className="text-green-600">✅ Build optimized!</p>
          <p className="text-blue-600">📱 Terminal portfolio available</p>
        </div>
        <div className="mt-8">
          <a 
            href="/terminal" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Terminal Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
