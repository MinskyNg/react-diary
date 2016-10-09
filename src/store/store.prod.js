import { createStore } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from '../reducers';
import mockDiary from './mockDiary';


const diarys = JSON.parse(localStorage.getItem('diarys')) || mockDiary;

const initialState = fromJS({
    diarys,
    navName: '全部日记',
    asideShow: true
});

export default createStore(rootReducer, initialState);
