import Component from './Component.js';
import api from '../../API/api.js';

export default class Nodes extends Component {
  constructor($target) {
    super($target, 'div', {
      className: 'Nodes',
    });
    // localStorage 에 값이 null이면 []로 초기화
    const initialData = this.get('nodes', 'web') || [];
    const curDir = this.get('curDir', 'web') || '';
    this.set(initialData, 'nodes', ['local', 'web']);
    this.set(curDir, 'curDir', ['local', 'web']);
    this.subscribe('nodes');
    if (initialData.length === 0) {
      this.setData({ id: '', name: 'root', type: 'DIRECTORY' });
    }
    this.bindEvent();
  }

  render() {
    const data = this.get('nodes', 'local');
    const curDir = this.get('curDir', 'local');
    console.log('nodes : curdir', curDir && curDir !== 'root');
    const prevBtn = `<div class="Node" data-node-id='prev' data-node-type='DIRECTORY'><img src="../../src/assets/prev.png"></div>`;
    const dataTemplate = data.map(this.createNodeElement).join('');
    this.HTML(
      curDir && curDir !== 'root' ? prevBtn + dataTemplate : dataTemplate
    );
  }

  createNodeElement = node => {
    const imgPath =
      node.type === 'FILE'
        ? '../../src/assets/file.png'
        : '../../src/assets/directory.png';
    return `<div class='Node' data-node-id=${node.id} data-node-name=${node.name} data-node-type=${node.type} data-node-filepath=${node.filePath}>
                <img src=${imgPath}>
                <div>${node.name}</div>
            </div>`;
  };

  onClick = e => {
    const target = e.target.closest('.Node');
    const type = target.dataset.nodeType;
    const filePath = target.dataset.nodeFilepath;
    const param = {
      type,
      filePath,
      id: target.dataset.nodeId,
      name: target.dataset.nodeName,
    };
    this.setData(param);
  };

  async setData(node) {
    if (node.type === 'DIRECTORY') {
      const breadCrum = this.get('history', 'local');
      let result = '';
      if (node.id === 'prev') {
        breadCrum.pop();
        node = breadCrum.pop();
      }
      result = await this.tryFetchData(api.getDir, node.id, {
        cb: data => data,
      });
      breadCrum.push(node);
      this.set(breadCrum, 'history', ['local', 'web']);
      this.set(node.name, 'curDir', ['local', 'web']);
      this.set(result, 'nodes', ['local', 'web']);
    } else {
      this.set(node.filePath, 'imageViewer', ['local', 'web']);
    }
  }
}
