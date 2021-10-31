import fetchData from './fetchData.js';

const API_END_POINT =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/';
const api = {
  getDir: dir => fetchData(`${API_END_POINT}${dir}`, 'getDir'),
};

export default api;
