import React, { useEffect, useState } from 'react';
import { OrderService } from '../services/OrderService';
import type { OrderResponseDTO, OrderStatus } from '../types';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../../auth/utils/authUtils';

const ALL_STATUSES: OrderStatus[] = ['PENDING', 'SENDING', 'DELIVERED', 'CANCELED']

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING:   'Pending',
  SENDING:   'Shipping',
  DELIVERED: 'Delivered',
  CANCELED:  'Cancelled',
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [sortOrder, setSortOrder]       = useState<'newest' | 'oldest'>('newest')
  const [searchQuery, setSearchQuery]   = useState('')

  const userId = getCurrentUserId()

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    OrderService.getOrdersByUser(userId)
      .then(setOrders)
      .catch(() => setError('Could not load your orders.'))
      .finally(() => setLoading(false))
  }, [userId])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(amount)

  const filteredOrders = orders
    .filter(o => statusFilter === 'ALL' || o.status === statusFilter)
    .filter(o => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      if (String(o.id).includes(q)) return true
      return o.items?.some(item => item.productName?.toLowerCase().includes(q))
    })
    .sort((a, b) => {
      const da = new Date(a.order_date).getTime()
      const db = new Date(b.order_date).getTime()
      return sortOrder === 'newest' ? db - da : da - db
    })

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-dark" role="status"></div>
    </div>
  )

  if (!userId) return (
    <div className="container py-5 text-center">
      <h2 className="fw-black text-uppercase">Log in to view your orders</h2>
      <Link to="/login" className="btn btn-dark rounded-pill mt-4 px-5 py-2 fw-bold">LOG IN</Link>
    </div>
  )

  return (
    <section className="bg-white min-vh-100">
      <div className="container py-5 mt-2">

        <div className="profile-page__header mb-5 pb-4 border-bottom">
          <h1 className="fw-black text-uppercase tracking-tighter mb-0">My Orders</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-3 mb-5 align-items-center">

          <div className="col-12 col-md-5 col-lg-4">
            <div className="input-group border border-custom rounded-5px">
              <span className="input-group-text bg-white border-0 ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-muted">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                </svg>
              </span>
              <input
                type="text"
                className="form-control border-0 py-2 shadow-none"
                placeholder="Search by order ID or product…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-link text-muted border-0 shadow-none pe-3"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              aria-label="Filter by status"
              className="form-select form-select-custom shadow-none"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
            >
              <option value="ALL">All Statuses</option>
              {ALL_STATUSES.map(s => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              aria-label="Sort orders"
              className="form-select form-select-custom shadow-none"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as 'newest' | 'oldest')}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="col-auto ms-auto d-none d-md-flex align-items-center">
            <span className="text-muted small">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <section className="text-center py-5 border rounded bg-light">
            {orders.length === 0
              ? <><p className="fs-5 text-secondary mb-3">You haven't placed any orders yet.</p>
                  <Link to="/articles" className="btn-dark-custom px-5">GO TO SHOP</Link></>
              : <p className="fs-5 text-secondary mb-0">No orders match your filters.</p>
            }
          </section>
        ) : (
          <div className="d-flex flex-column gap-4">
            {filteredOrders.map(order => {
              return (
                <article key={order.id} className="card border-0 shadow-sm overflow-hidden rounded-3">
                  <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                    <div>
                      <span className="small text-uppercase">Order #</span>
                      <span className="fw-bold ms-1">{order.id}</span>
                    </div>
                    <span
                      className="badge px-3 py-2 text-uppercase"
                    >
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </div>

                  <section className="card-body p-4">
                    <div className="row">
                      <section className="col-md-4 mb-3 mb-md-0">
                        <p className="text-secondary small text-uppercase fw-bold mb-1">Date</p>
                        <p className="mb-0">{formatDate(order.order_date)}</p>
                      </section>
                      <div className="col-md-4 mb-3 mb-md-0">
                        <p className="text-secondary small text-uppercase fw-bold mb-1">Ship to</p>
                        <p className="mb-0">{order.shippingAddress?.recipientName}</p>
                        <p className="small text-muted mb-0">
                          {order.shippingAddress?.city}, {order.shippingAddress?.countryCode}
                        </p>
                      </div>
                      <section className="col-md-4 text-md-end">
                        <p className="text-secondary small text-uppercase fw-bold mb-1">Total</p>
                        <p className="fs-4 fw-bold mb-0">{formatPrice(order.total_price)}</p>
                      </section>
                    </div>

                    {order.items && order.items.length > 0 && (
                      <div className="mt-4 pt-3 border-top d-flex gap-2 flex-wrap">
                        {order.items.map(item => (
                          <div key={item.id} className="d-flex align-items-center gap-2 bg-light rounded-3 px-3 py-2" style={{ fontSize: '0.82rem' }}>
                            {item.productImageUrl && (
                              <img
                                src={item.productImageUrl}
                                alt={item.productName}
                                style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }}
                              />
                            )}
                            <span className="fw-medium text-dark">{item.productName}</span>
                            <span className="text-muted">×{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-top d-flex justify-content-end">
                      <Link to={`/order-history/${order.id}`} className="btn-dark-custom d-inline-block text-uppercase">
                        View Details
                      </Link>
                    </div>
                  </section>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default OrderHistory;
