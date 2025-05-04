// src/js/router/views/login.js
import { onLogin } from "../../ui/auth/login.js";

export function init() {
  const app = document.getElementById("app");

  // Inject the login form into app
  app.innerHTML = `
    <form name="login">
      <h1>Log In</h1>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>
  `;

  // submit handler
  const form = document.forms.login;
  if (!form) {
    console.error("Login form not found!");
    return;
  }
  form.addEventListener("submit", onLogin);
}