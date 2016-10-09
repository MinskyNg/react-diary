import React from 'react';
import { Route, IndexRoute, Redirect, withRouter } from 'react-router';
import App from './containers/App';
import Diary from './containers/Diary';
import Home from './containers/Home';
import Search from './containers/Search';
import Category from './containers/Category';
import Tag from './containers/Tag';
import Post from './containers/Post';
import Editor from './containers/Editor';


export default (
    <Route path="/" component={withRouter(App)}>
        <IndexRoute component={withRouter(Diary)}>
            <IndexRoute component={withRouter(Home)} />
            <Route path="search/:keyword" component={withRouter(Search)} />
            <Route path="category/:catName" component={withRouter(Category)} />
            <Route path="tag/:tagName" component={withRouter(Tag)} />
            <Route path="post/:id" component={withRouter(Post)} />
        </IndexRoute>
        <Route path="editor/:id" component={withRouter(Editor)} />
        <Redirect from="*" to="/" />
    </Route>
);
