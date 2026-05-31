import { authFetch, getAuthHeaders } from '../../auth/utils/authUtils'
import type { UserFavoriteResponseDTO, UserFavoriteRequestDTO } from '../types'

const API_URL = 'http://localhost:8080/api/user-favorites'

export const FavoriteService = {
  getUserFavorites: async (userId: number): Promise<UserFavoriteResponseDTO[]> => {
    try {
      const response = await authFetch(`${API_URL}/all`, {
        headers: getAuthHeaders()
      })
      if (!response.ok) return []
      const all: UserFavoriteResponseDTO[] = await response.json()
      return all.filter(f => f.userId === userId)
    } catch {
      return []
    }
  },

  addFavorite: async (request: UserFavoriteRequestDTO): Promise<UserFavoriteResponseDTO | null> => {
    try {
      const response = await authFetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(request)
      })
      if (!response.ok) return null
      return await response.json()
    } catch {
      return null
    }
  },

  removeFavorite: async (id: number): Promise<boolean> => {
    try {
      const response = await authFetch(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
        method: 'DELETE',
      })
      return response.ok
    } catch {
      return false
    }
  }
}
