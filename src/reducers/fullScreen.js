import { TOGGLE_SCREEN } from '../constants/actionTypes';


/**
* 控制全屏显示
**/
export default function fullScreen(state = false, action) {
    switch (action.type) {
        case TOGGLE_SCREEN:
            return !state;
        default:
            return state;
    }
}
