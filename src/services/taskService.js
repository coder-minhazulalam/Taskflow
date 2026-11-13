/**
 * Task Service (Frontend)
 * Express.js Backend API (http://localhost:5000/api/tasks) এর সাথে যোগাযোগ রক্ষা করে।
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const taskService = {
  /**
   * ১. সকল টাস্ক ফেচ করা (GET /api/tasks)
   */
  async getAllTasks(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append("search", params.search);
      if (params.status && params.status !== "ALL") queryParams.append("status", params.status);
      if (params.priority && params.priority !== "ALL") queryParams.append("priority", params.priority);

      const url = `${API_BASE_URL}/tasks${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.warn("Backend not reachable or error fetching tasks:", error.message);
      return null; // Return null so UI can use fallback smoothly
    }
  },

  /**
   * ২. নতুন টাস্ক তৈরি করা (POST /api/tasks)
   */
  async createTask(taskData) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task (Status ${response.status})`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error creating task in backend:", error.message);
      throw error;
    }
  },

  /**
   * ৩. টাস্ক আপডেট করা (PATCH /api/tasks/:id)
   */
  async updateTask(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update task (Status ${response.status})`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error updating task:", error.message);
      throw error;
    }
  },

  /**
   * ৪. টাস্ক মুছে ফেলা (DELETE /api/tasks/:id)
   */
  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task (Status ${response.status})`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting task:", error.message);
      throw error;
    }
  },
};

