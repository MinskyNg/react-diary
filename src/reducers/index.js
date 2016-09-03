import { combineReducers } from 'redux';
import toggleForm from './toggleForm';
import diarys from './diarys';


export default combineReducers({
    showForm: toggleForm,
    diarys
});
