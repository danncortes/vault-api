const crypto = require('crypto');
const { CIPHER_PASS, CIPHER_ALGORITHM } = process.env;

const key = crypto.scryptSync(CIPHER_PASS, 'salt', 24);
// Use `crypto.randomBytes` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const cryptData = (data) => {
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, iv);
  const encrypted = cipher.update(data, 'utf8', 'hex');
  return encrypted + cipher.final('hex');
};

const decryptData = (cryptedData) => {
  const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, iv);
  const decrypted = decipher.update(cryptedData, 'hex', 'utf8');
  return decrypted + decipher.final('utf8');
};

module.exports = { cryptData, decryptData };
