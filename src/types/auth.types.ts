/* eslint-disable @typescript-eslint/consistent-type-imports */
import type { jwtSchema } from '@/schemas/auth.schemas';
import { z } from 'zod';

export type IJwt = z.infer<typeof jwtSchema>;

export interface IUser {
  id: string;
  email: string;
  exp?: Date;
}
