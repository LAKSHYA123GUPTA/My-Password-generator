// Function to generate a random salt
export function generateSalt() {
  const saltBuffer =crypto.getRandomValues(new Uint8Array(16));
  return Array.from(saltBuffer)
    .map((byte) => ('0' + byte.toString(16)).slice(-2))
    .join('');
}

// Function to hash data with salt
export default async function convert(data, salt) {
  let encoder = new TextEncoder();
  let dataBuffer = encoder.encode(data + salt);
  
  const iterations = 3;
  let hashedData = dataBuffer;

  for (let i = 0; i < iterations; i++) {
    hashedData = await crypto.subtle.digest('SHA-256', hashedData);
  }

  let hashArray = Array.from(new Uint8Array(hashedData));
  let hashedHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashedHex;
}


