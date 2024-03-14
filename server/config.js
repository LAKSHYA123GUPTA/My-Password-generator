export const jwtKey = "secrecy";
import crypto from "crypto";

export const encryptionKey = crypto.randomBytes(32);
