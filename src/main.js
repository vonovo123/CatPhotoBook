import App from './App.js';
import About from './About.js';

const loadApp = () => {
  const app = new App(document.querySelector('#app'));
  app.render();
};
loadApp();

const aboutBtn = document.querySelector('#about');
const appMainBtn = document.querySelector('#appMain');
aboutBtn.addEventListener('click', () => {
  history.pushState({}, '', '/about');
  if (document.querySelector('.app')) {
    document.querySelector('.app').remove();
    const app = new About(document.querySelector('#app'));
    app.render();
  }
});
appMainBtn.addEventListener('click', () => {
  history.pushState({}, '', '/');
  if (document.querySelector('.about')) {
    document.querySelector('.about').remove();
    const app = new App(document.querySelector('#app'));
    app.render();
  }
});
