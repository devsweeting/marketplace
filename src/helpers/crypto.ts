import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const key = Buffer.from(process.env.ENCRYPTION_KEY ?? '', 'base64');

export const encrypt = (data: string): string => {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const json = JSON.stringify({
    iv: iv.toString('base64'),
    data: encrypted.toString('base64'),
  });

  return Buffer.from(json).toString('base64');
};

export const decrypt = (encrypted: string): string => {
  const json = Buffer.from(encrypted, 'base64').toString();
  const parsed = JSON.parse(json);

  const iv = Buffer.from(parsed.iv, 'base64');
  const encryptedText = Buffer.from(parsed.data, 'base64');
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
