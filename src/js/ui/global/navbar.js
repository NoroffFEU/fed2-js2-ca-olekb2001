// src/js/ui/global/navbar.js

export function renderNavbar() {
  const nav   = document.getElementById("navbar");
  const token = localStorage.getItem("socialapp_token");

  nav.innerHTML = `
    <div class="nav-left">
      <!-- Logo from /image/noroff-logo.png -->
      <a href="${token ? "/post/index.html" : "/auth/index.html"}">
        <img id="logo" src="/image/noroff-logo.png" alt="MySocialApp" />
      </a>
      <a href="/post/index.html">Feed</a>
      <a href="/post/create/index.html">New Post</a>
      <a href="/profile/index.html">My Profile</a>
    </div>
    <div class="nav-right">
      ${token
        ? `<button id="logoutBtn">Logout</button>`
        : `<a href="/auth/index.html">Login / Register</a>`
      }
    </div>
  `;

  if (token) {
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("socialapp_token");
      localStorage.removeItem("socialapp_api_key");
      location.href = "/auth/index.html";
    });
  }
}
