import { createStore } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from '../reducers';


const diarys = JSON.parse(localStorage.getItem('diarys')) || {
    postIds: [3, 2, 1],
    archives: {
        2015: [2, 1],
        2016: [3]
    },
    categories: {
        分类1: [3, 1],
        分类2: [2],
        未分类: []
    },
    posts: {
        1: {
            id: 1,
            title: '标题1',
            body: '这是内容',
            date: '2015-6-4 18:41',
            category: '分类1'
        },
        2: {
            id: 2,
            title: '标题2',
            body: '这是内容',
            date: '2015-9-3 21:41',
            category: '分类2'
        },
        3: {
            id: 3,
            title: '标题3',
            body: '这是内容',
            date: '2016-10-2 10:41',
            category: '分类2'
        }
    },
};

const initialState = fromJS({
    diarys,
    screenShow: 2
});

export default createStore(rootReducer, initialState);
