export const getSecretKey = (): string => {
  return process.env.VUE_APP_SECRET_KEY || "your-default-secret-key";
};
