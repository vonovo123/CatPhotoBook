import Component from './Component.js';
import api from '../../API/api.js';

export default class Nodes extends Component {
  constructor($target) {
    super($target, 'div', {
      className: 'Nodes',
    });
    // localStorage 에 값이 null이면 []로 초기화
    const initialData = this.get('nodes', 'web') || [];
    this.set(initialData, 'nodes', ['local', 'web']);
    this.subscribe('nodes');
    if (initialData.length === 0) {
      this.setData({ id: '', name: 'root' });
    }
    this.bindEvent();
  }

  async setData(node) {
    const result = await this.tryFetchData(api.getDir, node.id, {
      cb: data => data,
    });
    const breadCrum = this.get('history', 'local');
    this.set(result, 'nodes', ['local', 'web']);
    breadCrum.push(node);
    this.set(breadCrum, 'history', ['local', 'web']);
  }

  render() {
    const data = this.get('nodes', 'local');
    this.HTML(data.map(this.createNodeElement).join(''));
  }

  createNodeElement = node => {
    const imgPath =
      node.type === 'FILE'
        ? '../../src/assets/file.png'
        : '../../src/assets/directory.png';
    return `<div class='Node' data-node-id=${node.id} data-node-name=${node.name}>
                <img src=${imgPath}>
                <div>${node.name}</div>
            </div>`;
  };

  onClick = e => {
    const target = e.target.closest('.Node');
    const param = {
      id: target.dataset.nodeId,
      name: target.dataset.nodeName,
    };
    this.setData(param);
  };
}
