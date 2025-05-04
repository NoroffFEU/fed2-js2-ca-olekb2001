// src/js/api/post/update.js
import { getToken, getApiKey } from "../../utilities/storage.js";
const BASE = "https://v2.api.noroff.dev/social";

/**
 * Update an existing post
 * @param {string} id
 * @param {{title:string,body:string,media:{url:string,alt:string}}} data
 */
export async function updatePost(id, data) {
  const token  = getToken();
  const apiKey = getApiKey();
  const res = await fetch(`${BASE}/posts/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type":    "application/json",
      Authorization:      `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Update failed (${res.status})`);
  return json.data;
}
