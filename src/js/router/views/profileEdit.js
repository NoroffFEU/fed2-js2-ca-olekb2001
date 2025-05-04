// src/js/router/views/profileEdit.js

import { readProfile }   from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";
import { getUsername }   from "../../utilities/auth.js";
import { authGuard }     from "../../utilities/authGuard.js";

export async function init() {
  authGuard();

  const app      = document.getElementById("app");
  const username = getUsername();
  if (!username) {
    app.innerHTML = `<p class="error">You must be logged in to edit your profile.</p>`;
    return;
  }

  try {
    const profile = await readProfile(username);

    app.innerHTML = `
      <h1>Edit Profile</h1>
      <form name="editProfile">
        <div>
          <label for="name">Name</label>
          <input id="name" name="name" type="text" 
                 value="${profile.name}" required />
        </div>
        <div>
          <label for="bio">Bio</label>
          <textarea id="bio" name="bio" rows="3"
                    placeholder="Say something about yourself…"
          >${profile.bio || ""}</textarea>
        </div>
        <div>
          <label for="avatarUrl">Avatar URL</label>
          <input id="avatarUrl" name="avatarUrl" type="url" 
                 placeholder="https://…" 
                 value="${profile.avatar?.url || ""}" />
        </div>
        <div>
          <label for="bannerUrl">Banner URL</label>
          <input id="bannerUrl" name="bannerUrl" type="url" 
                 placeholder="https://…"
                 value="${profile.banner?.url || ""}" />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    `;

    const form = document.forms.editProfile;
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const { name, bio, avatarUrl, bannerUrl } =
        Object.fromEntries(new FormData(form));

      try {
        await updateProfile(username, {
          name,
          bio,
          avatar: { url: avatarUrl.trim() },
          banner: { url: bannerUrl.trim() }
        });
        alert("Profile updated successfully!");
        window.location.href = "/profile/index.html";
      } catch (err) {
        alert("Update failed: " + err.message);
      }
    });

  } catch (err) {
    app.innerHTML = `<p class="error">Error loading profile: ${err.message}</p>`;
  }
}
