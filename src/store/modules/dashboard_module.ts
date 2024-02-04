import Dashboard from "@/interfaces/Dashboard";
import GraphPie from "@/interfaces/GraphPie";
import ResultModule from "@/interfaces/ResultModule";
import { defineStore } from "pinia";

export const useDashboardModule = defineStore("dashboard", {
  state: () => ({
    dashboard: {} as Dashboard,
    isLoading: false,
    graphPie: {} as GraphPie,
    resultModules: [] as ResultModule[],
  }),

  actions: {
    setDashboard(dashboard: Dashboard): void {
      this.dashboard = dashboard;
    },

    setGraphPie(graphPie: GraphPie): void {
      this.graphPie = graphPie;
    },

    setResultModules(resultModules: ResultModule[]) {
      this.resultModules = resultModules;
    },
  },

  getters: {
    getDashboard(): Dashboard {
      return this.dashboard;
    },
  },
});
