import { getToken } from "./storage.js";

export function authGuard() {
  const token = getToken();
  const page  = document.body.dataset.page;
  const publicPages = ["HOME","AUTH_LANDING","LOGIN","REGISTER"];
  if (!publicPages.includes(page) && !token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/index.html";
  }
}
