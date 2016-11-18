/**
 * 前端路由
 */


import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './containers/App';
import Diary from './containers/Diary';
import Home from './containers/Home';
import Search from './containers/Search';
import Category from './containers/Category';
import Tag from './containers/Tag';
import Post from './containers/Post';
import Editor from './containers/Editor';
import Notfound from './containers/Notfound';


export default (
    <Route path="/" component={App}>
        <Route component={Diary}>
            <IndexRoute component={Home} />
            <Route path="search/:keyword" component={Search} />
            <Route path="category/:catName" component={Category} />
            <Route path="tag/:tagName" component={Tag} />
            <Route path="post/:id" component={Post} />
            <Route path="404" component={Notfound} />
        </Route>
        <Route path="editor/:id" component={Editor} />
        <Redirect from="*" to="/404" />
    </Route>
);
