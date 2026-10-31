"use client";

import { authClient } from "./auth-client";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

let cached = { token: null, exp: 0 };

function readExp(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return (payload.exp || 0) * 1000;
  } catch {
    return 0;
  }
}

// Short-lived JWT from BetterAuth, reused until a minute before it expires
export async function getToken() {
  if (cached.token && cached.exp - Date.now() > 60_000) return cached.token;
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    cached = { token: null, exp: 0 };
    return null;
  }
  cached = { token: data.token, exp: readExp(data.token) };
  return data.token;
}

export function clearToken() {
  cached = { token: null, exp: 0 };
}

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export async function api(path, { method = "GET", body, auth = false, signal } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = await getToken();
    if (!token) throw new ApiError("Please log in to continue", 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError("Can't reach the HateyHat server. Check your connection and try again.", 0);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) clearToken();
    throw new ApiError(data.message || "Request failed", res.status, data.errors);
  }
  return data;
}
