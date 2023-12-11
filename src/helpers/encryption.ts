import { getSecretKey } from "./keys";
import * as CryptoJS from "crypto-js";

export const encryptData = (data: string): string => {
  const encryptedData = CryptoJS.AES.encrypt(data, getSecretKey()).toString();
  return encryptedData;
};

export const decryptData = (encryptedData: string): string => {
  const decryptedData = CryptoJS.AES.decrypt(
    encryptedData,
    getSecretKey()
  ).toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
