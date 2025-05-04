// src/js/router/views/postCreate.js
import { authGuard }     from "../../utilities/authGuard.js";
import { onCreatePost }  from "../../ui/post/create.js";

export function init() {
  authGuard();

  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Create New Post</h1>
    <form name="createPost">
      <div>
        <label for="title">Title</label>
        <input id="title" name="title" type="text" required />
      </div>
      <div>
        <label for="body">Body</label>
        <textarea id="body" name="body" rows="5"></textarea>
      </div>
      <div>
        <label for="mediaUrl">Media URL (optional)</label>
        <input id="mediaUrl" name="mediaUrl" type="url" placeholder="https://…" />
      </div>
      <button type="submit">Publish</button>
    </form>
  `;

  const form = document.forms.createPost;
  if (!form) {
    console.error("Create Post form not found!");
    return;
  }
  form.addEventListener("submit", onCreatePost);
}
