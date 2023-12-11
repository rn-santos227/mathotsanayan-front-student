import { encryptData, decryptData } from "./encryption";

export const encryptAndStoreToLocalStorage = async (
  key: string,
  data: string
): Promise<void> => {
  const encryptedData = await encryptData(data);
  storeDataToLocalStorage(key, encryptedData.toString());
};

export const retrieveAndDecryptFromLocalStorage = async (
  key: string
): Promise<string | null> => {
  const encryptedData = retrieveDataFromLocalStorage(key);
  if (encryptedData) {
    return decryptData(new Uint8Array(Buffer.from(encryptedData, "base64")));
  }
  return null;
};

export const removeDataFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const storeDataToLocalStorage = (key: string, data: string): void => {
  localStorage.setItem(key, data);
};

export const retrieveDataFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
