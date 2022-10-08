import { StoreApi } from 'zustand';
import { AnyObject } from '../popular';

export type StateCreator<
  TState extends AnyObject,
  TActions extends AnyObject = TState,
  TSetState = StoreApi<TState>['setState'],
  TGetState = StoreApi<TState & TActions>['getState'],
  TStoreApi = StoreApi<TState & TActions>
> = (set: TSetState, get: TGetState, api: TStoreApi) => TActions;
