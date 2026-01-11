import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { skillsApi } from '../utils/api'
import SkillCard from '../components/SkillCard'
import { SkillCategory } from '../types/skill'
import { useState } from 'react'

export default function SkillsPage() {
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState<'most_popular' | 'newest' | 'highest_rated'>('most_popular')
  const [page, setPage] = useState(1)

  const category = searchParams.get('category') as SkillCategory | null
  const search = searchParams.get('search') || undefined

  const { data, isLoading, error } = useQuery({
    queryKey: ['skills', { category, search, sortBy, page }],
    queryFn: () =>
      skillsApi.list({
        page,
        page_size: 20,
        category: category || undefined,
        search,
        sort_by: sortBy,
      }),
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">Error loading skills</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Skills</h1>
        <p className="text-gray-600">Discover powerful capabilities for your AI agents.</p>
      </div>

      {/* Sort and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          {data?.total || 0} skills found{search ? ` for "${search}"` : ''}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="most_popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="highest_rated">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Skills Grid */}
      {data && data.skills.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data.skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          {/* Pagination */}
          {data.total > data.page_size && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {Math.ceil(data.total / data.page_size)}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(data.total / data.page_size)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-600">
          No skills found. Try adjusting your search or filters.
        </div>
      )}
    </div>
  )
}
