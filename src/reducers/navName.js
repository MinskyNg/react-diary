import { CHANGE_NAV_NAME } from '../constants/actionTypes';


export default function asideShow(state = '全部日记', action) {
    switch (action.type) {
        case CHANGE_NAV_NAME:
            return action.navName;
        default:
            return state;
    }
}
