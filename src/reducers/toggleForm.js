import { TOGGLE_FORM } from '../constants/actionTypes';


export default function toggleForm(state = false, action) {
    switch (action.type) {
        case TOGGLE_FORM:
            return !state;
        default:
            return state;
    }
}
