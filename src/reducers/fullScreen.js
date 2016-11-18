import { TOGGLE_SCREEN } from '../constants/actionTypes';


/**
 * 控制全屏显示
 * @param {boolean} state 默认state
 * @param {object} action action参数
 * @return {boolean} state
 */
export default function fullScreen(state = false, action) {
    switch (action.type) {
        case TOGGLE_SCREEN:
            return !state;
        default:
            return state;
    }
}
