import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import DiaryApp from './containers/App';
import rootReducer from './reducers';
require('normalize.css/normalize.css');
require('./styles/App.scss');


const diarySpare = JSON.stringify([
    { category: '分类1', posts: [
        { title: '标题1', body: '这是内容', date: '2016-5-4 18:41:43' },
        { title: '标题2', body: '这是内容', date: '2016-5-4 18:41:49' }] },
    { category: '分类2', posts: [
        { title: '标题3', body: '这是内容', date: '2016-5-4 18:41:32' }] }
]);

const diaryStorage = localStorage.getItem('diarys') || diarySpare;
const diarySource = JSON.parse(diaryStorage);

const initialState = {
    showForm: false,
    diarys: diarySource
};

let store = createStore(rootReducer, initialState);

ReactDOM.render(<Provider store={store}><DiaryApp /></Provider>, document.getElementById('app'));
