import Component from './Component';
import prevIcon from '../../assets/prev.png';
import fileIcon from '../../assets/file.png';
import directoryIcon from '../../assets/directory.png';
import { escapeHtml } from '../utils/escapeHtml';
import {
  goBack,
  openDirectory,
  openFile,
  openRoot,
} from '../services/navigation';
import type { NodeType, PhotoNode } from '../../types/photo';

export default class Nodes extends Component {
  constructor($target: HTMLElement) {
    super($target, 'div', {
      className: 'Nodes',
      role: 'list',
      ariaLabel: '파일 목록',
    });

    const initialData = this.get('nodes', 'web') || [];
    const curDir = this.get('curDir', 'web') || '';
    this.set(initialData, 'nodes', ['local', 'web']);
    this.set(curDir, 'curDir', ['local', 'web']);
    this.subscribe('nodes');

    if (initialData.length === 0) {
      void openRoot();
    }
    this.bindEvent();
  }

  render = (): void => {
    const data = this.get('nodes', 'local') || [];
    const curDir = this.get('curDir', 'local');
    const prevBtn = `<div class="Node" role="listitem" data-node-id="prev" data-node-name=".." data-node-type="DIRECTORY" aria-label="상위 폴더"><img src="${prevIcon}" alt=""><div>..</div></div>`;
    const dataTemplate = data.map(this.createNodeElement).join('');
    this.HTML(
      curDir && curDir !== 'root' ? prevBtn + dataTemplate : dataTemplate
    );
  };

  createNodeElement = (node: PhotoNode): string => {
    const imgPath = node.type === 'FILE' ? fileIcon : directoryIcon;
    const id = escapeHtml(node.id);
    const name = escapeHtml(node.name);
    const type = escapeHtml(node.type);
    const filePath = escapeHtml(node.filePath || '');
    const label = node.type === 'DIRECTORY' ? `${name}/` : name;
    const kind = node.type === 'DIRECTORY' ? '폴더' : '파일';

    return `<div class="Node" role="listitem" data-node-id="${id}" data-node-name="${name}" data-node-type="${type}" data-node-filepath="${filePath}" aria-label="${kind} ${name}">
                <img src="${imgPath}" alt="">
                <div>${label}</div>
            </div>`;
  };

  onClick = (e: Event): void => {
    const target = (e.target as HTMLElement | null)?.closest('.Node') as HTMLElement | null;
    if (!target) return;

    const { nodeType, nodeFilepath, nodeId, nodeName } = target.dataset;
    if (!nodeId) return;

    if (nodeId === 'prev') {
      void goBack();
      return;
    }

    if (!nodeType || nodeName === undefined) return;

    if (nodeType === 'DIRECTORY') {
      void openDirectory({
        id: nodeId,
        name: nodeName,
        type: nodeType as NodeType,
      });
      return;
    }

    openFile(nodeFilepath || '');
  };
}
