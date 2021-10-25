import Component from './Component.js';

const imagePrefix =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default class ImageViewer extends Component {
  constructor($target) {
    super($target, 'div', {
      className: 'Modal ImageViewer',
    });
    const initialData = this.get('imageViewer', 'web') || [];
    this.set(initialData, 'imageViewer', ['local', 'web']);
    this.subscribe('imageViewer');
  }

  render() {
    const data = this.get('imageViewer', 'local');
    console.log((document.querySelector('.Modal').style.display = 'block'));
    this.HTML(
      `<div class="content">${
        data ? `<img src="${imagePrefix}${data}">` : ''
      }</div>`
    );
  }
}
