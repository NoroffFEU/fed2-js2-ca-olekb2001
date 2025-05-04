// src/js/api/profile/update.js

import { getToken, getApiKey } from "../../utilities/storage.js";
const BASE = "https://v2.api.noroff.dev/social";

/**
 * Update a user’s profile.
 * @param {string} username
 * @param {{ name: string, bio?: string, avatar?: { url: string }, banner?: { url: string } }} data 
 * @returns {Promise<object>} the updated profile
 */
export async function updateProfile(username, data) {
  const token  = getToken();
  const apiKey = getApiKey();

  const res = await fetch(
    `${BASE}/profiles/${encodeURIComponent(username)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":    "application/json",
        Authorization:      `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      },
      body: JSON.stringify(data)
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Error ${res.status}`);
  return json.data;
}
