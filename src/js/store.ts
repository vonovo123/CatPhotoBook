import type { StoreContext, StoreState } from '../types/photo';

interface StoreSubscriber {
  render: () => void;
}

interface StoreEntry<T> {
  data: T;
  elements: StoreSubscriber[];
}

type StoreMap = {
  [K in StoreContext]?: StoreEntry<StoreState[K]>;
};

class Store {
  private store: StoreMap = {};

  has(context: StoreContext): boolean {
    return context in this.store;
  }

  get<K extends StoreContext>(context: K): StoreState[K] {
    const entry = this.store[context];
    if (!entry) {
      throw new Error(`Store key "${context}" is not initialized`);
    }
    return entry.data as StoreState[K];
  }

  set<K extends StoreContext>(context: K, data: StoreState[K]): StoreEntry<StoreState[K]> {
    const existing = this.store[context] as StoreEntry<StoreState[K]> | undefined;

    if (!existing) {
      const created: StoreEntry<StoreState[K]> = {
        data,
        elements: [],
      };
      this.store[context] = created as StoreMap[K];
      return created;
    }

    existing.data = data;
    this.publish(context);
    return existing;
  }

  subscribe(context: StoreContext, element: StoreSubscriber): void {
    const entry = this.store[context];
    if (!entry) {
      throw new Error(`Cannot subscribe to uninitialized store key "${context}"`);
    }
    entry.elements.push(element);
  }

  publish(context: StoreContext): void {
    const entry = this.store[context];
    if (!entry) return;
    entry.elements.forEach(element => {
      element.render();
    });
  }
}

const store = new Store();
export default store;
