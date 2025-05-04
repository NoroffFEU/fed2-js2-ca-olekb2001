// src/js/api/post/delete.js
import { getToken, getApiKey } from "../../utilities/storage.js";
const BASE = "https://v2.api.noroff.dev/social";

/**
 * Delete a post by ID.
 * @param {string} id
 */
export async function deletePost(id) {
  const token  = getToken();
  const apiKey = getApiKey();
  const res = await fetch(`${BASE}/posts/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      Authorization:      `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey
    }
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `Delete failed (${res.status})`);
  }
}
