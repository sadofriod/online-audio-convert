import * as actions from './action';
export const changeUrl = (state = actions.changeUrl, action) => {
    switch (action.type) {
        case 'changeUrl':
            action.url = state.url;
            return action;
        default: return state;
    }
}