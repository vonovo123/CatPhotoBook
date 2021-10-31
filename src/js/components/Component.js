/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import BaseComponent from './BaseComponent.js';
import { ErrorMessage, Loading } from '../UI/index.js';
import store from '../store.js';
import localStorage from '../utils/LocalStorage.js';

const getData = (context, storeType) => {
  switch (storeType) {
    case 'local':
      return store.get(context);
    case 'web':
      return localStorage.get(`dev-matching-${context}`);
    default:
  }
};

const setData = (data, context, storeType) => {
  switch (storeType) {
    case 'local':
      store.set(context, data);
      break;
    case 'web':
      localStorage.set(`dev-matching-${context}`, data);
      break;
    default:
  }
};
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
      data = cb(data);
      return data;
    } catch (e) {
      this.handleError(e);
    } finally {
      this.isLoading = false;
      loading && loading.$.remove();
    }
  }

  get(context, storeType) {
    return getData(context, storeType);
  }

  set(data, context, storeTypes) {
    if (typeof storeTypes === 'string') {
      setData(data, context, storeTypes);
      return;
    }
    if (Array.isArray(storeTypes)) {
      storeTypes.forEach(storeType => {
        setData(data, context, storeType);
      });
    }
  }

  subscribe(context) {
    store.subscribe(context, this);
  }
}
