import { ErrorMessage, Loading } from '../UI';

let isLoading = false;

const showError = (e: unknown): void => {
  if (e instanceof Error) {
    const status =
      'status' in e ? Number((e as Error & { status?: number }).status) : undefined;
    new ErrorMessage(e.message, status);
    return;
  }
  new ErrorMessage('Unknown error');
};

/** 로딩 UI + 중복 호출 방지 + 에러 토스트 */
export const withLoading = async <T>(
  task: () => Promise<T>,
  showLoading = true
): Promise<T | undefined> => {
  if (isLoading) return undefined;
  isLoading = true;
  const loading = showLoading ? new Loading() : null;

  try {
    return await task();
  } catch (e) {
    showError(e);
    return undefined;
  } finally {
    isLoading = false;
    loading?.$.remove();
  }
};
