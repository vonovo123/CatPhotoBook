import BaseComponent from '../components/BaseComponent';
import nyanCat from '../../assets/nyan-cat.gif';

export default class Loading extends BaseComponent {
  constructor() {
    super(document.body, 'div', {
      className: 'Loading Modal',
      innerHTML: `<div class="content">
                 <img src="${nyanCat}" alt="로딩 중">
                </div>`,
    });
  }
}
