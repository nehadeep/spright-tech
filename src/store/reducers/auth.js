import * as actionType from '../actions/actionsTypes';
import {updatedObject} from "../../Shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state, action)=>{
    return updatedObject(state, {error: null, loading: true})
}

const authSuccess = (state, action)=>{
    return updatedObject(state, {
        token : action.idToken, //right side prop values are the same name as we set in actions methods
        userId: action.userId,
        error: null,
        loading: false
    })
};

const authFail = (state, action)=>{
    return updatedObject(state, {
        error: action.error,
        loading: false
    })
};
const authLogout =(state, action)=>{
    return updatedObject(state, {token: null, userId: null})
};

const setAuthRedirectPath = (state, action)=>{
    return updatedObject(state, {authRedirectPath: action.path})
}

const authReducer = (state=initialState, action)=>{
    switch (action.type) {
        case actionType.AUTH_START: return authStart(state,action);
        case actionType.AUTH_SUCCESS: return authSuccess(state,action);
        case actionType.AUTH_FAIL: return authFail(state,action);
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        case actionType.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default:
            return state

    }
}

export default authReducer;