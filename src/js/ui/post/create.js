// src/js/ui/post/create.js
import { createPost } from "../../api/post/create.js";

/**
 * Handle the Create Post form submit.
 * @param {SubmitEvent} event
 */
export async function onCreatePost(event) {
  event.preventDefault();
  const { title, body, mediaUrl } = Object.fromEntries(new FormData(event.target));
  try {
    await createPost({
      title,
      body,
      media: {
        url: mediaUrl.trim(),
        alt: title
      }
    });
    // redirect back to feed on success
    window.location.href = "/post/index.html";
  } catch (err) {
    alert("Could not create post: " + err.message);
    console.error(err);
  }
}
