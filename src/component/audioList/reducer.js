import * as actions from './action';
export const changeUrl = (state = actions.changeUrl, action) => {
    switch (action.type) {
        case actions.changeUrl:
            action.url = action.url;
            return action;
        default: return state;
    }
}