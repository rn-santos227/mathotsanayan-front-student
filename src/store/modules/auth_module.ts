import Student from "@/types/Student";
import api from "@/helpers/api";

import { defineStore } from "pinia";
import { authenticatedFetch } from "@/services/api";

export const useAuthModule = defineStore("auth", {
  state: () => ({
    id: localStorage.getItem("userID"),
    type: 2 as number,
    student: {} as Student,
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    isLoading: false,
  }),

  actions: {
    setStudent(student: Student): void {
      this.student = student;
    },

    setToken(token: string): void {
      this.accessToken = token;
      this.isAuthenticated = true;
      localStorage.setItem("accessToken", token);
    },

    async login(email: string, password: string): Promise<void> {
      try {
        this.isLoading = true;
        const response = await fetch(api.AUTH.LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        const { token, student } = data;
        if (token) {
          this.setStudent(student);
          this.setToken(token);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUserData(): Promise<void> {
      if (!this.isAuthenticated) return;
      try {
        this.isLoading = true;
        const response = await authenticatedFetch(api.AUTH.USER);
        const data = await response.json();
        const { student } = data;
        console.log(student);
        this.setStudent(student);
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async logout(): Promise<void> {
      try {
        this.isLoading = true;
        await authenticatedFetch(api.AUTH.LOGOUT);
        this.accessToken = null;
        this.isAuthenticated = false;
        localStorage.removeItem("accessToken");
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
