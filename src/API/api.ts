import { getMockDir } from './mockData';
import type { PhotoNode } from '../types/photo';

/** 로딩 UI를 볼 수 있도록 짧은 지연 (네트워크 흉내) */
const MOCK_DELAY_MS = 400;

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const api = {
  getDir: async (dir?: string): Promise<PhotoNode[]> => {
    await delay(MOCK_DELAY_MS);
    return getMockDir(dir);
  },
};

export default api;
