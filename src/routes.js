import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Diary from './container/Diary';
import Home from './container/Home';
import Archive from './container/Archive';
import Category from './container/Category';
import Post from './container/Post';
import Editor from './container/Editor';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Diary} >
            <IndexRoute component={Home} />
            <Route path="archive" component={Archive} />
            <Route Path="category/:id" component={Category} />
            <Route path="post/:id" component={Post} />
        </IndexRoute>
        <Route path="editor/:id" component={Editor} />
    </Route>
);
