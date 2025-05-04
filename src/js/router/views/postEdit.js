// src/js/router/views/postEdit.js
import { readPost }    from "../../api/post/read.js";
import { updatePost }  from "../../api/post/update.js";
import { authGuard }   from "../../utilities/authGuard.js";

export async function init() {
  authGuard();
  const app    = document.getElementById("app");
  const params = new URLSearchParams(location.search);
  const id     = params.get("postId");
  if (!id) { app.innerHTML = "<p>No post specified.</p>"; return; }

  try {
    const post = await readPost(id);
    app.innerHTML = `
      <h1>Edit Post</h1>
      <form name="editPost">
        <label>Title<input name="title" value="${post.title}" required /></label>
        <label>Body<textarea name="body">${post.body}</textarea></label>
        <label>Media URL<input name="mediaUrl" value="${post.media?.url||''}" /></label>
        <button type="submit">Save</button>
      </form>
    `;
    const form = document.forms.editPost;
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const { title, body, mediaUrl } = Object.fromEntries(new FormData(form));
      const data = {
        title,
        body,
        media: { url: mediaUrl || "", alt: title }
      };
      await updatePost(id, data);
      window.location.href = "/post/index.html";
    });
  } catch (err) {
    app.innerHTML = `<p class="error">Error loading post: ${err.message}</p>`;
  }
}
