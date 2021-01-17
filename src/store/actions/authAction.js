
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const logout = () =>{
    return dispatch => {
        dispatch(authLogout());
    }
}

export const login = (username, password) => {
    return dispatch =>{
        dispatch(authStart());
        fetch('https://private-052d6-testapi4528.apiary-mock.com/authenticate', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => {
                var token = data[0].token;
                dispatch(authSuccess(token))
                window.sessionStorage.setItem('token',data[0].token );
                window.sessionStorage.setItem('name',data[0].personalDetails.name );
                window.sessionStorage.setItem('team',data[0].personalDetails.Team );
                window.sessionStorage.setItem('joinedAt',data[0].personalDetails.joinedAt );
                window.sessionStorage.setItem('avatar',data[0].personalDetails.avatar );
            })
            .catch((error) => {
                console.error('Error:', error);
                dispatch(authFail(error))
            });
    }
}

export const isAuth = () => {
    return dispatch => {
        let token = window.sessionStorage.getItem('token');
        dispatch(authSuccess(token))
    }
}

