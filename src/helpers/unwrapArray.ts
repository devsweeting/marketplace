export const unwrapArray = (query: string | string[] | undefined): string[] => {
  if (Array.isArray(query)) {
    return query;
  }

  if (!query) {
    return [];
  }

  return [query];
};
