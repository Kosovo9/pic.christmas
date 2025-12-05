// Payment Service for pic.christmas
// Handles Stripe checkout integration

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface CheckoutData {
  amount: number;
  currency?: string;
  subjects: {
    adults: number;
    kids: number;
    dogs: number;
    cats: number;
    others: number;
  };
}

export async function createCheckoutSession(data: CheckoutData): Promise<{ url: string; sessionId: string }> {
  const response = await fetch(`${API_URL}/api/create-checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
}

export async function uploadPhoto(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload photo');
  }

  return response.json();
}
