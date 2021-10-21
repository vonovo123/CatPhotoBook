import BaseComponent from '../components/BaseComponent.js';

export default class Loading extends BaseComponent {
  constructor() {
    super(document.body, 'div', {
      className: 'Loading Modal',
      innerHTML: `<div class="content">
                 <img src="../../src/assets/nyan-cat.gif">
                </div>`,
    });
    setTimeout(() => {
      this.$.remove();
    }, 2000);
  }
}
