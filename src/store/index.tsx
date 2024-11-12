'use client';

import merge from 'lodash/fp/merge';
import { useSyncExternalStore } from 'react';

type OnStoreChange<T> = (data: T) => void;
type Unsubscriber = () => void;

type StateInitializer<T> = {
  defaultValue: T;
}

type Store<T> = {
  state: T;
  setState: (data: Partial<T>) => void;
  subscribe: (callback: OnStoreChange<T>) => Unsubscriber;
  getSnapshot: () => T;
  getInitialSnapshot: () => T;
}

export const createStore = <T,>({ defaultValue }: StateInitializer<T>): Store<T> => {
  type State = typeof defaultValue; 
  // eslint-disable-next-line prefer-const
  let state: State = defaultValue;
  const initialState = defaultValue;
  const listener = new Set<OnStoreChange<State>>();

  const setState = (data: Partial<State>) => {
    state = merge(state, data);

    listener.forEach(s => s(state));
  }

  const subscribe = (onStoreChange: OnStoreChange<State>) => {
    listener.add(onStoreChange);

    return () => listener.delete(onStoreChange);
  }

  return {
    state,
    setState,
    subscribe,
    getSnapshot: () => state,
    getInitialSnapshot: () => initialState, 
  }
};

export const useStore = <T,>(store: Store<T>) => {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getInitialSnapshot);

  return [
    state,
    store.setState,
  ] as const;
}
