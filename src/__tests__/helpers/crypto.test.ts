/**
 * @jest-environment node
 */
import { encrypt, decrypt } from '@/helpers/crypto';
import * as constants from '../../helpers/constants';

const mockConstants = constants as { ENCRYPTION_KEY: Buffer | undefined };

const mockEncryptionKey = (value?: string | null) => {
  if (value !== '' && !value) {
    mockConstants.ENCRYPTION_KEY = undefined;
  } else {
    mockConstants.ENCRYPTION_KEY = Buffer.from(value, 'base64');
  }
};

jest.mock('../../helpers/constants', () => ({
  __esModule: true,
  ENCRYPTION_KEY: null,
}));
describe('encrypt', () => {
  test('encryption should fail if window is undefined', () => {
    mockEncryptionKey();
    expect(() => encrypt('some string')).toThrow(`Failed to encrypt. Invalid ENCRYPTION_KEY`);
  });

  test('encrypt should fail if no key was given', () => {
    mockEncryptionKey('');
    expect(() => encrypt('some string')).toThrow(`Invalid key length`);
  });

  test('encrypt should encrypt', () => {
    mockEncryptionKey('testEncyrptionKeyyyyyyyyyyyyyyyyyyyyyyyyyyy=');
    expect(encrypt('some string')).toBeTruthy;
  });
});

describe('decrypt', () => {
  test('should throw error if window is undefined', () => {
    mockEncryptionKey();
    expect(() => decrypt('encrypted string')).toThrow(`Failed to decrypt. Invalid ENCRYPTION_KEY`);
  });

  test('decrypt should fail if no key was given', () => {
    mockEncryptionKey('');
    expect(() => encrypt('some string')).toThrow(`Invalid key length`);
  });

  test('decrypt should decrypt a string', () => {
    mockEncryptionKey('testEncyrptionKeyyyyyyyyyyyyyyyyyyyyyyyyyyy=');
    expect(decrypt(encrypt('some string'))).toBe('some string');
  });
});

describe('encrypt and decrypt', () => {
  test('should encrypt and decrypt correctly', () => {
    mockEncryptionKey('testEncyrptionKeyyyyyyyyyyyyyyyyyyyyyyyyyyy=');
    const testString = 'Test strind';
    const encryptText = encrypt(testString);
    const decryptedText = decrypt(encryptText);
    expect(decryptedText === testString).toBeTruthy();
    expect(decryptedText === encryptText).toBeFalsy();
    expect(encryptText === testString).toBeFalsy();
  });
});
