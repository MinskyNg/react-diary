/**
* 生产环境redux store
**/


import { createStore } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from '../reducers';
import mockDiary from './mockDiary';


// 从本地获取数据，若不存在则使用虚拟数据
const diarys = JSON.parse(localStorage.getItem('diarys')) || mockDiary;

// 将初始数据转化为immutable类型
const initialState = fromJS({
    diarys,
    navName: '全部日记',
    asideShow: true,
    fullScreen: false
});

export default createStore(rootReducer, initialState);
