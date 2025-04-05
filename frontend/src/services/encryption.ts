import CryptoJS from "crypto-js";
import { secretKey } from "./config";

const encryptData = (rawData: any) => {
  return CryptoJS.AES.encrypt(rawData, secretKey as string).toString();
};

const decryptData = (encryptedData: any) => {
  try {
    if(encryptedData){
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey as string);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
      return null
  } catch (error: any) {
    console.error("Decryption error:", error.message);
    return null;
  }
};

export { encryptData, decryptData };
