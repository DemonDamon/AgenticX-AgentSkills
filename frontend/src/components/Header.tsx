import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'
import { useI18n } from '../i18n'

export default function Header() {
  const { locale, setLocale, t } = useI18n()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isMarketplace = location.pathname === '/skills'

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🤖</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Agent Skills</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-gray-700 hover:text-blue-600 font-medium pb-1 ${
                isHome ? 'border-b-2 border-blue-600' : ''
              }`}
            >
              {t('header.home')}
            </Link>
            <Link
              to="/skills"
              className={`text-gray-700 hover:text-blue-600 font-medium pb-1 ${
                isMarketplace ? 'border-b-2 border-blue-600' : ''
              }`}
            >
              {t('header.marketplace')}
            </Link>

            {/* Language Selector */}
            <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
              <button
                onClick={() => setLocale('en')}
                className={`px-2 py-1 rounded text-sm ${
                  locale === 'en' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600'
                }`}
              >
                {t('header.language.en')}
              </button>
              <button
                onClick={() => setLocale('zh')}
                className={`px-2 py-1 rounded text-sm ${
                  locale === 'zh' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600'
                }`}
              >
                {t('header.language.zh')}
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
