export const jwtKey='secrecy';
import crypto from 'crypto'

// Generate a random encryption key with 32 bytes length (256 bits)
export const encryptionKey = crypto.randomBytes(32);





