// src/js/utilities/storage.js

const TOKEN_KEY  = "socialapp_token";
const APIKEY_KEY = "socialapp_api_key";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setApiKey(key) {
  localStorage.setItem(APIKEY_KEY, key);
}

export function getApiKey() {
  return localStorage.getItem(APIKEY_KEY);
}
