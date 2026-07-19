import BaseComponent from './BaseComponent';
import store from '../store';
import localStorageUtil from '../utils/LocalStorage';
import { readState, writeState } from '../utils/persist';
import { withLoading } from '../utils/withLoading';
import type { ElementAttributes, FetchOptions, PersistTarget } from '../../types/component';
import type { StoreContext, StoreState } from '../../types/photo';

export default class Component extends BaseComponent {
  constructor(
    $target: HTMLElement,
    tag: string,
    attributes: ElementAttributes = {}
  ) {
    super($target, tag, attributes);
  }

  async tryFetchData<TQuery, TData>(
    fetchFn: (query: TQuery) => Promise<TData>,
    query: TQuery,
    options: FetchOptions<TData> = {}
  ): Promise<TData | undefined> {
    const { cb, showLoading = true } = options;
    return withLoading(async () => {
      const fetched = await fetchFn(query);
      return cb ? cb(fetched) : fetched;
    }, showLoading);
  }

  get<K extends StoreContext>(
    context: K,
    storeType: PersistTarget
  ): StoreState[K] | null | undefined {
    return readState(context, storeType);
  }

  set<K extends StoreContext>(
    data: StoreState[K],
    context: K,
    storeTypes: PersistTarget | PersistTarget[]
  ): void {
    const targets = Array.isArray(storeTypes) ? storeTypes : [storeTypes];

    // local + web 동시 저장이 가장 흔한 패턴
    if (targets.includes('local') && targets.includes('web')) {
      writeState(context, data);
      return;
    }

    targets.forEach(storeType => {
      if (storeType === 'local') {
        store.set(context, data);
      } else if (storeType === 'web') {
        localStorageUtil.set(`dev-matching-${context}`, data);
      }
    });
  }

  subscribe(context: StoreContext): void {
    store.subscribe(context, this);
  }

  render(): void {
    // 하위 클래스에서 구현
  }
}
