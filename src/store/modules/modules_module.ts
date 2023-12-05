import Module from "@/types/Module";

import { defineStore } from "pinia";

export const useModuleModule = defineStore("modules", {
  state: () => ({
    modules: [] as Module[],
    isLoading: false as boolean,
    isTableLoading: false,
  }),
});
