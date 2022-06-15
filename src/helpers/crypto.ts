import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { ENCRYPTION_KEY } from '@/helpers/constants';

export const encrypt = (data: string): string => {
  if (!ENCRYPTION_KEY) {
    throw new Error(`Failed to encrypt. Invalid ENCRYPTION_KEY`);
  }

  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const json = JSON.stringify({
    iv: iv.toString('base64'),
    data: encrypted.toString('base64'),
  });

  return Buffer.from(json).toString('base64');
};

export const decrypt = (encrypted: string): string => {
  if (!ENCRYPTION_KEY) {
    throw new Error(`Failed to decrypt. Invalid ENCRYPTION_KEY`);
  }

  const json = Buffer.from(encrypted, 'base64').toString();
  const parsed = JSON.parse(json);

  const iv = Buffer.from(parsed.iv, 'base64');
  const encryptedText = Buffer.from(parsed.data, 'base64');
  const decipher = createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
