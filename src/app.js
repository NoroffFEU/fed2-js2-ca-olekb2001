// src/app.js

// 2. Shared navbar & auth guard
import { renderNavbar } from "./js/ui/global/navbar.js";
import { authGuard } from "./js/utilities/authGuard.js";

renderNavbar();
authGuard();

// 3. Bring in your router
import router from "./js/router/index.js";

// 4. On initial page load
await router(window.location.pathname);

// 5. Handle back/forward nav
window.addEventListener("popstate", () => {
  router(window.location.pathname);
});