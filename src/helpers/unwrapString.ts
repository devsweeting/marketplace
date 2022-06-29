export const unwrapString = (query: string | string[] | undefined): string | undefined => {
  if (!Array.isArray(query)) {
    return query;
  }

  return query[0];
};
