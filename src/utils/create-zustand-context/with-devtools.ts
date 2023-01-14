type Cast<T, U> = T extends U ? T : U;
type Write<T, U> = Omit<T, keyof U> & U;
type TakeTwo<T> = T extends {
  length: 0;
}
  ? [undefined, undefined]
  : T extends {
      length: 1;
    }
  ? [...a0: Cast<T, unknown[]>, a1: undefined]
  : T extends {
      length: 0 | 1;
    }
  ? [...a0: Cast<T, unknown[]>, a1: undefined]
  : T extends {
      length: 2;
    }
  ? T
  : T extends {
      length: 1 | 2;
    }
  ? T
  : T extends {
      length: 0 | 1 | 2;
    }
  ? T
  : T extends [infer A0, infer A1, ...unknown[]]
  ? [A0, A1]
  : T extends [infer A0, (infer A1)?, ...unknown[]]
  ? [A0, A1?]
  : T extends [(infer A0)?, (infer A1)?, ...unknown[]]
  ? [A0?, A1?]
  : never;
type StoreDevtools<S> = S extends {
  setState: (...a: infer Sa) => infer Sr;
}
  ? {
      setState<
        A extends
          | string
          | {
              type: unknown;
            }
      >(
        ...a: [...a: TakeTwo<Sa>, action?: A]
      ): Sr;
    }
  : never;
export type WithDevtools<S> = Write<S, StoreDevtools<S>>;
