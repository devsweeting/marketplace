export type ItemAttributes = Record<string, string>;
export type ItemMedia = {
  title: string;
  description?: string;
  url: string;
  sortOrder: number;
  assetId: string;
  fileId: string;
  file?: string;
};

export type SingleListItem = {
  id: string;
  name: string;
  description: string;
  media: ItemMedia[];
  refId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  attributes: ItemAttributes[];
};
