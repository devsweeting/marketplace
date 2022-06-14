export const getStringFromQuery = (query: string | string[] | undefined): string | undefined => {
  if (!Array.isArray(query)) {
    return query;
  }

  return query[0];
};
