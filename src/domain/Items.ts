export type ItemAttribute = {
  trait: string;
  value: string;
  display: string | null;
};

export type ItemMedia = {
  title: string;
  description: string | null;
  url: string;
  sortOrder: number;
  assetId: string;
  fileId: string;
  file: string | null;
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
  attributes: ItemAttribute[];
};
