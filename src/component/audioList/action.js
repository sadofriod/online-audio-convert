export const changeUrl = state => {
    return {
        type: 'changeUrl',
        url: state.url,
    }
}
export const changeSplitList = state => {
    return {
        type: 'changeSplitList',
        id: state.id,
    }
}
