import { TOGGLE_ASIDE } from '../constants/actionTypes';


export default function asideShow(state = true, action) {
    switch (action.type) {
        case TOGGLE_ASIDE:
            return !state;
        default:
            return state;
    }
}
