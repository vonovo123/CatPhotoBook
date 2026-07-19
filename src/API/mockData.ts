import type { PhotoNode } from '../types/photo';

/**
 * 과제 API와 동일한 노드 형태.
 * filePath는 ImageViewer의 imagePrefix(https://cataas.com)와 조합합니다.
 * name은 CATAAS 태그/내용과 맞춰 두었습니다.
 */
const mockDirectoryMap: Record<string, PhotoNode[]> = {
  '': [
    {
      id: 'dir-orange',
      name: '오렌지 고양이',
      type: 'DIRECTORY',
      filePath: null,
      parent: null,
    },
    {
      id: 'dir-sleep',
      name: '잠자는 고양이',
      type: 'DIRECTORY',
      filePath: null,
      parent: null,
    },
    {
      id: 'file-black',
      name: '검은 고양이',
      type: 'FILE',
      // tags: cute, black
      filePath: '/cat/0mstmOIucwiN80jb',
      parent: null,
    },
    {
      id: 'file-cute',
      name: '귀여운 고양이',
      type: 'FILE',
      // tags: cute
      filePath: '/cat/0GC9MRUAqxhBzPyA',
      parent: null,
    },
  ],
  'dir-orange': [
    {
      id: 'file-garfield',
      name: '가필드 느낌',
      type: 'FILE',
      // tags: cute, orange, funny, lasagna, garfield
      filePath: '/cat/0ztFbDrgDV2K7yJ1',
      parent: { id: 'dir-orange' },
    },
    {
      id: 'file-orange-sleepy',
      name: '졸린 오렌지',
      type: 'FILE',
      // tags: cute, orange, sleepy, tired
      filePath: '/cat/1DrcyohjhwcNaRIz',
      parent: { id: 'dir-orange' },
    },
    {
      id: 'file-fat-orange',
      name: '통통한 오렌지',
      type: 'FILE',
      // tags: orange, fat
      filePath: '/cat/2EGeQU9fUQSmO2Te',
      parent: { id: 'dir-orange' },
    },
  ],
  'dir-sleep': [
    {
      id: 'dir-bed',
      name: '침대에서',
      type: 'DIRECTORY',
      filePath: null,
      parent: { id: 'dir-sleep' },
    },
    {
      id: 'file-dream',
      name: '꿈나라',
      type: 'FILE',
      // tags: sleep, dream
      filePath: '/cat/6NqaocCuq3ty0ojQ',
      parent: { id: 'dir-sleep' },
    },
  ],
  'dir-bed': [
    {
      id: 'file-bed-sleep',
      name: '이불 속 낮잠',
      type: 'FILE',
      // tags: Black, Gray, Bed, cute, sleep
      filePath: '/cat/28ZtVybuyptnWzTM',
      parent: { id: 'dir-bed' },
    },
    {
      id: 'file-kitten',
      name: '아기 고양이',
      type: 'FILE',
      // tags: cute, kitten, tiny, tabby
      filePath: '/cat/3B3hpEDNeHSVKii0',
      parent: { id: 'dir-bed' },
    },
  ],
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const getMockDir = (dirId?: string): PhotoNode[] => {
  const key = dirId || '';
  const nodes = mockDirectoryMap[key];

  if (!nodes) {
    throw new ApiError(`Directory not found: ${key || 'root'}`, 404);
  }

  return nodes.map(node => ({ ...node }));
};
