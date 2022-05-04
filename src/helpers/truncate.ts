export const truncateName = (name: string, length: number): string => {
  if (name.length > length) {
    return `${name.slice(0, length)}..`;
  } else {
    return name;
  }
};
