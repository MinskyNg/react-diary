import { CHANGE_NAV_NAME } from '../constants/actionTypes';


/**
 * 控制导航栏标题
 * @param {string} state 默认state
 * @param {object} action action参数
 * @return {string} state
 */
export default function navName(state = '全部日记', action) {
    switch (action.type) {
        case CHANGE_NAV_NAME:
            return action.navName;
        default:
            return state;
    }
}
