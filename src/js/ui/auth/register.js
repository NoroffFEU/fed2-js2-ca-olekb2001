// src/js/ui/auth/register.js
import { registerUser } from "../../api/auth/register.js";
import { loginUser    } from "../../api/auth/login.js";
import { createApiKey } from "../../api/auth/key.js";
import { setToken, setApiKey } from "../../utilities/storage.js";

/**
 * Handle the registration form:
 * 1. registerUser → v2/auth/register
 * 2. loginUser    → v2/auth/login   (to get a token)
 * 3. createApiKey → v2/auth/create-api-key
 * 4. store both token & apiKey, then redirect
 */
export async function onRegister(evt) {
  evt.preventDefault();
  const { name, email, password } = Object.fromEntries(new FormData(evt.target));

  try {
    // 1) Create the profile
    await registerUser({ name, email, password });

    // 2) Immediately log in to get a JWT
    const { accessToken } = await loginUser({ email, password });
    setToken(accessToken);

    // 3) Create & store the Social API key
    const apiKey = await createApiKey();
    setApiKey(apiKey);

    // 4) Go to the feed
    window.location.href = "/post/index.html";

  } catch (err) {
    alert("Error: " + err.message);
    console.error("Registration/Login error", err);
  }
}
