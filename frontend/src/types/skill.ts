export enum SkillCategory {
  DATA_ANALYSIS = "Data Analysis",
  CODING = "Coding",
  PRODUCTIVITY = "Productivity",
  FINANCE = "Finance",
  WEB_SCRAPER = "Web Scraper",
  CONTENT_CREATION = "Content Creation",
  DEVELOPMENT = "Development",
  OTHER = "Other",
}

export enum LLMCompatibility {
  GPT_4 = "GPT-4",
  GPT_4O = "GPT-4o",
  GPT_5 = "GPT-5",
  CLAUDE_3 = "Claude 3",
  CLAUDE_3_5 = "Claude 3.5",
  QWEN_PLUS = "Qwen Plus",
  DEEPSEEK = "DeepSeek",
  UNIVERSAL = "Universal",
}

export interface Skill {
  id: number
  name: string
  description: string
  category: SkillCategory
  tags: string[]
  author: string
  version: string
  llm_compatibility: LLMCompatibility[]
  is_free: boolean
  price?: number
  download_count: number
  rating: number
  review_count: number
  created_at: string
  updated_at: string
}

export interface SkillDetail extends Skill {
  readme?: string
  installation_guide?: string
  usage_examples?: string[]
}

export interface SkillListResponse {
  skills: Skill[]
  total: number
  page: number
  page_size: number
}
