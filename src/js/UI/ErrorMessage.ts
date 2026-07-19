import BaseComponent from '../components/BaseComponent';
import { escapeHtml } from '../utils/escapeHtml';

const DURATION = 2000;

export default class ErrorMessage extends BaseComponent {
  constructor(message: string, status?: number) {
    const safeMessage = escapeHtml(message);
    const statusHtml =
      status !== undefined ? `<div>${escapeHtml(String(status))}</div>` : '';

    super(document.body, 'div', {
      className: 'ErrorMessage',
      innerHTML: `${statusHtml}<div>${safeMessage}</div>`,
      styles: {
        position: 'fixed',
        zIndex: 1001,
        left: '50%',
        top: '100px',
        transform: 'translate(-50%, -50%)',
      },
    });

    setTimeout(() => {
      this.$.remove();
    }, DURATION);
  }
}
