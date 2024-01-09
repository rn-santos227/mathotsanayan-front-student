const BACKEND = `${process.env.VUE_APP_BACKEND}/api/`;

export default {
  ANSWERS: {
    READ: `${BACKEND}student/answers/`,
  },

  AUTH: {
    AUTH: `${BACKEND}auth`,
    LOGIN: `${BACKEND}student`,
    LOGOUT: `${BACKEND}logout`,
    PASSWORD: `${BACKEND}password`,
    USER: `${BACKEND}user/3`,
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
