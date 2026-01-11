import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { skillsApi } from '../utils/api'
import SkillCard from '../components/SkillCard'
import CategorySidebar from '../components/CategorySidebar'
import Pagination from '../components/Pagination'
import { SkillCategory } from '../types/skill'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useI18n } from '../i18n'

export default function SkillsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useI18n()
  const [sortBy, setSortBy] = useState<'most_popular' | 'newest' | 'highest_rated'>('most_popular')
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const category = searchParams.get('category') as SkillCategory | null
  const search = searchParams.get('search') || undefined

  // Sync page state with URL
  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) {
      setPage(parseInt(pageParam, 10))
    } else {
      setPage(1)
    }
  }, [searchParams])

  // Sync search query with URL
  useEffect(() => {
    setSearchQuery(search || '')
  }, [search])

  const { data, isLoading, error } = useQuery({
    queryKey: ['skills', { category, search, sortBy, page }],
    queryFn: () =>
      skillsApi.list({
        page,
        page_size: 12,
        category: category || undefined,
        search,
        sort_by: sortBy,
      }),
  })

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    } else {
      params.delete('search')
    }
    params.delete('page') // Reset to page 1
    setSearchParams(params)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = data ? Math.ceil(data.total / data.page_size) : 0

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <CategorySidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">{t('common.loading')}</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <CategorySidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-600">{t('common.error')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <CategorySidebar />

      {/* Right Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">{t('skills.title')}</h1>
          <p className="text-gray-600 text-sm">{t('skills.discover')}</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('home.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {t('common.search')}
            </button>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600 text-sm">
            {data?.total || 0} {t('skills.skillsFound')}
            {search ? ` ${t('skills.for')} "${search}"` : ''}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">{t('skills.sortBy')}</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="most_popular">{t('skills.mostPopular')}</option>
              <option value="newest">{t('skills.newest')}</option>
              <option value="highest_rated">{t('skills.highestRated')}</option>
            </select>
          </div>
        </div>

        {/* Skills Grid */}
        {data && data.skills.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12 text-gray-600">
            {t('skills.noSkillsFound')}
          </div>
        )}
      </div>
    </div>
  )
}
