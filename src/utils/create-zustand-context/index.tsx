import createContext from 'zustand/context';
import { Draft } from 'immer';
import { useCallback } from 'react';
import { StoreApi } from 'zustand';
import { AnyObject, StateCreator } from '$types';
import { createStore } from '../create-store';

export type ProviderProps<TState extends AnyObject, TActions extends AnyObject> = {
  name: string;
  initialState: TState;
  actions: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>;
  devtools?: boolean;
  persist?: boolean;
};

export const createZustandContext = <
  TState extends AnyObject,
  TActions extends AnyObject
>() => {
  const { Provider: ContextProvider, useStore } =
    createContext<StoreApi<TState & TActions>>();
  const Provider: React.FC<React.PropsWithChildren<ProviderProps<TState, TActions>>> = ({
    actions,
    initialState,
    name,
    devtools = false,
    persist = false,
    children,
  }) => {
    const storeCreator = useCallback(
      () =>
        createStore({ devtools, persist, name })<TState, TActions>(initialState, actions),
      [actions, devtools, initialState, name, persist]
    );
    return <ContextProvider createStore={storeCreator}>{children}</ContextProvider>;
  };

  return [Provider, useStore] as const;
};
