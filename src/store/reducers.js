import { combineReducers } from 'redux';
import { isLogin } from '../component/signIn/reducers';
import { changeUrl } from '../component/audioList/reducer';
const reducers = combineReducers({
    isLogin: isLogin,
    changeUrl: changeUrl
})
export default reducers;