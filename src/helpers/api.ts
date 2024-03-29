const BACKEND = `${process.env.VUE_APP_BACKEND}/api/`;

export default {
  ANSWERS: {
    READ: `${BACKEND}student/answers/`,
  },

  AUTH: {
    AUTH: `${BACKEND}auth`,
    LOGIN: `${BACKEND}student/login`,
    LOGOUT: `${BACKEND}logout`,
    PASSWORD: `${BACKEND}password`,
    USER: `${BACKEND}student/user`,
  },

  AUDIT: {
    READ: `${BACKEND}student/audit`,
  },

  DASHBOARD: {
    MODULE: `${BACKEND}student/dashboard/modules`,
    RATIO: `${BACKEND}student/dashboard/ratio`,
    READ: `${BACKEND}student/dashboard`,
  },

  EXAM: {
    QUESTIONS: `${BACKEND}student/questions/`,
    ANSWER: `${BACKEND}student/answer/`,
    SKIP: `${BACKEND}student/skip/`,
    SUBMIT: `${BACKEND}student/submit/`,
  },

  IMAGE: {
    IMAGE: `${BACKEND}image`,
  },

  MODULES: {
    READ: `${BACKEND}student/modules/`,
    CHECK: `${BACKEND}modules/check/`,
  },

  RESULTS: {
    READ: `${BACKEND}student/results/`,
  },

  SUBJECTS: {
    READ: `${BACKEND}student/subjects`,
  },
};
