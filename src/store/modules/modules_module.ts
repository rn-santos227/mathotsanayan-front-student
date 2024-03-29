import Module from "@/types/Module";
import api from "@/helpers/api";

import { defineStore } from "pinia";
import { authenticatedFetch } from "@/services/api";

export const useModuleModule = defineStore("modules", {
  state: () => ({
    modules: [] as Module[],
    isLoading: false as boolean,
    isTableLoading: false,
  }),

  actions: {
    setModules(modules: Module[]) {
      this.modules = modules;
    },

    async read(id: number): Promise<boolean> {
      try {
        this.isTableLoading = true;
        const response = await authenticatedFetch(api.MODULES.READ + id);
        const data = await response.json();
        const { modules } = data;
        if (modules) {
          modules.forEach((item: Module) => {
            if (item.active) item.active = true;
            else item.active = false;
          });
        }
        this.setModules(modules);
        return true;
      } catch (error) {
        console.error("Error Module in:", error);
        throw error;
      } finally {
        this.isTableLoading = false;
      }
    },

    async check(id: number): Promise<boolean> {
      try {
        const response = await authenticatedFetch(`${api.MODULES.CHECK}${id}`);
        const data = await response.json();
        const { module } = data;

        return !!module;
      } catch (error) {
        console.error("Error Module in:", error);
        throw error;
      }
    },
  },

  getters: {
    getModules(): Module[] {
      return this.modules;
    },
  },
});
