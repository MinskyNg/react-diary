import { combineReducers } from 'redux-immutable';
import diarys from './diarys';
import screenShow from './screenShow';


export default combineReducers({
    diarys,
    screenShow
});
