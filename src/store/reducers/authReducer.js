
import * as types from '../actions/actionTypes';
import {updateObject} from "../utility";


const initialState ={
    loading: false,
    error: false,
    token: null,
    isLoggedIn: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: true,
        isLoggedIn : true
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isLoggedIn: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        loading: false,
        isLoggedIn: false
    });
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case types.AUTH_START:
            return authStart(state, action);
        case types.AUTH_SUCCESS:
            return authSuccess(state, action);
        case types.AUTH_LOGOUT:
            return authLogout(state, action);
        case types.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
}

export default reducer;