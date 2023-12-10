const BACKEND = `${process.env.VUE_APP_BACKEND}/api/`;

export default {
  AUTH: {
    AUTH: `${BACKEND}auth`,
    LOGIN: `${BACKEND}student`,
    LOGOUT: `${BACKEND}logout`,
    USER: `${BACKEND}user/3`,
  },

  MODULES: {
    READ: `${BACKEND}student/modules/`,
  },

  SUBJECTS: {
    READ: `${BACKEND}student/subjects`,
  },

  IMAGE: {
    IMAGE: `${BACKEND}image`,
  },
};
