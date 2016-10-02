import { createStore } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from '../reducers';


const diarys = JSON.parse(localStorage.getItem('diarys')) || [
    { category: '分类1', posts: [
        { title: '标题1', body: '这是内容', date: '2016-9-4 18:41:43' },
        { title: '标题2', body: '这是内容', date: '2016-9-4 18:41:49' }] },
    { category: '分类2', posts: [
        { title: '标题3', body: '这是内容', date: '2016-9-4 18:41:32' }] }
];

const initialState = fromJS({
    showForm: false,
    diarys
});

export default createStore(rootReducer, initialState);
