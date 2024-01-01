import Dashboard from "@/interfaces/Dashboard";
import { defineStore } from "pinia";

export const useDashboardModule = defineStore("dashboard", {
  state: () => ({
    dashboard: {} as Dashboard,
    isLoading: false,
  }),
});
