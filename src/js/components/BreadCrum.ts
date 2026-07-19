import Component from './Component';
import { escapeHtml } from '../utils/escapeHtml';
import { goToHistory } from '../services/navigation';
import type { HistoryNode } from '../../types/photo';

export default class BreadCrum extends Component {
  constructor($target: HTMLElement) {
    super($target, 'div', {
      className: 'Breadcrumb',
      role: 'navigation',
      ariaLabel: '현재 경로',
    });
    const initialBreadCrum = this.get('history', 'web') || [];
    this.set(initialBreadCrum, 'history', ['local', 'web']);
    this.subscribe('history');
    this.bindEvent();
  }

  createBreadCrum = (node: HistoryNode): string => {
    const id = escapeHtml(node.id);
    const name = escapeHtml(node.name);
    const label =
      node.type === 'DIRECTORY' || node.name === 'root' ? `${name}/` : name;
    return `<button type="button" class="nav-item" data-node-id="${id}">${label}</button>`;
  };

  render = (): void => {
    const data = this.get('history', 'local') || [];
    this.HTML(data.map(this.createBreadCrum).join(''));
  };

  onClick = (e: Event): void => {
    const target = (e.target as HTMLElement | null)?.closest(
      '.nav-item'
    ) as HTMLElement | null;
    if (!target?.hasAttribute('data-node-id')) return;

    // root id는 '' 이라 falsy 체크하면 안 됨
    const id = target.getAttribute('data-node-id') ?? '';
    const history = this.get('history', 'local') || [];
    const current = history[history.length - 1];
    if (current?.id === id) return;

    void goToHistory(id);
  };
}
