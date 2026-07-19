import Component from './Component';
import { escapeHtml } from '../utils/escapeHtml';

const imagePrefix = 'https://cataas.com';

const resolveImageUrl = (filePath: string): string | null => {
  if (!filePath.startsWith('/cat/')) return null;
  return `${imagePrefix}${filePath}`;
};

export default class ImageViewer extends Component {
  constructor($target: HTMLElement) {
    super($target, 'div', {
      className: 'Modal ImageViewer',
      role: 'dialog',
      ariaModal: 'true',
      ariaLabel: '이미지 미리보기',
    });
    const initialData = this.get('imageViewer', 'web') || '';
    this.set(typeof initialData === 'string' ? initialData : '', 'imageViewer', [
      'local',
      'web',
    ]);
    this.subscribe('imageViewer');
    this.bindEvent();
    document.addEventListener('keydown', this.onDocumentKeydown);
  }

  private isOpen(): boolean {
    return this.$.style.display === 'block';
  }

  onDocumentKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  };

  onClick = (e: Event): void => {
    if (e.target === this.$) {
      this.close();
    }
  };

  close = (): void => {
    this.set('', 'imageViewer', ['local', 'web']);
  };

  render = (): void => {
    const data = this.get('imageViewer', 'local') || '';
    const imageUrl = data ? resolveImageUrl(data) : null;

    if (imageUrl) {
      this.$.style.display = 'block';
      this.HTML(
        `<div class="content"><img src="${escapeHtml(imageUrl)}" alt="고양이 사진"></div>`
      );
      return;
    }

    this.$.style.display = 'none';
    this.HTML('');
  };
}
