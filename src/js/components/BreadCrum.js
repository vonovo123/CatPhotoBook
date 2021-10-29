import Component from './Component.js';
import api from '../../API/api.js';

export default class BreadCrum extends Component {
  constructor($target) {
    super($target, 'div', {
      className: 'Breadcrumb',
    });
    const initialBreadCrum = this.get('history', 'web') || [];
    this.set(initialBreadCrum, 'history', ['local', 'web']);
    this.subscribe('history');
    this.bindEvent();
  }

  createBreadCrum = node => {
    return `<div class='nav-item' data-node-id=${node.id}>${node.name}</div>`;
  };

  render = () => {
    const data = this.get('history', 'local');
    this.HTML(data.map(this.createBreadCrum).join(''));
  };

  onClick = e => {
    const id = e.target.closest('.nav-item').dataset.nodeId;
    const name = e.target.closest('.nav-item').innerText;
    const curDir = this.get('curDir', 'web');
    if (name !== curDir) this.setData(id);
  };

  async setData(id) {
    console.log(`setData`);
    const breadCrums = this.get('history', 'web');
    let node = null;
    let loc = -1;
    for (let i = 0; i < breadCrums.length; i++) {
      if (breadCrums[i].id === id) {
        node = breadCrums[i];
        loc = i;
        break;
      }
    }
    if (node) {
      breadCrums.splice(loc + 1);
      const result = await this.tryFetchData(api.getDir, node.id, {
        cb: data => data,
      });
      this.set(node.name, 'curDir', ['local', 'web']);
      this.set(breadCrums, 'history', ['web', 'local']);
      this.set(result, 'nodes', ['local', 'web']);
    }
  }
}
