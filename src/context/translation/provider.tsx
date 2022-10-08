import { createContext } from '$utils/create-context';
import { useMemo } from 'react';
import { stringToLabel } from '$utils';
import { TranslationContext } from './model';

const [Provider, useTranslation] = createContext<TranslationContext>();

export { useTranslation };

export const useGetLabel = (str: string) => useTranslation(s => s.getFieldLabel)(str);

export type TranslationProviderProps = Pick<TranslationContext, 'translation'>;

export const TranslationProvider: React.FC<
  React.PropsWithChildren<TranslationProviderProps>
> = ({ translation, children }) => {
  const value = useMemo<TranslationContext>(
    () => ({
      getFieldLabel: (str, resolve) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (translation[str] ?? (resolve ? stringToLabel(str) : undefined)) as any,
      translation,
    }),
    [translation]
  );
  return <Provider value={value}>{children}</Provider>;
};
