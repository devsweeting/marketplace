import { getIpAddress } from '@/helpers/getIpAddress';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

const socket = new Socket();
describe('getIpAddress', () => {
  test('returns undefined from header if no ip is defined', () => {
    const request = new IncomingMessage(socket);
    const result = getIpAddress(request);

    expect(result).toBe(undefined);
  });

  test('returns ip from header if ip is defined', () => {
    const request = new IncomingMessage(socket);
    request.headers['x-forwarded-for'] = '127.0.0.1';
    const result = getIpAddress(request);
    expect(result).toBe('127.0.0.1');
  });
});
