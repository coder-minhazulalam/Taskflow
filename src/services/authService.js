/**
 * Authentication Service (Frontend)
 * Communicates with Express Backend Auth API (http://localhost:5000/api/auth)
 * Handles session tokens via HttpOnly Cookies (credentials: 'include')
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const authService = {
  /**
   * Register a new user
   */
  async register({ name, email, password }) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Essential for receiving HttpOnly session cookie
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data.data?.user;
  },

  /**
   * Login user with email & password
   */
  async login({ email, password }) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Receives and sets HttpOnly session cookie
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data.data?.user;
  },

  /**
   * Get currently logged-in user profile from session cookie
   */
  async getMe() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        return null; // Not logged in or expired session
      }

      const data = await res.json();
      return data.data?.user || null;
    } catch {
      return null;
    }
  },

  /**
   * Logout user and invalidate session cookie
   */
  async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (err) {
      console.warn("Logout error:", err.message);
    }
  },
};

