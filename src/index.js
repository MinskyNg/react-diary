import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import DevTools from './containers/DevTools';
import DiaryApp from './containers/App';
require('normalize.css/normalize.css');
require('./styles/App.scss');


ReactDOM.render(
    <Provider store={store}>
        <div>
            <DiaryApp />
            { process.env.NODE_ENV !== 'production' && <DevTools /> }
        </div>
    </Provider>,
    document.getElementById('app')
);
