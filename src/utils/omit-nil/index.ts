export const omitNil = <T>(value?: unknown, toReturn?: T) => {
  if (value == null) return '-';
  return toReturn;
};
