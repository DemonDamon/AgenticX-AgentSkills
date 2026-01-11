import { Link } from 'react-router-dom'
import { Star, Download, Clock, CheckCircle2 } from 'lucide-react'
import { Skill } from '../types/skill'
import { cn } from '../utils/cn'
import { useI18n } from '../i18n'

interface SkillCardProps {
  skill: Skill
  featured?: boolean
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}m`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

function getTimeAgo(date: string): string {
  const now = new Date()
  const updated = new Date(date)
  const diffMs = now.getTime() - updated.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return '1d ago'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`
  return `${Math.floor(diffDays / 365)}y ago`
}

export default function SkillCard({ skill, featured = false }: SkillCardProps) {
  const { t } = useI18n()

  return (
    <Link
      to={`/skills/${skill.id}`}
      className={cn(
        'block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all',
        'hover:border-blue-300'
      )}
    >
      {/* Header with icon and badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          {/* Icon placeholder */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-bold">
              {skill.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {skill.is_free && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                  {t('common.free')}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 className="w-3 h-3" />
                {t('common.hosted')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Title and Category */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold mb-1 text-gray-900 line-clamp-1">
          {skill.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{skill.category}</p>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {skill.description}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{skill.rating.toFixed(1)}</span>
          <span className="text-gray-500">({formatNumber(skill.review_count)})</span>
        </div>
        <div className="flex items-center gap-1">
          <Download className="w-3.5 h-3.5" />
          <span>{formatNumber(skill.download_count)}+</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{getTimeAgo(skill.updated_at)}</span>
        </div>
      </div>

      {/* Footer with LLM compatibility */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          {skill.author}
        </div>
        <div className="flex gap-1">
          {skill.llm_compatibility.slice(0, 2).map((llm) => (
            <span
              key={llm}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100"
            >
              {llm}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
