import App from './App';

const loadApp = (): void => {
  const root = document.querySelector('#app');
  if (!(root instanceof HTMLElement)) {
    throw new Error('#app element not found');
  }
  const app = new App(root);
  app.render();
};

loadApp();
