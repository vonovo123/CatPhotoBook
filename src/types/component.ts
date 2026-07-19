export type PersistTarget = 'local' | 'web';

export type ElementAttributes = {
  class?: string;
  className?: string;
  innerHTML?: string;
  styles?: Record<string, string | number>;
  [key: string]: unknown;
};

export interface FetchOptions<T> {
  cb?: (data: T) => T;
  showLoading?: boolean;
  cache?: boolean;
}
