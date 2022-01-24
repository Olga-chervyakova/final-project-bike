import { authAPI } from "../api/api.js";
import store from "./store.js";

import { MY_CLIENT_ID } from "./const.js";

const AUTH_ME_SUCCESS = "auth/AUTH_ME";
const SIGN_OUT = "auth/SIGN_OUT";
const UPDATE_USER_DATA = "auth/UPDATE_USER_DATA";

const authorization = JSON.parse(
    localStorage.getItem("bikeTheftAuthorization")
);

const initialState = {
    userInfo: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        repassword: "",
        clientId: MY_CLIENT_ID,
        approved: false,
    },
    isAuth: authorization ? authorization.isAuth : false,
    token: authorization ? authorization.token : "",
};

//---------REDUCER-----------

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ME_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.token,
            };

        case SIGN_OUT:
            return {
                ...state,
                isAuth: false,
            };

        case UPDATE_USER_DATA:
            const newUserData = action.userData;

            return {
                ...state,
                userInfo: { ...state.userInfo, ...newUserData },
            };

        default:
            return state;
    }
};

//-------ACTION CREATORS------------

export const authMeSuccess = (token) => ({
    type: AUTH_ME_SUCCESS,
    token,
});

export const signOutSuccess = () => ({
    type: SIGN_OUT,
});

export const updateUserData = (userData) => ({
    type: UPDATE_USER_DATA,
    userData,
});
//--------THUNKS---------------

export const signUp = (userData) => (dispatch) => {
    dispatch(updateUserData(userData));
    const userInfo = store.getState().auth.userInfo;
    authAPI
        .signUp({ ...userInfo, approved: true })
        .then((res) => {
            if (res.status === 201) {
                alert("Вы зарегистрированы!");
                dispatch(authMeSuccess());
            } else alert(res.statusText);
        })
        .catch((err) => alert(err));
};

export const signIn = (userData) => (dispatch) => {
    authAPI
        .signIn(userData)
        .then((res) => {
            if (res.status === 200) {
                const token = res.data.token;
                dispatch(authMeSuccess(token));
                localStorage.setItem(
                    "bikeTheftAuthorization",
                    JSON.stringify({ token, isAuth: true })
                );
            } else alert(res.statusText);
        })
        .catch((err) => alert(err));
};

export const signOut = () => (dispatch) => {
    localStorage.setItem(
        "bikeTheftAuthorization",
        JSON.stringify({ token: null, isAuth: false })
    );
    dispatch(signOutSuccess());
};

export default authReducer;