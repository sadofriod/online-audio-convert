export const changeUrl = state =>{
    console.log(state);
    return {type:'changeUrl',
    url:state.url,}
}