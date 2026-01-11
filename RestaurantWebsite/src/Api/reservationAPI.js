// src/api/reservationAPI.js
const BASE_URL = 'http://localhost:8080/api';

export const createReservation = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json().catch(() => {
      throw new Error('Server returned a non-JSON response.');
    });

    if (!response.ok) {
      const error = new Error(data.message || 'Reservation failed.');
      error.details = data.errors || {};
      throw error;
    }

    return data;
  } catch (err) {
    console.error(`POST ${BASE_URL}/reservations failed:`, err);
    throw err;
  }
};
