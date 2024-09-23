import crypto from "crypto";

export default function decryptUserId(encryptedData, secretKey) {
  const iv = Buffer.from(encryptedData.iv, "hex");

  const encryptedUserId = Buffer.from(encryptedData.encryptedUserId, "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv
  );

  let decrypted = decipher.update(encryptedUserId);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
