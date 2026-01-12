// src/api/reservationAPI.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createReservation = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Reservation failed");
      error.details = data.errors || {};
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Reservation API error:", err);
    throw err;
  }
};
