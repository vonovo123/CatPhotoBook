/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import BaseComponent from './BaseComponent.js';
import { ErrorMessage, Loading } from '../UI/index.js';

export default class Component extends BaseComponent {
  constructor($target, tag, attributes) {
    super($target, tag, attributes);
  }

  handleError(e) {
    new ErrorMessage(e.message, e.status);
  }

  isLoading;

  async tryFetchData(fetchData, query, options) {
    if (!options) {
      options = query;
    }

    const { cb, showLoading = true, cache = true } = options || {};
    // 중복호출 방지
    if (this.isLoading) return;
    this.isLoading = true;
    const loading = showLoading && new Loading();
    try {
      let data = await fetchData(query);
      console.log(data);
      data = cb(data);
      return data;
    } catch (e) {
      console.log(e);
      this.handleError(e);
    } finally {
      this.isLoading = false;
      loading && loading.$.remove();
    }
  }
}
