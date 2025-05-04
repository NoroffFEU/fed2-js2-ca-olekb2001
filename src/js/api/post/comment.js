// src/js/api/post/comment.js

import { getToken, getApiKey } from "../../utilities/storage.js";
const BASE = "https://v2.api.noroff.dev/social";

/**
 * Retrieves all comments for a given post by re-fetching the post with comments enabled.
 * If the API returns 404, we treat that as an empty list.
 *
 * @param {string} postId
 *   The unique identifier of the post to fetch comments for.
 * @returns {Promise<Array<Object>>}
 *   Resolves to an array of comment objects, each containing at least:
 *     - owner.name (string)
 *     - created (ISO timestamp string)
 *     - body    (string)
 * @throws {Error}
 *   On any network failure or non-404 error response.
 */
export async function readComments(postId) {
  const token  = getToken();
  const apiKey = getApiKey();
  const url    = `${BASE}/posts/${encodeURIComponent(postId)}?_comments=true`;

  const res = await fetch(url, {
    headers: {
      Authorization:      `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (res.status === 404) {
    return [];
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json.message || `Error ${res.status}`;
    throw new Error(msg);
  }

  return json.data.comments || [];
}

/**
 * Posts a new comment to a specific post.
 *
 * @param {string} postId
 *   The unique identifier of the post to comment on.
 * @param {{ body: string }} comment
 *   An object containing:
 *     - body (string): the text of the comment.
 * @returns {Promise<Object>}
 *   Resolves to the created comment object, including:
 *     - id      (string)
 *     - owner   (object with at least a `name` property)
 *     - created (ISO timestamp)
 *     - body    (string)
 * @throws {Error}
 *   If the network request fails or the server returns an error.
 */
export async function createComment(postId, { body }) {
  const token  = getToken();
  const apiKey = getApiKey();
  const url    = `${BASE}/posts/${encodeURIComponent(postId)}/comment`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type":     "application/json",
      Authorization:      `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({ body }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json.message || `Error ${res.status}`;
    throw new Error(msg);
  }

  return json;
}
