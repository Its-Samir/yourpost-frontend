export function AuthReducer(state, action) {
    if(action.type === 'LOGIN') {
        return {user: action.user, userProfileDetail: state.userProfileDetail}
    }
    if(action.type === 'LOGOUT') {
        return {user: action.user, userProfileDetail: state.userProfileDetail}
    }
    if(action.type === 'PROFILE') {
        return {user: state.user, userProfileDetail: action.userProfileDetail}
    }
    return state;
}