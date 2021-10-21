import Component from './js/components/Component.js';
import api from './API/api.js';

export default class App extends Component {
  constructor($target) {
    super($target, 'main', {
      class: 'app',
    });
    // BreadCrum
    // nodes
    // ImageViewer
    //
    this.bindEvent();
    this.tryFetchData(api.getDir, '', {
      cb: data => data,
    });
  }

  onClick = () => {
    console.log('onClick');
  };
}
