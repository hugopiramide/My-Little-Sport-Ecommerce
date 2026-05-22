import { useState, useEffect, useCallback } from 'react'
import { FavoriteService } from '../../shared/services/FavoriteService'
import type { ProductResponseDTO } from '../../shared/types'

interface FavoriteProduct {
  favoriteId: number;
  product: ProductResponseDTO;
}

export const useFavorites = (userId: number) => {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const favorites = await FavoriteService.getUserFavorites(userId)
      
      const productsPromises = favorites.map(async (favorite) => {
        const response = await fetch(`http://localhost:8080/api/products/${favorite.productId}`)
        if (response.ok) {
          const product = await response.json()
          return {
            favoriteId: favorite.id,
            product
          }
        }
        return null
      })
      
      const products = await Promise.all(productsPromises)
      setFavoriteProducts(products.filter((p): p is FavoriteProduct => p !== null))
    } catch (err) {
      setError("Error loading favorites")
      setFavoriteProducts([])
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      fetchFavorites()
    }
  }, [userId, fetchFavorites])

  const removeFavorite = useCallback(
    async (favoriteId: number) => {
      try {
        const success = await FavoriteService.removeFavorite(favoriteId)
        if (success) {
          setFavoriteProducts(prev => prev.filter(f => f.favoriteId !== favoriteId))
        }
        return success
      } catch (err) {
        setError("Error removing favorite")
        return false
      }
    },
    []
  )

  return { favoriteProducts, loading, error, removeFavorite, refetch: fetchFavorites }
}
