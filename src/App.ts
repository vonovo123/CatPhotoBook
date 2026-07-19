import Component from './js/components/Component';
import Nodes from './js/components/Nodes';
import BreadCrum from './js/components/BreadCrum';
import ImageViewer from './js/components/ImageViewer';

export default class App extends Component {
  children: Array<BreadCrum | Nodes | ImageViewer>;

  constructor($target: HTMLElement) {
    super($target, 'main', {
      class: 'app',
    });
    this.children = [
      new BreadCrum(this.$),
      new Nodes(this.$),
      new ImageViewer(this.$),
    ];
  }

  render = (): void => {
    this.children.forEach(child => {
      child.render();
    });
  };
}
