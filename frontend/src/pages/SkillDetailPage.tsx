import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Download, Clock, Tag } from 'lucide-react'
import { skillsApi } from '../utils/api'

export default function SkillDetailPage() {
  const { id } = useParams<{ id: string }>()
  const skillId = parseInt(id || '0')

  const { data: skill, isLoading, error } = useQuery({
    queryKey: ['skill', skillId],
    queryFn: () => skillsApi.get(skillId),
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (error || !skill) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">Skill not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to="/skills"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Skills
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-8 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{skill.name}</h1>
                <p className="text-gray-600 text-lg">{skill.description}</p>
              </div>
              {skill.is_free && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  FREE
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{skill.rating.toFixed(1)}</span>
                <span className="text-gray-600">({skill.review_count.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">{skill.download_count.toLocaleString()}+ downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">
                  Updated {new Date(skill.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* LLM Compatibility */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">LLM Compatibility</h3>
              <div className="flex flex-wrap gap-2">
                {skill.llm_compatibility.map((llm) => (
                  <span
                    key={llm}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                  >
                    {llm}
                  </span>
                ))}
              </div>
            </div>

            {/* Installation Guide */}
            {skill.installation_guide && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Installation</h3>
                <p className="text-gray-700">{skill.installation_guide}</p>
              </div>
            )}

            {/* Usage Examples */}
            {skill.usage_examples && skill.usage_examples.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Usage Examples</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {skill.usage_examples.map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* README */}
            {skill.readme && (
              <div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                <div className="prose max-w-none">
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    {skill.readme}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-20">
            <div className="mb-6">
              <div className="text-2xl font-bold mb-2">
                {skill.is_free ? 'Free' : `$${skill.price?.toFixed(2)}`}
              </div>
              <div className="text-sm text-gray-600">Version {skill.version}</div>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium mb-4">
              Install Skill
            </button>

            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-medium">
              View Documentation
            </button>

            <div className="border-t mt-6 pt-6">
              <div className="text-sm text-gray-600 mb-2">Author</div>
              <div className="font-medium">{skill.author}</div>
            </div>

            <div className="border-t mt-6 pt-6">
              <div className="text-sm text-gray-600 mb-2">Category</div>
              <div className="font-medium">{skill.category}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
