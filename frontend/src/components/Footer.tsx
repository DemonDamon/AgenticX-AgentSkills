import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Agent Skills</span>
            </div>
            <p className="text-gray-600 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 text-sm">
                  {t('header.blog')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                  {t('footer.community')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                  {t('footer.support')}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 text-sm">
                  {t('header.blog')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              {t('footer.privacyPolicy')}
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              {t('footer.termsOfService')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
