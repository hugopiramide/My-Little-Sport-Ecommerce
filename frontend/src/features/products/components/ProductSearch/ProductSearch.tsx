import { useState, useEffect, useRef, type FormEvent } from 'react'
import { Search, XCircleFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import type { ProductResponseDTO } from '../../../shared/types'
import "./ProductSearch.css"

const ProductSearch = () => {
  const [query, setQuery] = useState<string>("")
  const [results, setResults] = useState<ProductResponseDTO[]>([])
  const [itsOpen, setItsOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (pageNum: number = 0, e?: FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/products/search-simple?query=${query}&page=${pageNum}&size=5`)
      if (response.ok) {
        const data = await response.json()
        const items = data._embedded?.productResponseDTOList || []
        setResults(items)
        setCurrentPage(data.page?.number || 0)
        setTotalPages(data.page?.totalPages || 0)
        setItsOpen(true)
      }
    } catch (error) {
      console.log("error search", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setItsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery("")
    setResults([])
    setItsOpen(false)
    setCurrentPage(0)
    setTotalPages(0)
  }

  return (
    <div className="position-relative max-w-400" ref={containerRef}>

      <form onSubmit={(e) => handleSearch(0, e)}>
        <div className="position-relative">
          <button
            type="submit"
            className="btn btn-link position-absolute top-50 start-0 translate-middle-y ps-3 border-0 shadow-none p-0"
            disabled={loading}
          >
            <Search aria-label='Search products' className={loading ? "text-primary spinner-border-sm" : "text-muted"} size={18} />
          </button>

          <input
            type="text"
            className="form-control border shadow-none ps-5 py-2 rounded-5px border-custom fs-14"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setItsOpen(true)}
          />

          {query.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3 text-muted border-0 shadow-none"
            >
              <XCircleFill size={16} />
            </button>
          )}
        </div>
      </form>

      {itsOpen && (query.length > 0) && (
        <ul id="results-list" className="list-group position-absolute w-100 mt-2 z-1050 scroll-y-300">
          {results.length > 0 ? (
            <>
              {results.map((product) => (
                <Link
                  key={product.id}
                  onClick={() => setItsOpen(false)}
                  to={`/articles/${product.id}`}
                  className='text-decoration-none'
                >
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <span className="fw-bold small">{product.name}</span>
                      <small className="fs-tiny">{product.categoryName}</small>
                    </div>
                  </li>
                </Link>
              ))}

              {totalPages > 1 && (
                <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center bg-light gap-2 p-2">
                  <button 
                    type="button" 
                    className="btn btn-sm btn-dark-custom px-3 py-1 flex-grow-1 flex-sm-grow-0"
                    disabled={currentPage === 0 || loading}
                    onClick={() => handleSearch(currentPage - 1)}
                  >
                    Prev
                  </button>
                  <span className="text-muted small fw-bold text-center flex-grow-1 flex-sm-grow-0">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-dark-custom px-3 py-1 flex-grow-1 flex-sm-grow-0"
                    disabled={currentPage >= totalPages - 1 || loading}
                    onClick={() => handleSearch(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              )}
            </>
          ) : !loading && (
            <li className="list-group-item text-muted small text-center">No products found</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default ProductSearch