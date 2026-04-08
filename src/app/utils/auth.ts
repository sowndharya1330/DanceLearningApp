export const API_URL = "http://localhost:5000/api";

export const setToken = (token: string) => {
  localStorage.setItem("dance_app_token", token);
};

export const getToken = () => {
  return localStorage.getItem("dance_app_token");
};

export const removeToken = () => {
  localStorage.removeItem("dance_app_token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  } as any;

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "An error occurred");
  }

  return data;
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  setToken(data.token);
  return data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  setToken(data.token);
  return data;
};
