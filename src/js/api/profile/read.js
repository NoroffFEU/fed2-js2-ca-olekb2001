// src/js/api/profile/read.js

import { getToken, getApiKey } from "../../utilities/storage.js";
const BASE = "https://v2.api.noroff.dev/social";

/**
 * Read a profile, including followers & following lists.
 * @param {string} username
 * @returns {Promise<object>} 
 */
export async function readProfile(username) {
  const token  = getToken();
  const apiKey = getApiKey();

  // ask the API to include full follower & following arrays
  const params = new URLSearchParams({
    _followers: true,
    _following: true,
    _posts:     false
  });

  const res = await fetch(
    `${BASE}/profiles/${encodeURIComponent(username)}?${params}`,
    {
      headers: {
        Authorization:      `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      }
    }
  );

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Error ${res.status}`);
  return json.data;
}
