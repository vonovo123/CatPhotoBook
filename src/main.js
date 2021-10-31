import App from './App.js';

const loadApp = () => {
  const app = new App(document.querySelector('#app'));
  app.render();
};
loadApp();
