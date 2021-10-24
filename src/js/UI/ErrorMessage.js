import BaseComponent from '../components/BaseComponent.js';

const DURATION = 2000;
export default class ErrorMessage extends BaseComponent {
  constructor(message, status) {
    super(document.body, 'div', {
      className: 'ErrorMessage',
      innerHTML: `${status ? `<div>${status}</div>` : ''}
          <div>${message}</div>
        `,
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
