import * as actionTypes from './actionsTypes';
import axios from 'axios';
export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token , userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};


export const logOut = ()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
};

export const logoutSucceed = ()=>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeOut = (expirationTime)=>{
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
            expirationTime : expirationTime
    }
};


export const auth = (email, password, isSignup)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCUwWbowhZjDF2koq5nomT8D8XV9tUjTQ';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCUwWbowhZjDF2koq5nomT8D8XV9tUjTQ'
        }
        axios.post(url, authData).then(response=>{
            const expirationDate = new Date(new Date().getTime()+ response.data.expiresIn * 1000);
            localStorage.setItem('token',  response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        }).catch(err=>{
            dispatch(authFail(err.response.data.error));
        })
    }
};

export const setAuthRedirectPath = (path)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut())
        } else{
            const expirationTime = new Date(localStorage.getItem('expirationDate'));
            if(expirationTime <= new Date()){
                dispatch(logOut())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationTime.getTime() - new Date().getTime())/1000))

            }
        }
    }
}