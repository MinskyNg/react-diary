import { combineReducers } from 'redux-immutable';
import diarys from './diarys';
import navName from './navName';
import asideShow from './asideShow';
import fullScreen from './fullScreen';


export default combineReducers({
    diarys,
    navName,
    asideShow,
    fullScreen
});
