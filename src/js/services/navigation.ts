import api from '../../API/api';
import { readHistory, writeState } from '../utils/persist';
import { withLoading } from '../utils/withLoading';
import type { HistoryNode } from '../../types/photo';

const applyDirectory = (
  node: HistoryNode,
  nodes: Awaited<ReturnType<typeof api.getDir>>,
  history: HistoryNode[]
): void => {
  writeState('history', history);
  writeState('curDir', node.name);
  writeState('nodes', nodes);
};

/** 폴더 진입 (history에 현재 노드를 추가) */
export const openDirectory = async (node: HistoryNode): Promise<void> => {
  await withLoading(async () => {
    const result = await api.getDir(node.id);
    const history = [...readHistory(), node];
    applyDirectory(node, result, history);
  });
};

/** 상위 폴더로 이동 (prev) */
export const goBack = async (): Promise<void> => {
  const history = [...readHistory()];
  if (history.length <= 1) return;

  history.pop();
  const parent = history[history.length - 1];
  if (!parent) return;

  await withLoading(async () => {
    const result = await api.getDir(parent.id);
    applyDirectory(parent, result, history);
  });
};

/** 브레드크럼의 특정 경로로 점프 */
export const goToHistory = async (id: string): Promise<void> => {
  const history = [...readHistory()];
  const loc = history.findIndex(item => item.id === id);
  if (loc < 0) return;

  const node = history[loc];
  const nextHistory = history.slice(0, loc + 1);

  await withLoading(async () => {
    const result = await api.getDir(node.id);
    applyDirectory(node, result, nextHistory);
  });
};

/** 파일(이미지) 열기 */
export const openFile = (filePath: string): void => {
  writeState('imageViewer', filePath);
};

/** 앱 최초 진입용 root 로드 */
export const openRoot = async (): Promise<void> => {
  await openDirectory({ id: '', name: 'root', type: 'DIRECTORY' });
};
