import { defineStore } from "pinia";

export const useExamModule = defineStore("exam", {
  state: () => ({
    isTakingExam: false,
  }),
});
