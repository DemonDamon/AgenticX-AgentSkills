import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Agent Skills</span>
            </div>
            <p className="text-gray-600 text-sm">
              Empowering the next generation of AI agents with modular capabilities. Build better, faster.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Marketplace</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/skills" className="text-gray-600 hover:text-purple-600 text-sm">
                  Browse All
                </Link>
              </li>
              <li>
                <Link to="/skills?featured=true" className="text-gray-600 hover:text-purple-600 text-sm">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/skills?paid=true" className="text-gray-600 hover:text-purple-600 text-sm">
                  Top Paid
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-purple-600 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  About
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-purple-600 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 Agent Skills Inc. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
