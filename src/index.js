import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import store from './store';
import routes from './routes';
import DevTools from './containers/DevTools';
import marked from 'marked';
import hljs from 'highlight.js';
require('normalize.css/normalize.css');
require('highlight.js/styles/github.css');
require('./styles/App.scss');


// 配置markdown解析器和highlight.js
marked.setOptions({ highlight: code => hljs.highlightAuto(code).value });


ReactDOM.render(
    <Provider store={store}>
         <div style={{ height: '100%' }}>
            <Router children={routes} history={browserHistory} />
            { process.env.NODE_ENV !== 'production' && <DevTools /> }
        </div>
    </Provider>,
    document.getElementById('app')
);
