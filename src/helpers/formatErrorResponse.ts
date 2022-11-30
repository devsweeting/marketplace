type ErrorResponse = {
  [key: string]: string[];
};

type NestedErrorResponse = {
  [key: string]: string[] | Record<string, string[]>;
};

export const formatErrorResponse = (errors: ErrorResponse): { [key: string]: string } => {
  return Object.entries(errors).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value[0] ?? null }),
    {},
  );
};

export const formatNestedErrorResponse = (errors: NestedErrorResponse) => {
  return Object.entries(errors).reduce((acc, [key, value]) => {
    const formattedValue = Array.isArray(value) ? value[0] ?? null : formatErrorResponse(value);

    return { ...acc, [key]: formattedValue };
  }, {});
};
