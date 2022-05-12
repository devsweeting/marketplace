export type ItemAttributes = Record<string, string>;
export type SingleListItem = {
  id: string;
  name: string;
  description: string;
  media: [
    {
      title: string;
      description: null | string;
      url: string;
      sortOrder: number;
      assetId: string;
      fileId: string;
      file: null | string;
    },
  ];
  refId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  attributes: ItemAttributes[];
};
