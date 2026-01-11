import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { skillsApi } from '../utils/api'
import { SkillCategory } from '../types/skill'
import { useI18n } from '../i18n'
import { cn } from '../utils/cn'

interface CategoryItem {
  category: SkillCategory | null
  label: string
  count: number
}

export default function CategorySidebar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t } = useI18n()
  const selectedCategory = searchParams.get('category') as SkillCategory | null

  // Get all skills to calculate category counts
  const { data: allSkillsData } = useQuery({
    queryKey: ['skills', 'all'],
    queryFn: () => skillsApi.list({ page: 1, page_size: 1000 }),
  })

  const categories: CategoryItem[] = [
    {
      category: null,
      label: t('skills.category.all'),
      count: allSkillsData?.total || 0,
    },
    {
      category: SkillCategory.DATA_ANALYSIS,
      label: t('skills.category.dataAnalysis'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.DATA_ANALYSIS).length || 0,
    },
    {
      category: SkillCategory.CONTENT_CREATION,
      label: t('skills.category.contentCreation'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.CONTENT_CREATION).length || 0,
    },
    {
      category: SkillCategory.DEVELOPMENT,
      label: t('skills.category.development'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.DEVELOPMENT).length || 0,
    },
    {
      category: SkillCategory.DEVELOPER_TOOLS,
      label: t('skills.category.developerTools'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.DEVELOPER_TOOLS).length || 0,
    },
    {
      category: SkillCategory.COMMUNICATION_COLLABORATION,
      label: t('skills.category.communicationCollaboration'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.COMMUNICATION_COLLABORATION).length || 0,
    },
    {
      category: SkillCategory.PRODUCTIVITY,
      label: t('skills.category.productivity'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.PRODUCTIVITY).length || 0,
    },
    {
      category: SkillCategory.AI_AUDIO,
      label: t('skills.category.aiAudio'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.AI_AUDIO).length || 0,
    },
    {
      category: SkillCategory.WEB_TOOLS,
      label: t('skills.category.webTools'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.WEB_TOOLS).length || 0,
    },
    {
      category: SkillCategory.AI_MEDIA,
      label: t('skills.category.aiMedia'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.AI_MEDIA).length || 0,
    },
    {
      category: SkillCategory.BROWSER_AUTOMATION,
      label: t('skills.category.browserAutomation'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.BROWSER_AUTOMATION).length || 0,
    },
    {
      category: SkillCategory.SEARCH_TOOLS,
      label: t('skills.category.searchTools'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.SEARCH_TOOLS).length || 0,
    },
    {
      category: SkillCategory.FINANCE,
      label: t('skills.category.finance'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.FINANCE).length || 0,
    },
    {
      category: SkillCategory.FILE_SYSTEM,
      label: t('skills.category.fileSystem'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.FILE_SYSTEM).length || 0,
    },
    {
      category: SkillCategory.KNOWLEDGE_MEMORY,
      label: t('skills.category.knowledgeMemory'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.KNOWLEDGE_MEMORY).length || 0,
    },
    {
      category: SkillCategory.ENTERTAINMENT_MEDIA,
      label: t('skills.category.entertainmentMedia'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.ENTERTAINMENT_MEDIA).length || 0,
    },
    {
      category: SkillCategory.CODING,
      label: t('skills.category.coding'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.CODING).length || 0,
    },
    {
      category: SkillCategory.WEB_SCRAPER,
      label: t('skills.category.webScraper'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.WEB_SCRAPER).length || 0,
    },
    {
      category: SkillCategory.OTHER,
      label: t('skills.category.other'),
      count: allSkillsData?.skills.filter(s => s.category === SkillCategory.OTHER).length || 0,
    },
  ]

  const handleCategoryClick = (category: SkillCategory | null) => {
    const params = new URLSearchParams(searchParams)
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    params.delete('page') // Reset to page 1
    navigate(`/skills?${params.toString()}`)
  }

  return (
    <div className="w-60 flex-shrink-0 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">{t('skills.title')}</h2>
      <nav className="space-y-1">
        {categories.map((item) => {
          const isSelected = selectedCategory === item.category
          return (
            <button
              key={item.category || 'all'}
              onClick={() => handleCategoryClick(item.category)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                isSelected
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <span className="flex items-center justify-between">
                <span>{item.label}</span>
                <span className="text-gray-500 ml-2">({item.count})</span>
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
