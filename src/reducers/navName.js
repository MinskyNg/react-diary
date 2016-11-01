import { CHANGE_NAV_NAME } from '../constants/actionTypes';


/**
* 控制导航栏标题
**/
export default function navName(state = '全部日记', action) {
    switch (action.type) {
        case CHANGE_NAV_NAME:
            return action.navName;
        default:
            return state;
    }
}
