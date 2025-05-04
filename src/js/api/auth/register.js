// src/js/api/auth/register.js
const BASE = "https://v2.api.noroff.dev/auth";

/**
 * Create a new user profile.
 * @param {{ name: string, email: string, password: string }} payload
 * @returns {Promise<object>} 
 */
export async function registerUser({ name, email, password }) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Register failed (${res.status})`);
  }
  return res.json();  
}
