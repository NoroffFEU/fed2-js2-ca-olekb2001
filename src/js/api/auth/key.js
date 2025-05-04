// src/js/api/auth/key.js
import { getToken } from "../../utilities/storage.js";

const BASE = "https://v2.api.noroff.dev/auth";

/**
 * Create (or retrieve) a Noroff Social API key.
 * @returns {Promise<string>}
 */
export async function createApiKey() {
  const token = getToken();
  const res = await fetch(`${BASE}/create-api-key`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || `API key error (${res.status})`);
  }
  
  return json.data.key;
}
