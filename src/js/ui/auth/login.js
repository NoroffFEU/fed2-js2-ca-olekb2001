// src/js/ui/auth/login.js

import { loginUser }   from "../../api/auth/login.js";
import { createApiKey } from "../../api/auth/key.js";
import { setToken, getApiKey, setApiKey } from "../../utilities/storage.js";

/**
 * Handle login form submission:
 *   1) Prevents default form action.
 *   2) Reads email & password.
 *   3) Calls the Noroff Auth API to obtain a Jwtt.
 *   4) Reusess  or creates a NorofF API key.
 *   5) Stores JWT and API key in locallStorage.
 *   6) Redirects the user to the feed page.
 *
 * @param {SubmitEvent} event
 *   The form submission event.
 * @returns {Promise<void>}
 *   Resolves after redirecting or throws on error.
 */
export async function onLogin(event) {
  event.preventDefault();
  const { email, password } = Object.fromEntries(new FormData(event.target));

  try {
    // 1. Log in and save JWT
    const { accessToken } = await loginUser({ email, password });
    setToken(accessToken);

    // 2. Create & save Norsoff API key 
    let apiKey = getApiKey();
    if (!apiKey) {
      apiKey = await createApiKey();
      setApiKey(apiKey);
    }

    // 3. Redirect to the feed page
    window.location.href = "/post/index.html";
  } catch (err) {
    alert("Login failed: " + err.message);
    console.error("Login error:", err);
  }
}
