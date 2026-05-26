import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { OrderService } from '../services/OrderService'
import type { OrderResponseDTO, OrderStatus } from '../types'

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING:   'Pending',
  SENDING:   'Sending',
  DELIVERED: 'Delivered',
  CANCELED:  'Canceled',
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(n)

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()

  const [order, setOrder] = useState<OrderResponseDTO | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) return
    OrderService.getOrderDetails(Number(orderId))
      .then(setOrder)
      .catch(() => setError('Could not load order details.'))
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-dark" role="status"></div>
    </div>
  )

  if (error || !order) return (
    <div className="container py-5 text-center">
      <h2 className="fw-black text-uppercase mb-3">Order not found</h2>
      <p className="text-muted mb-4">{error ?? 'This order does not exist or could not be loaded.'}</p>
      <Link to="/order-history" className="btn-dark-custom px-5">Back to Orders</Link>
    </div>
  )

  const subtotal = order.items?.reduce((sum, item) => sum + item.basePrice * item.quantity, 0) ?? 0

  return (
    <div className="bg-white min-vh-100">
      <div className="container py-5 mt-2">

        <div className="profile-page__header mb-5 pb-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h1 className="fw-black text-uppercase tracking-tighter mb-0">Order #{order.id}</h1>
            <p className="text-muted small mb-0 mt-1">{formatDate(order.order_date)}</p>
          </div>
          <span
            className="px-4 py-2 text-muted text-uppercase"
          >
            {STATUS_LABELS[order.status] ?? order.status}
          </span>
        </div>

        <div className="row g-5">

          <div className="col-lg-8">
            <h4 className="fw-bold text-uppercase mb-4">
              Ordered items
            </h4>

            <div className="d-flex flex-column">
              {order.items && order.items.length > 0 ? order.items.map(item => (
                <article key={item.id} className="row py-4 border-bottom g-0">
                  <div className="col-4 col-md-3">
                    <Link to={`/articles/${item.productVariantId}`}>
                      <div className="bg-secondary-custom overflow-hidden aspect-square rounded-5px">
                        <img
                          src={item.productImageUrl}
                          alt={item.productName}
                          className="w-100 h-100 object-fit-cover hover-zoom"
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="col-8 col-md-9 ps-3 ps-md-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Link to={`/articles/${item.productVariantId}`} className="text-decoration-none text-dark">
                          <h3 className="fw-bold mb-1 text-uppercase product-title-hover">{item.productName}</h3>
                        </Link>
                        <p className="text-info-custom mb-2 mt-2">Size: {item.productSize}</p>
                        <p className="text-muted mb-1 small">Qty: {item.quantity}</p>
                      </div>
                      <p className="fw-bold">{formatPrice(item.basePrice * item.quantity)}</p>
                    </div>
                  </div>
                </article>
              )) : (
                <p className="text-muted py-3">No items found for this order.</p>
              )}
            </div>
          </div>

          <div className="col-lg-4">

            <div className="border rounded-3 p-4 mb-4">
              <h2 className="fw-bold text-uppercase mb-4" >
                Order Summary
              </h2>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Shipping</span>
                  <span className="fw-medium text-success">Free</span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-uppercase">Total</span>
                  <span className="fw-black fs-4">{formatPrice(order.total_price)}</span>
                </div>
              </div>
            </div>

            {order.shippingAddress && (
              <div className="border rounded-3 p-4 mb-4">
                <h2 className="fw-bold text-uppercase mb-3">
                  Shipping Address
                </h2>
                <address className="mb-0 text-muted lh-lg">
                  <strong className="text-dark d-block mb-1">{order.shippingAddress.recipientName}</strong>
                  {order.shippingAddress.companyName && (
                    <span className="d-block">{order.shippingAddress.companyName}</span>
                  )}
                  <span className="d-block">{order.shippingAddress.street}</span>
                  {order.shippingAddress.addressLine2 && (
                    <span className="d-block">{order.shippingAddress.addressLine2}</span>
                  )}
                  <span className="d-block">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </span>
                  <span className="d-block">{order.shippingAddress.countryCode}</span>
                  {order.shippingAddress.phoneNumber && (
                    <span className="d-block mt-2">{order.shippingAddress.phoneNumber}</span>
                  )}
                  {order.shippingAddress.deliveryInstructions && (
                    <div className="mt-3 p-2 bg-light rounded-2 small">
                      <span className="fw-bold text-dark d-block mb-1">Delivery notes</span>
                      {order.shippingAddress.deliveryInstructions}
                    </div>
                  )}
                </address>
              </div>
            )}

            <div className="border rounded-3 p-4">
              <h2 className="fw-bold text-uppercase mb-3">
                Customer
              </h2>
              <p className="fw-medium text-dark mb-1">{order.userName}</p>
              <p className="text-muted small mb-0">{order.userEmail}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
