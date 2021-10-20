import BaseComponent from './src/js/components/BaseComponent.js';

export default class App extends BaseComponent {
  constructor($target) {
    super($target, 'main', {
      class: 'app',
      styles: {
        backgroundColor: 'orange',
      },
    });
    this.bindEvent();
    this.HTML(`<div id='sub'></div>`);
    this.addHTML(`sub`);
  }

  onClick = () => {
    console.log('onClick');
  };
}
