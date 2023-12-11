import { getSecretKey } from "./keys";

export const encryptData = async (data: string): Promise<ArrayBuffer> => {
  const encodedData = new TextEncoder().encode(data);
  const secretKey = getSecretKey();

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: crypto.getRandomValues(new Uint8Array(12)) },
    cryptoKey,
    encodedData
  );

  return encryptedData;
};

export const decryptData = async (
  encryptedData: ArrayBuffer
): Promise<string> => {
  const secretKey = getSecretKey();

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const decryptedData = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: crypto.getRandomValues(new Uint8Array(12)) },
    cryptoKey,
    encryptedData
  );

  return new TextDecoder().decode(decryptedData);
};
