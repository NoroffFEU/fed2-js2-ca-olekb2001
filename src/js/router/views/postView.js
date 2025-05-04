// src/js/router/views/postView.js

import { readPost }      from "../../api/post/read.js";
import { deletePost }    from "../../api/post/delete.js";
import { getUsername }   from "../../utilities/auth.js";
import { initComments }  from "../../ui/post/comments.js";

export async function init() {
  const app    = document.getElementById("app");
  const params = new URLSearchParams(location.search);
  const id     = params.get("postId");

  if (!id) {
    app.innerHTML = `<p class="error">No post specified.</p>`;
    return;
  }

  try {
    const p           = await readPost(id);
    const currentUser = getUsername();
    const author      = p.author || p.owner || {};
    const isMine      = author.name === currentUser;

    // Inline SVG placeholders
    const avatarPlaceholder =
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <rect width="40" height="40" fill="#ccc"/>
          <text x="20" y="22" font-size="10" text-anchor="middle" fill="#666">User</text>
        </svg>
      `);
    const imagePlaceholder =
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300">
          <rect width="600" height="300" fill="#ccc"/>
          <text x="300" y="160" font-size="24" text-anchor="middle" fill="#666">No Image</text>
        </svg>
      `);

   
    const avatarUrl = author.avatar?.url?.startsWith("http")
      ? author.avatar.url
      : avatarPlaceholder;
    const mediaUrl = p.media?.url?.startsWith("http")
      ? p.media.url
      : imagePlaceholder;

    app.innerHTML = `
      <article class="post-detail">
        <h1>${p.title}</h1>
        <p class="post-author">
          <img src="${avatarUrl}"
               alt="${author.name || 'User'}"
               class="author-avatar"
               onerror="this.onerror=null;this.src='${avatarPlaceholder}'" />
          <strong>${author.name || 'Unknown'}</strong>
          <span class="post-date">${new Date(p.created).toLocaleString()}</span>
        </p>
        <img src="${mediaUrl}"
             alt="${p.media?.alt || p.title}"
             class="post-image"
             onerror="this.onerror=null;this.src='${imagePlaceholder}'" />
        <div class="post-body">${p.body}</div>
        <div class="post-actions">
          <a href="/post/index.html" class="btn">← Back to Feed</a>
          ${isMine
            ? `<a href="/post/edit/index.html?postId=${p.id}" class="btn">Edit</a>`
            : ``
          }
          ${isMine
            ? `<button id="deleteBtn" class="btn btn-danger">Delete</button>`
            : ``
          }
        </div>
      </article>
      <div id="commentsContainer"></div>
    `;

    
    if (isMine) {
      document.getElementById("deleteBtn").addEventListener("click", async () => {
        if (!confirm("Delete this post?")) return;
        try {
          await deletePost(id);
          window.location.href = "/post/index.html";
        } catch (err) {
          alert("Delete failed: " + err.message);
        }
      });
    }

    
    const commentsDiv = document.getElementById("commentsContainer");
    await initComments(commentsDiv, id);

  } catch (err) {
    app.innerHTML = `<p class="error">Error loading post: ${err.message}</p>`;
  }
}
