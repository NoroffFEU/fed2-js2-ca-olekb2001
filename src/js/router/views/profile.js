// src/js/router/views/profile.js

import { readProfile }      from "../../api/profile/read.js";
import { readPostsByUser }  from "../../api/post/read.js";
import { getUsername }      from "../../utilities/auth.js";
import { followUser, unfollowUser } from "../../api/profile/follow.js";

export async function init() {
  const app         = document.getElementById("app");
  const params      = new URLSearchParams(location.search);
  const viewedUser  = params.get("username") || getUsername();
  const currentUser = getUsername();

  if (!viewedUser) {
    app.innerHTML = `<p class="error">Please log in to view profiles.</p>`;
    return;
  }

  try {
    // Load profile wit followrs
    const profile = await readProfile(viewedUser);

   
    const isMine      = viewedUser === currentUser;
    const isFollowing = profile.followers.some(u =>
      u.name === currentUser || u.email === currentUser
    );

    // Render header/stats/containers etc
    app.innerHTML = `
      ${profile.banner?.url
        ? `<div class="profile-banner">
             <img src="${profile.banner.url}" alt="${profile.name}’s banner" />
           </div>`
        : ``
      }
      <section class="profile-header">
        <img src="${profile.avatar?.url||""}"
             alt="${profile.name}"
             class="profile-avatar"/>
        <h1>${profile.name}</h1>
        <p class="profile-bio">${profile.bio||""}</p>
        ${
          isMine
            ? `<a href="/profile/edit/index.html" class="btn">Edit Profile</a>`
            : `<button id="followBtn" class="btn">
                 ${isFollowing ? "Unfollow" : "Follow"}
               </button>`
        }
      </section>
      <section class="profile-stats">
        <div><strong>${profile._count.posts}</strong><br/>Posts</div>
        <div><strong>${profile._count.followers}</strong><br/>Followers</div>
        <div><strong>${profile._count.following}</strong><br/>Following</div>
      </section>
      <section class="profile-list">
        <h2>Followers</h2>
        <div id="followersList" class="profile-list-grid"></div>
      </section>
      <section class="profile-list">
        <h2>Following</h2>
        <div id="followingList" class="profile-list-grid"></div>
      </section>
      <h2 class="profile-posts-title">Posts by ${profile.name}</h2>
      <div id="user-posts" class="feed-list"></div>
    `;

    // Follow/Unfollow 
    if (!isMine) {
      const btn = document.getElementById("followBtn");
      btn.addEventListener("click", async () => {
        try {
          if (btn.textContent.trim() === "Follow") {
            await followUser(viewedUser);
          } else {
            await unfollowUser(viewedUser);
          }
          window.location.reload();
        } catch (err) {
          alert("Follow/unfollow failed: " + err.message);
        }
      });
    }

    // Populate Followers grid
    const followersList = document.getElementById("followersList");
    profile.followers.forEach(u => {
      const card = document.createElement("a");
      card.href = `/profile/index.html?username=${encodeURIComponent(u.name)}`;
      card.className = "profile-mini-card";
      card.innerHTML = `
        <img src="${u.avatar?.url||""}" alt="${u.name}" class="mini-avatar"/>
        <span>${u.name}</span>
      `;
      followersList.appendChild(card);
    });

    
    const followingList = document.getElementById("followingList");
    profile.following.forEach(u => {
      const card = document.createElement("a");
      card.href = `/profile/index.html?username=${encodeURIComponent(u.name)}`;
      card.className = "profile-mini-card";
      card.innerHTML = `
        <img src="${u.avatar?.url||""}" alt="${u.name}" class="mini-avatar"/>
        <span>${u.name}</span>
      `;
      followingList.appendChild(card);
    });

    // Fetch & render this user’s posts 
    const posts    = await readPostsByUser(viewedUser);
    const postsEl  = document.getElementById("user-posts");

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

    posts.forEach(p => {
      const mediaUrl = p.media?.url?.startsWith("http")
        ? p.media.url
        : imagePlaceholder;

      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <h3>${p.title}</h3>
        <img src="${mediaUrl}"
             alt="${p.media?.alt || p.title}"
             class="post-image"/>
        <p>${p.body}</p>
        <a href="/post/view/index.html?postId=${p.id}">View</a>
      `;
      postsEl.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading profile:", err);
    app.innerHTML = `<p class="error">Error loading profile: ${err.message}</p>`;
  }
}
