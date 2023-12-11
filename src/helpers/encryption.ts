export const encryptData = async (
  data: string,
  secretKey: string
): Promise<ArrayBuffer> => {
  const encodedData = new TextEncoder().encode(data);

  // Import the crypto key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  // Encrypt the data using AES-GCM algorithm
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: crypto.getRandomValues(new Uint8Array(12)) },
    cryptoKey,
    encodedData
  );

  return encryptedData;
};

export const decryptData = async (
  encryptedData: ArrayBuffer,
  secretKey: string
): Promise<string> => {
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
