export function init() {
    const app = document.getElementById("app");
    app.innerHTML = `
      <h1>Welcome to MySocialApp</h1>
      <p><a href="/auth/login/index.html">Log In</a> or
         <a href="/auth/register/index.html">Register</a></p>
    `;
  }