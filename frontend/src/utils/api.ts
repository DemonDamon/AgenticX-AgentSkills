import axios from 'axios'
import type { Skill, SkillDetail, SkillListResponse, SkillCategory } from '../types/skill'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const skillsApi = {
  list: async (params?: {
    page?: number
    page_size?: number
    category?: SkillCategory
    search?: string
    sort_by?: 'most_popular' | 'newest' | 'highest_rated'
  }): Promise<SkillListResponse> => {
    const response = await api.get('/api/v1/skills/', { params })
    return response.data
  },

  get: async (id: number): Promise<SkillDetail> => {
    const response = await api.get(`/api/v1/skills/${id}`)
    return response.data
  },

  getTrending: async (): Promise<{ skills: Skill[] }> => {
    const response = await api.get('/api/v1/skills/trending/list')
    return response.data
  },
}

export default api
