// src/js/router/views/register.js
import { onRegister } from "../../ui/auth/register.js";

export function init() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <form name="register">
      <h1>Register</h1>
      <input name="name"     type="text"     placeholder="Username (letters, numbers, _)" required />
      <input name="email"    type="email"    placeholder="you@stud.noroff.no"     required />
      <input name="password" type="password" placeholder="Password (≥8 chars)"   required />
      <button type="submit">Register</button>
    </form>
  `;
  document.forms.register.addEventListener("submit", onRegister);
}
