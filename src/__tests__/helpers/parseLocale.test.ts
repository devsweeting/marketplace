import { parseLocale } from '@/helpers/parseLocale';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

const socket = new Socket();
describe('parseLocale', () => {
  const request = new IncomingMessage(socket);
  test('returns parsed locale if it is defined', () => {
    request.headers['accept-language'] = 'en-US,en;q=0.9';
    const result = parseLocale(request);
    expect(result).toBe('en-US');
  });

  test('returns undefined if the locale is not defined', () => {
    const request = new IncomingMessage(socket);
    const result = parseLocale(request);
    expect(result).toBe(undefined);
  });
});
socket.destroy();
