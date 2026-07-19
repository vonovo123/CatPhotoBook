class LocalStorageUtil {
  get = <T>(key: string): T | null => {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  };

  set = (key: string, value: unknown): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };
}

const localStorageUtil = new LocalStorageUtil();
export default localStorageUtil;
