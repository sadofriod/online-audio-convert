import * as actions from './action';
export const changeUrl = (state = actions.changeUrl, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'changeUrl':
            return action;
        case 'changeSplitList':
            console.log(action)
            return action;
        default: return state;
    }
}