/**
* redux store dev
**/


import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import { fromJS } from 'immutable';
import DevTools from '../containers/DevTools';
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


// 创建调试记录中间件
const loggerMiddleware = createLogger();

// 中间件集合
const middleware = [loggerMiddleware];


// 利用compose增强store，使其与中间件和Devtools一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
)(createStore);

export default finalCreateStore(rootReducer, initialState);
