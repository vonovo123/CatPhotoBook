import Component from './js/components/Component.js';
import Nodes from './js/components/Nodes.js';
import BreadCrum from './js/components/BreadCrum.js';
import ImageViewer from './js/components/ImageViewer.js';

// import api from './API/api.js';
export default class App extends Component {
  constructor($target) {
    super($target, 'main', {
      class: 'about',
      innerHTML: 'ABOUT',
    });
    this.children = [];
  }

  render = () => {
    this.children.forEach(child => {
      child.render && child.render();
    });
  };
}
