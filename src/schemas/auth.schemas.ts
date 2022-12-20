import { z } from 'zod';

export const jwtSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
