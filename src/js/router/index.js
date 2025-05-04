// src/js/router/index.js
import { authGuard } from "../utilities/authGuard.js";

export default async function router(pathname = window.location.pathname) {
  authGuard();
  const app = document.getElementById("app");
  if (app) app.innerHTML = "";

  let view;
  switch (pathname) {
    case "/": case "/index.html":
      view = "home"; break;

    case "/auth/": case "/auth/index.html":
      view = "auth"; break;

    case "/auth/login/": case "/auth/login/index.html":
      view = "login"; break;

    case "/auth/register/": case "/auth/register/index.html":
      view = "register"; break;

    case "/post/": case "/post/index.html":
      view = "post"; break;

    case "/post/view/": case "/post/view/index.html":
      view = "postView"; break;

    case "/post/create/": case "/post/create/index.html":
      view = "postCreate"; break;

    case "/post/edit/": case "/post/edit/index.html":
      view = "postEdit"; break;

    case "/profile/": case "/profile/index.html":
      view = "profile"; break;

    case "/profile/edit/": case "/profile/edit/index.html":
      view = "profileEdit"; break;    

    default:
      view = "notFound";
  }

  const mod = await import(`./views/${view}.js`);
  if (mod.init) await mod.init();
}
