import { API } from "../config/api";

async function request(path, options = {}) {
  const response = await fetch(`${API.baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`${options.method || "GET"} ${path} failed`);
  }

  return response.json();
}

export function apiGet(path) {
  return request(path);
}

export function apiPost(path, data) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function apiDelete(path) {
  return request(path, {
    method: "DELETE",
  });
}

export function apiPut(path, data) {
  return request(path, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}