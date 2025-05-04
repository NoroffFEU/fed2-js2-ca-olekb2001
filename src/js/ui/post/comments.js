// src/js/ui/post/comments.js

import { readComments, createComment } from "../../api/post/comment.js";

/**
 * Render the comments section (list + form) into `container`.
 * @param {HTMLElement} container
 * @param {string} postId
 */
export async function initComments(container, postId) {
  container.innerHTML = `
    <section class="comments">
      <h2>Comments</h2>
      <div id="commentList" class="comment-list"></div>
      <form name="addComment" class="comment-form">
        <textarea name="body" rows="2" placeholder="Write a comment…" required></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </section>
  `;

  const listEl = container.querySelector("#commentList");
  const form   = container.querySelector("form[name=addComment]");

  async function load() {
    try {
      listEl.innerHTML = "<p>Loading comments…</p>";
      const comments = await readComments(postId);
      if (comments.length === 0) {
        listEl.innerHTML = "<p>No comments yet.</p>";
      } else {
        listEl.innerHTML = comments
          .map(c => `
            <div class="comment-card">
              <strong>${c.owner.name}</strong>
              <span class="comment-date">
                ${new Date(c.created).toLocaleString()}
              </span>
              <p>${c.body}</p>
            </div>
          `).join("");
      }
    } catch (err) {
      listEl.innerHTML = `<p class="error">Failed to load comments: ${err.message}</p>`;
    }
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const body = form.body.value.trim();
    if (!body) return;

    try {
      await createComment(postId, { body });
      form.reset();
      await load();
    } catch (err) {
      alert("Comment failed: " + err.message);
    }
  });

  await load();
}
