import { combineReducers } from 'redux';
import { isLogin } from '../component/signIn/reducers';
const reducers = combineReducers({
    isLogin: isLogin,
})
export default reducers;