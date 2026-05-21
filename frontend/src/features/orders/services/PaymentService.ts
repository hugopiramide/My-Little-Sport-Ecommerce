import { getAuthHeaders, authFetch } from '../../auth/utils/authUtils';

const API_URL = 'http://localhost:8080/api/payments';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  orderId: number;
}

export const PaymentService = {
  createStripePaymentIntent: async (request: PaymentRequest): Promise<{ clientSecret: string }> => {
    const response = await authFetch(`${API_URL}/stripe/create-intent`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });
    return handleResponse<{ clientSecret: string }>(response);
  },

  createPayPalOrder: async (request: PaymentRequest): Promise<{ orderId: string; approveUrl?: string }> => {
    const response = await authFetch(`${API_URL}/paypal/create-order`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });
    return handleResponse<{ orderId: string; approveUrl?: string }>(response);
  },

  capturePayPalOrder: async (orderId: string): Promise<{ status: string }> => {
    const response = await authFetch(`${API_URL}/paypal/capture-order/${orderId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse<{ status: string }>(response);
  },
};
