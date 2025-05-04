// src/js/api/post/create.js
import { getToken, getApiKey } from "../../utilities/storage.js";
const BASE = "https://v2.api.noroff.dev/social";

/**
 * Create a new post.
 * @param {{title:string,body:string,media:{url:string,alt:string}}} data
 */
export async function createPost(data) {
  const token  = getToken();
  const apiKey = getApiKey();
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type":    "application/json",
      Authorization:      `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey
    },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Error ${res.status}`);
  return json.data;
}
