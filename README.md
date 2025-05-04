# MySocialApp Front-end

**Live Demo:** 
**Repository:** https://github.com/NoroffFEU/fed2-js2-ca-olekb2001.git

---

## Overview

MySocialApp is a vanilla-JavaScript front-end client for the Noroff Social Media API. It enables users to register, log in, create/edit/delete posts, follow/unfollow other users, search through posts, comment on posts, and manage their own profiles.

---

## Table of Contents

1. [Features]
2. [Tech Stack]
3. [JSDoc Documentation]

---

## Features

- **Authentication**  
  - Register new users  
  - Log in with JWT, store token + Noroff API key  
- **Feed**  
  - View all posts in a responsive grid  
  - Search by title or body text  
  - “Load More” pagination  
- **Post CRUD**  
  - Create new posts with title, body, tags, media  
  - Edit and delete your own posts  
- **Profiles**  
  - View any user’s profile, including avatar, bio, banner  
  - Follow/unfollow other users, see follower/following counts  
  - View user’s own profile and edit name, bio, avatar, banner  
- **Comments**  
  - View comments under each post  
  - Add new comments in real time  
- **Responsive Design**  
  - Mobile-friendly ish layout using css

---

## Tech Stack

- **JavaScript (ES6 Modules)**  
- **Fetch API** for network requests  
- **CSS**: reset + custom stylesheet (no frameworks)  
- **HTML5** with semantic elements  
- **No front-end frameworks** (React/Vue/Angular)  

---


## Tech StackJSDoc Documentation

- Several key functions are documented with JSDoc:

- readPosts(limit, page, tag) in src/js/api/post/read.js

- readComments(postId) and createComment(postId, {body}) in src/js/api/post/comment.js

- onLogin(event) in src/js/ui/auth/login.js

- Each includes parameter descriptions, return types, and thrown errors.
