import { TOGGLE_ASIDE } from '../constants/actionTypes';


/**
* 控制侧边栏显示
**/
export default function asideShow(state = true, action) {
    switch (action.type) {
        case TOGGLE_ASIDE:
            return !state;
        default:
            return state;
    }
}
