// src/js/utilities/auth.js

import { getToken } from "./storage.js";

/**
 * Decode the stored JWT and return its name
 * @returns {string|null}
 */
export function getUsername() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.name || payload.sub || null;
  } catch {
    return null;
  }
}
