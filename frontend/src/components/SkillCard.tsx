import { Link } from 'react-router-dom'
import { Star, Download, Clock } from 'lucide-react'
import { Skill } from '../types/skill'
import { cn } from '../utils/cn'

interface SkillCardProps {
  skill: Skill
  featured?: boolean
}

export default function SkillCard({ skill, featured = false }: SkillCardProps) {
  return (
    <Link
      to={`/skills/${skill.id}`}
      className={cn(
        'block bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow',
        featured && 'border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50'
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{skill.description}</p>
        </div>
        {skill.is_free && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium ml-2">
            FREE
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{skill.rating.toFixed(1)}</span>
          <span className="text-gray-600">({skill.review_count.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Download className="w-4 h-4" />
          <span>{skill.download_count.toLocaleString()}+</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{new Date(skill.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {skill.category}
        </span>
        <div className="flex gap-1">
          {skill.llm_compatibility.slice(0, 2).map((llm) => (
            <span
              key={llm}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
            >
              {llm}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
