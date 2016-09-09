import { combineReducers } from 'redux-immutable';
import toggleForm from './toggleForm';
import diarys from './diarys';


export default combineReducers({
    showForm: toggleForm,
    diarys
});
