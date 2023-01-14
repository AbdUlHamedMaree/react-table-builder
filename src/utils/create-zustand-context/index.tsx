import { createContext, useContext, useState } from 'react';
import type { StoreApi, StateCreator } from 'zustand';
import { useStore as useZustandStore, createStore } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { WithImmer, Write } from './with-immer';
import type { WithDevtools } from './with-devtools';

type StoreType<TState, TActions> = WithImmer<
  WithDevtools<StoreApi<Write<TState, TActions>>>
>;

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;
type WithReact<S extends StoreApi<unknown>> = S & {
  getServerState?: () => ExtractState<S>;
};

export type StateSelector<S extends WithReact<StoreApi<unknown>>> = {
  (): ExtractState<S>;
  <U>(selector: (state: ExtractState<S>) => U, equals?: (a: U, b: U) => boolean): U;
};

export type ProviderProps<TState extends object, TActions extends object> = {
  name?: string;
  initialState: TState;
  actions: StateCreator<
    TState & TActions,
    [['zustand/devtools', never], ['zustand/immer', never]],
    [],
    TActions
  >;
};

export const createZustandContext = <
  TState extends object,
  TActions extends object
>() => {
  const Context = createContext<StoreType<TState, TActions> | null>(null);

  const useStore: StateSelector<StoreApi<TState & TActions>> = ((
    selector: any,
    equals: any
  ) => {
    const store = useContext(Context);
    if (!store) throw new Error('using columns outside a provider');
    return useZustandStore(store, selector, equals);
  }) as any;

  const Provider: React.FC<React.PropsWithChildren<ProviderProps<TState, TActions>>> = ({
    initialState,
    name,

    actions,

    children,
  }) => {
    const [store] = useState<any>(() =>
      createStore(devtools(combine(initialState, immer(actions as any)), { name }))
    );

    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  return [Provider, useStore] as const;
};
