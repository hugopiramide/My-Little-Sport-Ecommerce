import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { PAYMENT_CONFIG } from '../../shared/config'
import { useShoppingCart } from '../../shopping-cart/hooks/useShoppingCart'
import { getCurrentUserId, getAuthHeaders, getCurrentUser } from '../../auth/utils/authUtils'
import { OrderService } from '../services/OrderService'
import { PaymentService } from '../services/PaymentService'
import type { ShippingAddressDTO } from '../../shared/types'
import "../../../index.css"

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(amount)
}

interface ShippingAddress extends ShippingAddressDTO {
  id?: number
}

const emptyAddress = (): Omit<ShippingAddress, 'id'> => ({
  addressName: '',
  recipientName: '',
  companyName: '',
  street: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  countryCode: 'ES',
  phoneNumber: '',
  deliveryInstructions: '',
})

const CheckoutForm: React.FC = () => {
  const userId = getCurrentUserId()
  const navigate = useNavigate()

  const { cart, loading: cartLoading } = useShoppingCart(userId || 0)

  const [step, setStep] = useState<'address' | 'payment'>('address')
  const [addresses, setAddresses] = useState<ShippingAddress[]>([])
  const [addressLoading, setAddressLoading] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newAddress, setNewAddress] = useState<Omit<ShippingAddress, 'id'>>(emptyAddress())
  const [saveToProfile, setSaveToProfile] = useState(true)
  const [addressError, setAddressError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  useEffect(() => {
    if (userId) {
      fetchAddresses()
    }
  }, [userId])

  const fetchAddresses = async () => {
    try {
      setAddressLoading(true);
      const res = await fetch(`http://localhost:8080/api/shipping-addresses/user/${userId}`, {
        headers: getAuthHeaders(),
      })
      if (res.ok) {
        const data = await res.json()
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddress(data[0])
        } else {
          setIsAddingNew(true)
        }
      }
    } catch (err) {
      console.error('Error fetching addresses:', err)
    } finally {
      setAddressLoading(false)
    }
  }

  const calculateTotal = () => {
    if (!cart?.cartItems) return 0.00;
    return cart.cartItems.reduce((total, item) => {
      const productPrice = item.productVariantId?.product?.basePrice || 0.00
      const priceModifier = item.productVariantId?.priceModifier || 0.00
      return total + (productPrice + priceModifier) * item.quantity
    }, 0);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault()
    if (isAddingNew) {
      if (!newAddress.recipientName || !newAddress.street || !newAddress.city || !newAddress.postalCode || !newAddress.countryCode || !newAddress.phoneNumber) {
        setAddressError('Please fill in all required fields.')
        return
      }

      let activeAddress: ShippingAddress = { ...newAddress }

      if (saveToProfile) {
        try {
          const res = await fetch('http://localhost:8080/api/shipping-addresses', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ ...newAddress, userId }),
          })
          if (res.ok) {
            const savedAddress = await res.json();
            setAddresses((prev) => [...prev, savedAddress]);
            activeAddress = savedAddress;
          }
        } catch (err) {
          console.error('Error saving address:', err)
        }
      }

      setSelectedAddress(activeAddress)
      setIsAddingNew(false)
    }

    setStep('payment')
    setAddressError(null)
    setPaymentError(null)
  }

  const clearUserCart = async () => {
    if (!cart?.cartItems) return
    for (const item of cart.cartItems) {
      try {
        await fetch(`http://localhost:8080/api/cart-items/${item.id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        })
      } catch (err) {
        console.error(`Error removing item ${item.id}:`, err)
      }
    }
  }

  const createOrderItems = async (orderId: number) => {
    if (!cart?.cartItems) return
    for (const item of cart.cartItems) {
      const priceAtPurchase = (item.productVariantId.product.basePrice || 0) + (item.productVariantId.priceModifier || 0)
      try {
        await fetch('http://localhost:8080/api/order-items', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            order_id: orderId,
            product_variant_id: item.productVariantId.id,
            quantity: item.quantity,
            price_at_purchase: priceAtPurchase,
          }),
        })
      } catch (err) {
        console.error('Error creating order item:', err)
      }
    }
  }

  const handleStripeCheckout = async () => {
    if (!selectedAddress || !cart) return

    setIsProcessing(true)
    setPaymentError(null)

    const total = calculateTotal()
    let orderId: number | null = null

    try {
      const order = await OrderService.createOrder({
        user_id: userId || 0,
        status: 'PENDING',
        total_price: total,
        shippingAddress: {
          addressName: selectedAddress.addressName || 'Primary Address',
          recipientName: selectedAddress.recipientName,
          companyName: selectedAddress.companyName || '',
          street: selectedAddress.street,
          addressLine2: selectedAddress.addressLine2 || '',
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.postalCode,
          countryCode: selectedAddress.countryCode,
          phoneNumber: selectedAddress.phoneNumber,
          deliveryInstructions: selectedAddress.deliveryInstructions || '',
        },
      })

      orderId = order.id

      await createOrderItems(order.id)

      const { checkoutUrl } = await PaymentService.createStripeCheckoutSession({
        amount: total,
        currency: 'EUR',
        description: `Order #${order.id} for ${getCurrentUser()?.username || 'guest'}`,
        orderId: order.id,
        successUrl: `${window.location.origin}/order-success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/checkout`,
        items: cart.cartItems.map((item) => {
          const product = item.productVariantId.product;
          const variant = item.productVariantId;
          const price = (product.basePrice || 0) + (variant.priceModifier || 0);
          return {
            name: product.name,
            description: `${variant.size || ''}`,
            unitAmount: Math.round(price * 100),
            quantity: item.quantity,
            imageUrl: product.imageUrl || undefined,
          }
        }),
      })

      if (!checkoutUrl) {
        throw new Error('Stripe checkout URL was not returned by the backend.')
      }

      window.location.href = checkoutUrl
    } catch (err: any) {
      console.error('Stripe checkout flow failed:', err);
      setPaymentError(err.message || 'An unexpected error occurred during Stripe checkout.')

      if (orderId) {
        try {
          await fetch(`http://localhost:8080/api/orders/${orderId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
              user_id: userId || 0,
              status: 'CANCELLED',
              total_price: total,
              shippingAddress: selectedAddress,
            }),
          })
        } catch (cancelErr) {
          console.error('Failed to mark order as cancelled:', cancelErr)
        }
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const renderSummaryItems = () => {
    if (!cart?.cartItems) return null
    return cart.cartItems.map((item) => {
      const product = item.productVariantId.product
      const variant = item.productVariantId
      const price = (product.basePrice || 0) + (variant.priceModifier || 0)

      return (
        <div key={item.id} className="d-flex align-items-center gap-3 py-3 border-bottom">
          <div className="bg-secondary-custom rounded-5px overflow-hidden aspect-square" style={{ width: '64px', height: '64px' }}>
            <img src={product.imageUrl} alt={product.name} className="w-100 h-100 object-fit-cover" />
          </div>
          <div className="flex-grow-1">
            <h5 className="mb-0 text-uppercase fw-bold text-truncate" style={{ maxWidth: '180px' }}>{product.name}</h5>
            <p className="mb-0 text-muted small">Size: {variant.size} • Qty: {item.quantity}</p>
          </div>
          <span className="fw-bold">{formatPrice(price * item.quantity)}</span>
        </div>
      )
    })
  }

  if (cartLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-dark" role="status"></div>
      </div>
    )
  }

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <h2 className="fw-black text-uppercase mb-3">YOUR BAG IS EMPTY</h2>
        <p className="text-secondary mb-4">Please add products to your bag before checking out.</p>
        <Link to="/articles" className="btn-dark-custom px-5">CONTINUE SHOPPING</Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-vh-100 py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            {step === 'address' ? (
              <div>
                <h2 className="fw-black text-uppercase mb-4">SHIPPING ADDRESS</h2>

                {addressError && <div className="alert alert-danger rounded-5px fw-bold p-3 mb-4">{addressError}</div>}

                {addressLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-dark" role="status"></div>
                  </div>
                ) : (
                  <>
                    {addresses.length > 0 && !isAddingNew && (
                      <div className="mb-4">
                        <p className="fw-bold mb-3 text-uppercase small text-muted">Select a saved address:</p>
                        <div className="row g-3">
                          {addresses.map((addr) => (
                            <div key={addr.id} className="col-md-6">
                              <div
                                onClick={() => setSelectedAddress(addr)}
                                className={`card p-3 h-100 cursor-pointer transition-all border-2 ${
                                  selectedAddress?.id === addr.id ? 'border-dark bg-secondary-custom shadow-sm' : 'border-light'
                                }`}
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="d-flex justify-content-between align-items-start">
                                  <h5 className="fw-bold text-uppercase mb-1">{addr.addressName || 'Address'}</h5>
                                  {selectedAddress?.id === addr.id && <span className="badge bg-dark rounded-pill">Selected</span>}
                                </div>
                                <p className="mb-0 fw-bold small mt-1">{addr.recipientName}</p>
                                <p className="mb-0 text-muted small">{addr.street}</p>
                                {addr.addressLine2 && <p className="mb-0 text-muted small">{addr.addressLine2}</p>}
                                <p className="mb-0 text-muted small">
                                  {addr.city}, {addr.state} {addr.postalCode}
                                </p>
                                <p className="mb-0 text-muted small">{addr.countryCode}</p>
                                <p className="mb-0 text-muted small mt-2">{addr.phoneNumber}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingNew(true);
                              setSelectedAddress(null);
                            }}
                            className="btn btn-outline-dark rounded-5px w-100 py-3 text-uppercase fw-bold"
                          >
                            + Use a new shipping address
                          </button>
                        </div>
                      </div>
                    )}

                    {(isAddingNew || addresses.length === 0) && (
                      <form onSubmit={handleAddressSubmit} className="row g-3">
                        {addresses.length > 0 && (
                          <div className="col-12 mb-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingNew(false);
                                if (addresses.length > 0) setSelectedAddress(addresses[0]);
                              }}
                              className="btn btn-link text-dark p-0 text-decoration-underline fw-bold small text-uppercase"
                            >
                              ← Back to saved addresses
                            </button>
                          </div>
                        )}

                        <div className="col-12">
                          <label className="form-label fw-bold text-uppercase small">Address Identifier (e.g. Home, Work) *</label>
                          <input
                            type="text"
                            name="addressName"
                            value={newAddress.addressName}
                            onChange={handleInputChange}
                            required
                            placeholder="Home"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold text-uppercase small">Recipient Name *</label>
                          <input
                            type="text"
                            name="recipientName"
                            value={newAddress.recipientName}
                            onChange={handleInputChange}
                            required
                            placeholder="John Doe"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold text-uppercase small">Company (Optional)</label>
                          <input
                            type="text"
                            name="companyName"
                            value={newAddress.companyName}
                            onChange={handleInputChange}
                            placeholder="Acme Corp"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-bold text-uppercase small">Street Address *</label>
                          <input
                            type="text"
                            name="street"
                            value={newAddress.street}
                            onChange={handleInputChange}
                            required
                            placeholder="123 Main St"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-bold text-uppercase small">Apartment, suite, unit, etc. (Optional)</label>
                          <input
                            type="text"
                            name="addressLine2"
                            value={newAddress.addressLine2}
                            onChange={handleInputChange}
                            placeholder="Apt 4B"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold text-uppercase small">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={newAddress.city}
                            onChange={handleInputChange}
                            required
                            placeholder="Madrid"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label fw-bold text-uppercase small">State/Province</label>
                          <input
                            type="text"
                            name="state"
                            value={newAddress.state}
                            onChange={handleInputChange}
                            placeholder="Madrid"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label fw-bold text-uppercase small">Postal Code *</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={newAddress.postalCode}
                            onChange={handleInputChange}
                            required
                            placeholder="28001"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold text-uppercase small">Country Code (2 Letters) *</label>
                          <input
                            type="text"
                            name="countryCode"
                            value={newAddress.countryCode}
                            onChange={handleInputChange}
                            required
                            maxLength={2}
                            placeholder="ES"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold text-uppercase small">Phone Number *</label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={newAddress.phoneNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="+34 600 000 000"
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-bold text-uppercase small">Delivery Instructions (Optional)</label>
                          <textarea
                            name="deliveryInstructions"
                            value={newAddress.deliveryInstructions}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Leave with concierge..."
                            className="form-control form-control-custom"
                          />
                        </div>

                        <div className="col-12">
                          <div className="form-check form-switch mt-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="saveAddressSwitch"
                              checked={saveToProfile}
                              onChange={(e) => setSaveToProfile(e.target.checked)}
                            />
                            <label className="form-check-label fw-bold text-uppercase small" htmlFor="saveAddressSwitch">
                              Save this address to my profile
                            </label>
                          </div>
                        </div>
                      </form>
                    )}

                    <div className="mt-5 d-flex justify-content-between">
                      <Link to="/cart" className="btn-custom py-3 px-4">
                        ← RETURN TO BAG
                      </Link>
                      <button
                        type="button"
                        onClick={handleAddressSubmit}
                        disabled={!isAddingNew && !selectedAddress}
                        className="btn-dark-custom py-3 px-5 fw-bold"
                      >
                        CONTINUE TO PAYMENT →
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                <h2 className="fw-black text-uppercase mb-4">PAYMENT</h2>

                {selectedAddress && (
                  <div className="card p-4 mb-5 border-2 bg-secondary-custom">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="fw-black text-uppercase mb-0">DELIVER TO:</h4>
                      <button
                        type="button"
                        onClick={() => setStep('address')}
                        className="btn btn-link text-dark p-0 text-decoration-underline fw-bold small text-uppercase"
                      >
                        Change Address
                      </button>
                    </div>
                    <p className="mb-0 fw-bold">{selectedAddress.recipientName}</p>
                    <p className="mb-0 text-muted small">{selectedAddress.street}</p>
                    {selectedAddress.addressLine2 && <p className="mb-0 text-muted small">{selectedAddress.addressLine2}</p>}
                    <p className="mb-0 text-muted small">
                      {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                    </p>
                    <p className="mb-0 text-muted small">{selectedAddress.countryCode}</p>
                    <p className="mb-0 text-muted small mt-2">{selectedAddress.phoneNumber}</p>
                  </div>
                )}

                {paymentError && <div className="alert alert-danger rounded-5px fw-bold p-3 mb-4">{paymentError}</div>}

                <p className="fw-bold mb-3 text-uppercase small text-muted">Select Payment Method:</p>
                <div className="g-3 mb-5">
                    <button
                      type="button"
                      onClick={handleStripeCheckout}
                      disabled={isProcessing}
                      className="btn-dark-custom w-100 mb-3 py-3 d-flex align-items-center justify-content-center text-uppercase"
                    >
                      {isProcessing ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : (
                        `PAY ${formatPrice(calculateTotal())}`
                      )}
                    </button>

                      <PayPalButtons
                        fundingSource="paypal"
                        disabled={isProcessing}
                        createOrder={async () => {
                          setIsProcessing(true)
                          setPaymentError(null)
                          const total = calculateTotal()
                          try {
                            const order = await OrderService.createOrder({
                              user_id: userId || 0,
                              status: 'PENDING',
                              total_price: total,
                              shippingAddress: {
                                addressName: selectedAddress?.addressName || 'Primary Address',
                                recipientName: selectedAddress?.recipientName || '',
                                companyName: selectedAddress?.companyName || '',
                                street: selectedAddress?.street || '',
                                addressLine2: selectedAddress?.addressLine2 || '',
                                city: selectedAddress?.city || '',
                                state: selectedAddress?.state || '',
                                postalCode: selectedAddress?.postalCode || '',
                                countryCode: selectedAddress?.countryCode || 'ES',
                                phoneNumber: selectedAddress?.phoneNumber || '',
                                deliveryInstructions: selectedAddress?.deliveryInstructions || '',
                              },
                            })

                            await createOrderItems(order.id)

                            sessionStorage.setItem('temp_paypal_order_id', order.id.toString())

                            const paypalOrder = await PaymentService.createPayPalOrder({
                              amount: total,
                              currency: 'EUR',
                              description: `Order #${order.id} for user ${userId}`,
                              orderId: order.id,
                            })

                            return paypalOrder.orderId
                          } catch (err: any) {
                            console.error('PayPal create order failed:', err)
                            setPaymentError(err.message || 'Failed to create PayPal order.')
                            setIsProcessing(false)
                            throw err
                          }
                        }}
                        onApprove={async (data) => {
                          const orderIdStr = sessionStorage.getItem('temp_paypal_order_id')
                          if (!orderIdStr) {
                            setPaymentError('Unable to trace local order reference.')
                            setIsProcessing(false)
                            return
                          }
                          const localOrderId = parseInt(orderIdStr, 10)

                          try {
                            const result = await PaymentService.capturePayPalOrder(data.orderID)

                            if (result.status === 'COMPLETED') {
                              await fetch(`http://localhost:8080/api/orders/${localOrderId}`, {
                                method: 'PUT',
                                headers: getAuthHeaders(),
                                body: JSON.stringify({
                                  user_id: userId || 0,
                                  status: 'SENDING',
                                  total_price: calculateTotal(),
                                  shippingAddress: selectedAddress,
                                }),
                              })

                              await clearUserCart()

                              sessionStorage.removeItem('temp_paypal_order_id')

                              navigate(`/order-success?orderId=${localOrderId}`)
                            } else {
                              throw new Error('PayPal payment was not captured successfully.')
                            }
                          } catch (err: any) {
                            console.error('PayPal capture order failed:', err)
                            setPaymentError(err.message || 'Failed to complete PayPal capture.')

                            try {
                              await fetch(`http://localhost:8080/api/orders/${localOrderId}`, {
                                method: 'PUT',
                                headers: getAuthHeaders(),
                                body: JSON.stringify({
                                  user_id: userId || 0,
                                  status: 'CANCELLED',
                                  total_price: calculateTotal(),
                                  shippingAddress: selectedAddress,
                                }),
                              })
                            } catch (cancelErr) {
                              console.error('Failed to cancel PayPal order on backend:', cancelErr)
                            }
                          } finally {
                            setIsProcessing(false)
                          }
                        }}
                        onError={(err) => {
                          console.error('PayPal Error:', err)
                          setPaymentError('An error occurred with PayPal. Please try again.')
                          setIsProcessing(false)
                        }}
                        onCancel={async () => {
                          const orderIdStr = sessionStorage.getItem('temp_paypal_order_id')
                          if (orderIdStr) {
                            const localOrderId = parseInt(orderIdStr, 10)
                            try {
                              await fetch(`http://localhost:8080/api/orders/${localOrderId}`, {
                                method: 'PUT',
                                headers: getAuthHeaders(),
                                body: JSON.stringify({
                                  user_id: userId || 0,
                                  status: 'CANCELLED',
                                  total_price: calculateTotal(),
                                  shippingAddress: selectedAddress,
                                }),
                              })
                            } catch (cancelErr) {
                              console.error('Failed to cancel order after PayPal cancellation:', cancelErr)
                            }
                            sessionStorage.removeItem('temp_paypal_order_id')
                          }
                          setPaymentError('PayPal payment was cancelled.')
                          setIsProcessing(false)
                        }}
                      />
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    disabled={isProcessing}
                    className="btn btn-outline-dark py-3 px-4 rounded-5px fw-bold text-uppercase"
                  >
                    ← BACK TO ADDRESS
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="z-1 col-lg-5">
            <div className="card p-4 sticky-top border-2" style={{ top: '120px' }}>
              <h3 className="fw-black text-uppercase border-bottom pb-3 mb-0">ORDER SUMMARY</h3>

              <div className="overflow-auto mb-4" style={{ maxHeight: '350px' }}>
                {renderSummaryItems()}
              </div>

              <div className="d-flex justify-content-between mb-3 mt-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">{formatPrice(calculateTotal())}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span className="text-success fw-bold">Free</span>
              </div>

              <hr className="my-3 opacity-10" />

              <div className="d-flex justify-content-between mb-2">
                <span className="fw-black h4 text-uppercase mb-0">TOTAL</span>
                <span className="fw-black h4 mb-0">{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Checkout: React.FC = () => {
  return (
    <PayPalScriptProvider options={{ clientId: PAYMENT_CONFIG.paypalClientId, currency: 'EUR' }}>
      <CheckoutForm />
    </PayPalScriptProvider>
  )
}

export default Checkout
