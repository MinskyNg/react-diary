import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import { fromJS } from 'immutable';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';
import mockDiary from './mockDiary';


const diarys = JSON.parse(localStorage.getItem('diarys')) || mockDiary;


const initialState = fromJS({
    diarys,
    navName: '全部日记',
    asideShow: true
});


const loggerMiddleware = createLogger();
const middleware = [loggerMiddleware];


const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
)(createStore);

export default finalCreateStore(rootReducer, initialState);
