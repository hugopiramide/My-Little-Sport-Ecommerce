import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { OrderService } from '../services/OrderService';
import { getAuthHeaders, getCurrentUserId } from '../../auth/utils/authUtils';
import type { OrderResponseDTO, OrderItemResponseDTO } from '../types';
import { CheckCircleFill } from 'react-bootstrap-icons';

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(amount);
};

export const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get('orderId');
  const orderId = orderIdParam ? parseInt(orderIdParam, 10) : null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponseDTO | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItemResponseDTO[]>([]);

  const clearCart = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;
    try {
      await fetch(`http://localhost:8080/api/carts/user/${userId}/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error('Error clearing cart on order success:', err);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
      clearCart();
    } else {
      setError('Invalid or missing order reference.');
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!orderId) return

      const orderData = await OrderService.getOrderDetails(orderId)
      setOrder(orderData)

      const itemsRes = await fetch('http://localhost:8080/api/order-items/all', {
        headers: getAuthHeaders(),
      });

      if (itemsRes.ok) {
        const allItems: OrderItemResponseDTO[] = await itemsRes.json();
        const filteredItems = allItems.filter((item) => item.orderId === orderId);
        setOrderItems(filteredItems);
      }
    } catch (err: any) {
      console.error('Error fetching order details:', err);
      setError(err.message || 'Could not retrieve your order details.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div className="spinner-border text-dark" role="status"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center bg-white">
        <h2 className="fw-black text-uppercase mb-3">ORDER DETAILS ERROR</h2>
        <p className="text-secondary mb-4">{error || 'Unable to locate your order.'}</p>
        <Link to="/articles" className="btn-dark-custom px-5">CONTINUE SHOPPING</Link>
      </div>
    )
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card p-4 p-md-5 border-0 shadow-sm rounded-5px bg-white text-center mb-4">
          <div className="text-success mb-3">
            <CheckCircleFill size={72} />
          </div>
          <h1 className="fw-black text-uppercase mb-2" style={{ fontSize: '32px' }}>
            THANK YOU FOR YOUR PURCHASE!
          </h1>
          <p className="text-secondary mb-4">
            Order <strong className="text-dark">#{order.id}</strong> has been placed successfully and is now{' '}
            <span className="px-2.5 py-1 text-uppercase fw-bold text-success">{order.status}</span>.
          </p>
          <p className="text-muted small">
            We have sent a verification and confirmation email to <strong className="text-dark">{order.userEmail}</strong>.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
            <Link to="/articles" className="btn-dark-custom py-3 px-4 fw-bold">
              CONTINUE SHOPPING
            </Link>
            <Link to="/order-history" className="btn-custom py-3 px-4 fw-bold">
              VIEW MY ORDERS
            </Link>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-7">
            <div className="card p-4 border-0 shadow-sm rounded-5px bg-white h-100">
              <h4 className="fw-black text-uppercase border-bottom pb-3 mb-3">ITEMS ORDERED</h4>
              <div className="d-flex flex-column gap-3">
                {orderItems.map((item) => {
                  const finalPrice = (item.basePrice || 0) + (item.priceModifier || 0);
                  return (
                    <div key={item.id} className="d-flex align-items-center gap-3 py-1">
                      <div className="bg-secondary-custom rounded-5px overflow-hidden aspect-square" style={{ width: '56px', height: '56px' }}>
                        <img src={item.productImageUrl} alt={item.productName} className="w-100 h-100 object-fit-cover" />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="mb-0 text-uppercase fw-bold text-truncate" style={{ maxWidth: '220px' }}>
                          {item.productName}
                        </h5>
                        <p className="mb-0 text-muted small">
                          Size: {item.productSize} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="fw-bold">{formatPrice(finalPrice * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>

              <hr className="my-4 opacity-10" />

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">{formatPrice(order.total_price)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span className="text-success fw-bold">Free</span>
              </div>
              <div className="d-flex justify-content-between mb-0 mt-2 pt-2 border-top">
                <span className="fw-black text-uppercase">Total Paid</span>
                <span className="fw-black h4 mb-0">{formatPrice(order.total_price)}</span>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card p-4 border-0 shadow-sm rounded-5px bg-white h-100">
              <h4 className="fw-black text-uppercase border-bottom pb-3 mb-3">SHIPPING ADDRESS</h4>
              <p className="mb-0 fw-bold">{order.shippingAddress.recipientName}</p>
              {order.shippingAddress.companyName && <p className="mb-0 text-muted small">{order.shippingAddress.companyName}</p>}
              <p className="mb-0 text-muted small mt-1">{order.shippingAddress.street}</p>
              {order.shippingAddress.addressLine2 && <p className="mb-0 text-muted small">{order.shippingAddress.addressLine2}</p>}
              <p className="mb-0 text-muted small">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p className="mb-0 text-muted small">{order.shippingAddress.countryCode}</p>
              <p className="mb-0 text-muted small mt-3 fw-bold">{order.shippingAddress.phoneNumber}</p>

              {order.shippingAddress.deliveryInstructions && (
                <div className="mt-4 p-2 bg-light rounded-5px">
                  <p className="mb-0 text-muted small fw-bold text-uppercase">Instructions:</p>
                  <p className="mb-0 text-muted small italic">"{order.shippingAddress.deliveryInstructions}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess;
