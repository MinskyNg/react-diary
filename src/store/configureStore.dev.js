import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import { fromJS } from 'immutable';
import DevTools from '../containers/DevTools';
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

// 调用日志打印方法
const loggerMiddleware = createLogger();

// 创建一个中间件集合
const middleware = [loggerMiddleware];

// 利用compose增强store，这个store与applyMiddleware和redux-devtools一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
)(createStore);

export default finalCreateStore(rootReducer, initialState);
