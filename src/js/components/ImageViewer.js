import Component from './Component.js';

const imagePrefix =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default class ImageViewer extends Component {
  constructor($target) {
    super($target, 'div', {
      className: 'Modal ImageViewer',
    });
    const initialData = this.get('imageViewer', 'web') || '';
    this.set(initialData, 'imageViewer', ['local', 'web']);
    this.subscribe('imageViewer');
    this.bindEvent();
  }

  onClick = () => {
    this.set([], 'imageViewer', ['local', 'web']);
  };

  render() {
    const data = this.get('imageViewer', 'local');
    if (data.length !== 0) {
      document.querySelector('.Modal').style.display = 'block';
      this.HTML(
        `<div class="content">${
          data ? `<img src="${imagePrefix}${data}">` : ''
        }</div>`
      );
    } else {
      document.querySelector('.Modal').style.display = 'none';
    }
  }
}
