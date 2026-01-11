import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Search, Star, Download, TrendingUp } from 'lucide-react'
import { skillsApi } from '../utils/api'
import SkillCard from '../components/SkillCard'
import { useState } from 'react'

const TRENDING_TAGS = [
  'Data Analysis',
  'Coding',
  'Productivity',
  'Finance',
  'Web Scraper',
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: trendingData } = useQuery({
    queryKey: ['skills', 'trending'],
    queryFn: () => skillsApi.getTrending(),
  })

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/skills?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          New: GPT-5 Compatibility Support
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Supercharge Your{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Agents
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover, download, and deploy thousands of community-verified Agent Skills.
          From data analysis to creative writing, find the perfect capability for your AI workforce.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for 'Python Sandbox', 'SEO Analyzer'..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-sm font-medium text-gray-700">TRENDING:</span>
          {TRENDING_TAGS.map((tag) => (
            <Link
              key={tag}
              to={`/skills?category=${encodeURIComponent(tag)}`}
              className="px-4 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full text-sm font-medium transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Skill of the Week */}
      {trendingData && trendingData.skills.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-bold">Skill of the Week</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <SkillCard skill={trendingData.skills[0]} featured />
          </div>
        </div>
      )}

      {/* Featured Skills */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Skills</h2>
        {trendingData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingData.skills.slice(1, 4).map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Browse our complete catalog of AI agent skills and find the perfect tools for your needs.
        </p>
        <Link
          to="/skills"
          className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
        >
          Browse All Skills
        </Link>
      </div>
    </div>
  )
}
