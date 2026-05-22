import './CardList.css'
import { type ProductResponseDTO } from '../../../shared/types'
import Card from '../Card/Card'

interface ProductsProps {
    products: ProductResponseDTO[]
}

const CardList:React.FC<ProductsProps> = ({products}) => {
    return (
        <section className="container my-5">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                {products.map((product) => (
                    <Card {...product} key={product.id} />
                ))}
            </div>
        </section>
    )
}

export default CardList