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

    async read(id: number, student_id: number): Promise<boolean> {
      try {
        this.isTableLoading = true;
        const response = await authenticatedFetch(
          `${api.MODULES.READ}${id}?student_id=${student_id}`
        );
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
        return false;
      } finally {
        this.isTableLoading = false;
      }
    },
  },

  getters: {
    getModules(): Module[] {
      return this.modules;
    },
  },
});
