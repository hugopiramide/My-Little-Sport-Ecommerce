import './Card.css'
import { type ProductResponseDTO } from '../../../shared/types'
import { Link } from 'react-router-dom'
import { Heart, HeartFill } from 'react-bootstrap-icons'
import { FavoriteService } from '../../../shared/services/FavoriteService'
import { getCurrentUserId } from '../../../auth/utils/authUtils'
import { useState, useEffect } from 'react'

const Card: React.FC<ProductResponseDTO> = ({ id, name, categoryName, basePrice, imageUrl, active }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const [favoriteId, setFavoriteId] = useState<number | null>(null)
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)

    useEffect(() => {
        const checkFavorite = async () => {
            const userId = getCurrentUserId()
            if (userId && id) {
                const favorites = await FavoriteService.getUserFavorites(userId)
                const fav = favorites.find(f => f.productId === id)
                if (fav) {
                    setIsFavorite(true)
                    setFavoriteId(fav.id)
                }
            }
        }
        checkFavorite()
    }, [id])

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault()
        const userId = getCurrentUserId()
        if (!userId) {
            alert('Please log in to add to favorites')
            return
        }

        if (isFavoriteLoading) return
        setIsFavoriteLoading(true)

        if (isFavorite && favoriteId) {
            const success = await FavoriteService.removeFavorite(favoriteId)
            if (success) {
                setIsFavorite(false)
                setFavoriteId(null)
            }
        } else {
            const result = await FavoriteService.addFavorite({
                user_id: userId,
                product_id: id,
                notify_when_in_stock: true
            })
            if (result) {
                setIsFavorite(true)
                setFavoriteId(result.id)
            }
        }
        setIsFavoriteLoading(false)
    }

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(amount)
    }
    
    if(!active) {
        return (
            <div className="product-card unavailable">
                <div className="product-card-image-wrapper">
                    <img src={imageUrl} className="product-card-image grayscale" alt={name} />
                    <div className="unavailable-overlay">
                        <span>Sold Out</span>
                    </div>
                </div>
                <div className="product-card-info opacity-50">
                    <h3 className="product-card-title">{name}</h3>
                    <p className="product-card-category">{categoryName}</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className="product-card">
            <Link to={`/articles/${id}`} className="product-card-link">
                <div className="product-card-image-wrapper">
                    <img
                        src={imageUrl}
                        className="product-card-image" 
                        alt={name}
                    />
                    <div className="product-card-overlay">
                        <button 
                            className="quick-add-btn bg-black border-0" 
                            aria-label="Toggle favorite"
                            onClick={handleToggleFavorite}
                            disabled={isFavoriteLoading}
                        >
                            {isFavorite ? <HeartFill className="text-danger" size={18} /> : <Heart size={18} />}
                        </button>
                    </div>
                </div>

                <div className="product-card-info">
                    <div className="product-card-header">
                        <h3 className="product-card-title">{name}</h3>
                        <span className="product-card-price">{formatPrice(basePrice)}</span>
                    </div>
                    <p className="product-card-category">{categoryName}</p>
                </div>
            </Link>
        </div>
    )
}

export default Card