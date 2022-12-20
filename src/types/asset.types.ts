/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from 'zod';
import {
  assetSchema,
  attributeSchema,
  mediaSchema,
  paginatedAssetSchema,
  sellOrderSchema,
  marketSchema,
} from '@/schemas/asset.schemas';

export type IAsset = z.infer<typeof assetSchema>;

export type IMedia = z.infer<typeof mediaSchema>;

export type ISellOrder = z.infer<typeof sellOrderSchema>;

export type IAttribute = z.infer<typeof attributeSchema>;

export type PaginatedAsset = z.infer<typeof paginatedAssetSchema>;

export type IMarket = z.infer<typeof marketSchema>;
