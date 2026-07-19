import store from '../store';
import localStorageUtil from './LocalStorage';
import type { PersistTarget } from '../../types/component';
import type { StoreContext, StoreState } from '../../types/photo';

const storageKey = (context: StoreContext) => `dev-matching-${context}`;

export const readState = <K extends StoreContext>(
  context: K,
  storeType: PersistTarget
): StoreState[K] | null | undefined => {
  switch (storeType) {
    case 'local':
      return store.get(context);
    case 'web':
      return localStorageUtil.get<StoreState[K]>(storageKey(context));
    default:
      return undefined;
  }
};

/** 메모리 Store + localStorage에 동시에 저장 */
export const writeState = <K extends StoreContext>(
  context: K,
  data: StoreState[K]
): void => {
  store.set(context, data);
  localStorageUtil.set(storageKey(context), data);
};

export const readHistory = (): StoreState['history'] => {
  try {
    return store.get('history') || [];
  } catch {
    return readState('history', 'web') || [];
  }
};
