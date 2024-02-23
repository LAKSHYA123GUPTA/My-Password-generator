import crypto from 'crypto';

export default function decryptUserId(encryptedData, secretKey) {
    // Convert the IV string to a Buffer
    const iv = Buffer.from(encryptedData.iv, 'hex');
    // Convert the encrypted user ID string to a Buffer
    const encryptedUserId = Buffer.from(encryptedData.encryptedUserId, 'hex');

    // Create a decipher object with the provided secret key and IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);

    // Decrypt the encrypted user ID
    let decrypted = decipher.update(encryptedUserId);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Return the decrypted user ID as a string
    return decrypted.toString();
}
