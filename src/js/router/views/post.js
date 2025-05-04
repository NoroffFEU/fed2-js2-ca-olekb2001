// src/js/router/views/post.js

import { readPosts }   from "../../api/post/read.js";
import { deletePost }  from "../../api/post/delete.js";
import { getUsername } from "../../utilities/auth.js";

const POSTS_PER_PAGE = 12;

export async function init() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Your Feed</h1>
    <div class="search-container">
      <input id="searchInput" type="text" placeholder="Search by title or body…" />
      <button id="searchBtn">Search</button>
    </div>
    <div id="feed" class="feed-list"></div>
    <div id="loadMoreContainer" class="load-more-container"></div>
  `;

  document
    .getElementById("searchBtn")
    .addEventListener("click", () => startLoadPosts());

  document
    .getElementById("searchInput")
    .addEventListener("keyup", e => {
      // search on Enter key:
      if (e.key === "Enter") startLoadPosts();
    });

  startLoadPosts();
}

let currentPage = 1;

async function startLoadPosts() {
  currentPage = 1;
  document.getElementById("feed").innerHTML = "";
  await loadAndRender();
}

async function loadAndRender() {
  const feed      = document.getElementById("feed");
  const container = document.getElementById("loadMoreContainer");
  const term      = document.getElementById("searchInput").value.trim().toLowerCase();

  // placeholders
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

  container.innerHTML = "";  

  try {
    const posts = await readPosts(POSTS_PER_PAGE, currentPage);

    const filtered = term
      ? posts.filter(p =>
          p.title.toLowerCase().includes(term) ||
          p.body .toLowerCase().includes(term)
        )
      : posts;

    const currentUser = getUsername();

    filtered.forEach(p =>
      renderCard(p, currentUser, avatarPlaceholder, imagePlaceholder, feed)
    );

    wireDeleteButtons();

    
    if (!term && posts.length === POSTS_PER_PAGE) {
      const btn = document.createElement("button");
      btn.textContent = "Load More";
      btn.className = "btn load-more";
      btn.addEventListener("click", async () => {
        currentPage++;
        await loadAndRender();
      });
      container.appendChild(btn);
    }
  } catch (err) {
    feed.innerHTML = `<p class="error">Error loading posts: ${err.message}</p>`;
  }
}

function renderCard(p, currentUser, avatarPlaceholder, imagePlaceholder, feed) {
  const author    = p.author || {};
  const avatarUrl = author.avatar?.url?.startsWith("http")
    ? author.avatar.url
    : avatarPlaceholder;
  const mediaUrl  = p.media?.url?.startsWith("http")
    ? p.media.url
    : imagePlaceholder;
  const isMine    = author.name === currentUser;

  const card = document.createElement("div");
  card.className = "post-card";
  card.innerHTML = `
    <h2>${p.title}</h2>
    <p class="post-author">
      <img src="${avatarUrl}"
           alt="${author.name || 'User'}"
           class="author-avatar"
           onerror="this.onerror=null;this.src='${avatarPlaceholder}';" />
      <a href="/profile/index.html?username=${encodeURIComponent(author.name||"")}">
        ${author.name || 'Unknown'}
      </a>
    </p>
    <img src="${mediaUrl}"
         alt="${p.media?.alt || p.title}"
         class="post-image"
         onerror="this.onerror=null;this.src='${imagePlaceholder}';" />
    <p class="post-description">${p.body}</p>
    <div class="actions">
      <a class="view-btn"  href="/post/view/index.html?postId=${p.id}">View</a>
      ${isMine
        ? `<a class="edit-btn" href="/post/edit/index.html?postId=${p.id}">Edit</a>`
        : ``
      }
      ${isMine
        ? `<button data-id="${p.id}" class="delete-btn">Delete</button>`
        : ``
      }
    </div>
  `;
  feed.appendChild(card);
}

function wireDeleteButtons() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async e => {
      const id = e.target.dataset.id;
      if (!confirm("Are you sure you want to delete this post?")) return;
      try {
        await deletePost(id);
        e.target.closest(".post-card").remove();
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    });
  });
}
