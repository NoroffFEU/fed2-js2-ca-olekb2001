export function init() {
    document.getElementById("app").innerHTML = `
      <h1>Authenticate</h1>
      <p><a href="/auth/login/index.html">Log In</a> |
         <a href="/auth/register/index.html">Register</a></p>
    `;
  }