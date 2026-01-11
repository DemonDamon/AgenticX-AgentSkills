import { Link } from 'react-router-dom'
import { ShoppingCart, User, Globe } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [language, setLanguage] = useState<'EN' | '中文'>('EN')

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🤖</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Agent Skills</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/skills"
              className="text-gray-700 hover:text-purple-600 font-medium border-b-2 border-purple-600 pb-1"
            >
              Marketplace
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-purple-600 font-medium">
              Blog
            </Link>

            {/* Language Selector */}
            <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-1 rounded text-sm ${
                  language === 'EN' ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('中文')}
                className={`px-2 py-1 rounded text-sm ${
                  language === '中文' ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-600'
                }`}
              >
                中文
              </button>
            </div>

            {/* Icons */}
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
