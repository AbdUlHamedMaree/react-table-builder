export type TranslationContext = {
  translation: Record<string, string | undefined>;
  getFieldLabel: <R extends boolean = false>(
    str: string,
    resolve?: R
  ) => R extends true ? string : string | undefined;
};
