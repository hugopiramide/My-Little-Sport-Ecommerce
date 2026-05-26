import { useLoaderData, type LoaderFunction, useSearchParams } from 'react-router-dom'
import CardList from '../components/CardList'
import ProductFilters from '../components/ProductFilters'
import { type ProductResponseDTO, type Page } from '../../shared/types'
import { ProductService } from '../services/ProductService'

const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get("page") || "0")
  const size = parseInt(url.searchParams.get("size") || "8")
  const query = url.searchParams.get("query") || ""
  const category = url.searchParams.get("category") || ""
  const priceOrder = url.searchParams.get("priceOrder") || ""

  return await ProductService.getFilteredProducts({ query, category, priceOrder, page, size });
}

const Articles = () => {
  const productsPage = useLoaderData() as Page<ProductResponseDTO>
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("query") || ""

  const { _embedded, page: pageData } = productsPage
  const content = _embedded?.productResponseDTOList || []
  const { number: currentPage, totalPages } = pageData
  const first = currentPage === 0
  const last = currentPage >= totalPages - 1

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return
    
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", newPage.toString())
    setSearchParams(newParams)
  }

  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (query) {
      newParams.set("query", query)
    } else {
      newParams.delete("query")
    }
    newParams.set("page", "0")
    setSearchParams(newParams)
  }

  const handleFilterChange = (filterId: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (filterId === 'filter1') { 
      if (value && value !== 'all') {
        newParams.set("category", value)
      } else {
        newParams.delete("category")
      }
    } else if (filterId === 'filter2') {
      if (value) {
        newParams.set("priceOrder", value)
      } else {
        newParams.delete("priceOrder")
      }
    }
    newParams.set("page", "0")
    setSearchParams(newParams)
  }

  return (
    <div className="container py-5">
      <header className="row mb-5 align-items-end">
        <div className="col">
          <h1 className="mt-2 mb-0">PRODUCTS</h1>
        </div>
      </header>

      <ProductFilters 
        queryValue={query}
        onSearch={handleSearch} 
        onResetQuery={() => handleSearch("")}
        onFilterChange={handleFilterChange} 
      />

      <main>
        {content.length === 0 ? (
          <div className="text-center py-5 shadow-sm rounded bg-light">
            <i className="bi bi-box-seam display-1 text-muted"></i>
            <p className="fs-4 mt-3 text-secondary">No products found.</p>
          </div>
        ) : (
          <CardList products={content} />
        )}
      </main>

      {totalPages > 1 && (
        <nav aria-label="Product navigation" className="mt-3 pt-4 mb-3">
          <div className="d-flex justify-content-center gap-2">
            <button 
              className={`btn ${first ? 'btn-dark-custom border opacity-50' : 'btn-dark-custom'} px-4 py-2 text-uppercase fw-bold`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={first}
            >
              Prev
            </button>
            
            <div className="d-none d-md-flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx)}
                  className={`btn ${idx === currentPage ? 'btn-dark-custom' : 'btn-custom'} fw-bold d-flex align-items-center justify-content-center w-42px h-42px p-0`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button 
              className={`btn ${last ? 'btn-dark-custom border opacity-50' : 'btn-dark-custom'} px-4 py-2 text-uppercase fw-bold`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={last}
            >
              Next
            </button>
          </div>
          
          <div className="text-center mt-4 d-md-none">
            <span className="text-muted small fw-bold tracking-wider text-uppercase">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </nav>
      )}
    </div>
  )
}

Articles.loader = loader
export default Articles