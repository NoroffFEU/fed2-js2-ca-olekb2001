// src/js/api/auth/login.js
const BASE = "https://v2.api.noroff.dev/auth";

/**
 * Exchange email+password for aa JwT.
 * @param {{ email: string, password: string }} creds
 * @returns {Promise<{ accessToken: string }>}
 */
export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || `Login failed (${res.status})`);
  }
  
  return json.data; 
}
