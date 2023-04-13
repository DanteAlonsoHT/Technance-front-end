import swal from "sweetalert";
import {
    formatError,
    login,
    saveTokenInLocalStorage,
    signUp,
    updateProfile,
} from '../../services/AuthService';

export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';
export const UPDATE_PROFILE_CONFIRMED_ACTION = '[updateprofile action] confirmed updateprofile';
export const UPDATE_PROFILE_FAILED_ACTION = '[updateprofile action] failed updateprofile';

export function signupAction(full_name, preferred_name, email, password, image_profile, history) {
    return (dispatch) => {
        signUp(full_name, preferred_name, email, password, image_profile)
        .then((response) => {
            // saveTokenInLocalStorage({authToken: response.data.authToken, userDetails: response.data.userDetails[0]});
            // dispatch(updateProfileConfirmedAction({authToken: response.data.authToken, userDetails: response.data.userDetails[0]}));
            // Only return to the login
            history.push('/login');
            swal("Sign Up Successfully!", "Your data was registered successfuly and now your account is active, try to log in!", "success");
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logout(history) {
    localStorage.removeItem('userDetails');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, history) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                saveTokenInLocalStorage(response.data);
                dispatch(loginConfirmedAction(response.data));
				history.push('/');
				//window.location.reload();
                
				//history.pushState('/index');
                
            })
            .catch((error) => {
                const errorMessage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function updateAction(token, id, full_name, preferred_name, email, password, image_profile, history) {
    return (dispatch) => {
        updateProfile(token, id, full_name, preferred_name, email, password, image_profile)
        .then((response) => {
            //console.log('SaveTokenInLocalStorage UPDATE:', {authToken: token, userDetails: response.data});
            saveTokenInLocalStorage({authToken: token, userDetails: response.data});
            dispatch(updateProfileConfirmedAction({authToken: token, userDetails: response.data}));
            swal("Updated Successfully!", "Your account information was updated successfully!", "success");
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(updateProfileFailedAction(errorMessage));
        });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function updateProfileConfirmedAction(data) {
    return {
        type: UPDATE_PROFILE_CONFIRMED_ACTION,
        payload: data,
    };
}

export function updateProfileFailedAction(message) {
    return {
        type: UPDATE_PROFILE_FAILED_ACTION,
        payload: message,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
