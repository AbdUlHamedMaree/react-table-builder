import type { WritableDraft } from 'immer/dist/internal';
import type { StateSetter } from '$types';

export const stateSetterHandler =
  <TState extends Record<string, any>, TKey extends keyof TState>(
    set: (fn: (draft: WritableDraft<TState>) => void) => void,
    name: TKey
  ): StateSetter<TState[TKey]> =>
  value =>
    set(state => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state[name] =
        typeof value === 'function' ? (value as Function)(state[name]) : value;
    });
