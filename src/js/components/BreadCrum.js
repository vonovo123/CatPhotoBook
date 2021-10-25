import Component from './Component.js';

export default class BreadCrum extends Component {
  constructor($target) {
    super($target, 'div', {
      className: 'Breadcrumb',
    });
    const initialBreadCrum = this.get('history', 'web') || [];
    this.set(initialBreadCrum, 'history', ['local', 'web']);
    this.subscribe('history');
  }

  createBreadCrum = (node, idx) => {
    return `<div class='nav-item' data-index=${node.id}>${node.name}</div>`;
  };

  render = () => {
    const data = this.get('history', 'local');
    console.log(data);
    this.HTML(data.map(this.createBreadCrum).join(''));
  };
}
