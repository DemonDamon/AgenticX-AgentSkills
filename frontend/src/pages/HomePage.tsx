import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { skillsApi } from '../utils/api'
import SkillCard from '../components/SkillCard'
import { useState } from 'react'
import { useI18n } from '../i18n'

const TRENDING_TAGS = [
  'Data Analysis',
  'Coding',
  'Productivity',
  'Finance',
  'Web Scraper',
]

export default function HomePage() {
  const { t } = useI18n()
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
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {t('home.newFeature')}
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {t('home.title').split('AI Agents')[0]}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            AI Agents
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          {t('home.subtitle')}
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('home.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {t('common.search')}
            </button>
          </div>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-sm font-medium text-gray-700">{t('home.trending')}</span>
          {TRENDING_TAGS.map((tag) => (
            <Link
              key={tag}
              to={`/skills?category=${encodeURIComponent(tag)}`}
              className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Skills */}
      {trendingData && trendingData.skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('home.trendingSkills')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingData.skills.slice(0, 9).map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
