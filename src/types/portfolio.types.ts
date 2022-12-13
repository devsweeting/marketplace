/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from 'zod';
import { portfolioSchema } from '@/schemas/portfolio.schemas';

export type IPortfolioData = z.infer<typeof portfolioSchema>;
