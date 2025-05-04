// src/js/api/post/read.js

import { getToken, getApiKey } from "../../utilities/storage.js";
const BASE = "https://v2.api.noroff.dev/social";

/**
 * Get a single post by ID
 * @param {string} id
 * @returns {Promise<object>} 
 */
export async function readPost(id) {
  const token  = getToken();
  const apiKey = getApiKey();
  const params = new URLSearchParams({ _author: true });

  const res = await fetch(
    `${BASE}/posts/${encodeURIComponent(id)}?${params}`,
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

/**
 *  Fetches a page of posts from the noroff social API..
 * @param {number} [limit=12] - max posts num of posts per page
 * @param {number} [page=1] 
 * @param {string} [tag] - optional tag filter
 * @returns {Promise<Array>} array of post + author
 */
export async function readPosts(limit = 12, page = 1, tag) {
  const token  = getToken();
  const apiKey = getApiKey();
  const params = new URLSearchParams({ limit, page, _author: true });
  if (tag) params.set("tag", tag);

  const res = await fetch(`${BASE}/posts?${params}`, {
    headers: {
      Authorization:      `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey
    }
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Error ${res.status}`);
  return json.data;
}

/**
 * Get all posts by a user
 * @param {string} username
 * @param {number} [limit=12]
 * @param {number} [page=1]
 * @param {string} [tag]
 * @returns {Promise<Array>} array of post objects
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const token  = getToken();
  const apiKey = getApiKey();
  const params = new URLSearchParams({ limit, page });
  if (tag) params.set("tag", tag);

  const res = await fetch(
    `${BASE}/profiles/${encodeURIComponent(username)}/posts?${params}`,
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
