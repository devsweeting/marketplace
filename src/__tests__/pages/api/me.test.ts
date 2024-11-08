import { testApiHandler } from 'next-test-api-route-handler';
import { me } from '@/pages/api/me';

describe('api/me', () => {
  test('Should return a status code of 200', async () => {
    await testApiHandler({
      handler: me,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        await expect(res.status).toStrictEqual(200);
      },
    });
  });
});
