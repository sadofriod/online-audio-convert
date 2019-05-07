export function isLogin(){
    let cookie = document.cookie;
    if(cookie.indexOf('root')!==-1){
        return true;
    }
    return false;
}