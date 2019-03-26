import * as actions from './action';
export const isLogin = (state = actions.isLogin, action) => {
    switch (action.type) {
        case actions.IS_LOGIN:
            action.status = true;
            return action;
        case actions.UNLOGIN:
            action.state = false;
            return action;
        default: return state;
    }
}