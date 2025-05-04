// src/js/api/profile/follow.js

import { getToken, getApiKey } from "../../utilities/storage.js";

const BASE = "https://v2.api.noroff.dev/social/profiles";

/**
 * Follow the given user.
 * @param {string} username
 */
export async function followUser(username) {
  const token  = getToken();
  const apiKey = getApiKey();

  const res = await fetch(
    `${BASE}/${encodeURIComponent(username)}/follow`,
    {
      method: "PUT",
      headers: {
        Authorization:      `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      }
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Follow failed (${res.status})`);
  }
}

/**
 * Unfollow the given user.
 * @param {string} username
 */
export async function unfollowUser(username) {
  const token  = getToken();
  const apiKey = getApiKey();

  const res = await fetch(
    `${BASE}/${encodeURIComponent(username)}/unfollow`,
    {
      method: "PUT",
      headers: {
        Authorization:      `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      }
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Unfollow failed (${res.status})`);
  }
}
