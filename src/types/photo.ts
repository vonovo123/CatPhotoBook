export type NodeType = 'FILE' | 'DIRECTORY';

export interface PhotoNode {
  id: string;
  name: string;
  type: NodeType;
  filePath: string | null;
  parent: { id: string } | null;
}

/** 브레드크럼/히스토리에 쌓이는 경로 노드 */
export type HistoryNode = Pick<PhotoNode, 'id' | 'name' | 'type'> &
  Partial<Pick<PhotoNode, 'filePath' | 'parent'>>;

export type StoreContext = 'nodes' | 'history' | 'curDir' | 'imageViewer';

export interface StoreState {
  nodes: PhotoNode[];
  history: HistoryNode[];
  curDir: string;
  /** 열린 이미지 경로. 닫히면 빈 문자열 */
  imageViewer: string;
}
