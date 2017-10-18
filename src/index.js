import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/index.css';
import App from './components/App/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}>
  <div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
