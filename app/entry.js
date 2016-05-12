import React from 'react';
import ReactDOM from 'react-dom';
import DiaryApp from './components/App.js';
require('./App.scss');


let diarySpare = JSON.stringify([
    { category: '分类1', posts: [
        { title: '标题1', body: '这是内容', date: '2016-5-4 18:41:43' },
        { title: '标题2', body: '这是内容', date: '2016-5-4 18:41:49' }] },
    { category: '分类2', posts: [
        { title: '标题3', body: '这是内容', date: '2016-5-4 18:41:32' }] }
]);

let diaryStorage = localStorage.getItem('diary') || diarySpare;
let diarySource = JSON.parse(diaryStorage);

ReactDOM.render(<DiaryApp diarySource= { diarySource } />, document.getElementById('app'));
