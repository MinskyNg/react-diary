import { TOGGLE_ASIDE } from '../constants/actionTypes';


/**
 * 控制侧边栏显示
 * @param {boolean} state 默认state
 * @param {object} action action参数
 * @return {boolean} state
 */
export default function asideShow(state = true, action) {
    switch (action.type) {
        case TOGGLE_ASIDE:
            return !state;
        default:
            return state;
    }
}
