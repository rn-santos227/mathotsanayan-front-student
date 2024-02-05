import Dashboard from "@/interfaces/Dashboard";
import GraphPie from "@/interfaces/GraphPie";
import ResultModule from "@/interfaces/ResultModule";
import api from "@/helpers/api";

import { defineStore } from "pinia";
import { authenticatedFetch } from "@/services/api";

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

    async read() {
      const response = await authenticatedFetch(api.DASHBOARD.READ);
      const data = await response.json();
      const { dashboard } = data;
      this.setDashboard(dashboard);
    },
  },

  getters: {
    getDashboard(): Dashboard {
      return this.dashboard;
    },
  },
});
