import { casesAPI } from "../api/api";
import store from "./store.js";

import { MY_CLIENT_ID } from "./const.js";

const ADD_THEFTS = "theft-message/ADD_THEFTS";
const DELETE_MESSAGE_SUCCESS = "theft-message/DELETE_MESSAGE_SUCCESS";
const ADD_NEW_MESSAGE_SUCCESS = "theft-message/ADD_NEW_MESSAGE_SUCCESS";
const EDIT_MESSAGE_SUCCESS = "theft-message/EDIT_MESSAGE_SUCCESS";

const initialState = {
    thefts: [],
};

const theftMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_THEFTS:
            return {
                ...state,
                thefts: action.thefts,
            };

        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                thefts: state.thefts.filter((theft) => theft._id !== action.id),
            };

        case ADD_NEW_MESSAGE_SUCCESS:
            return {
                ...state,
                thefts: [...state.thefts, action.theftMessage],
            };

        case EDIT_MESSAGE_SUCCESS:
            return {
                ...state,
                thefts: state.thefts.map((theft) => {
                    if (theft._id === action.theftMessage._id) {
                        return action.theftMessage;
                    } else return theft;
                }),
            };

        default:
            return state;
    }
};

//--------- ACTIONS ---------------------
export const addThefts = (thefts) => ({
    type: ADD_THEFTS,
    thefts,
});

export const deleteMessageSuccess = (id) => ({
    type: DELETE_MESSAGE_SUCCESS,
    id,
});

export const addNewMessageSuccess = (theftMessage) => ({
    type: ADD_NEW_MESSAGE_SUCCESS,
    theftMessage,
});

export const editMessageSuccess = (theftMessage) => ({
    type: EDIT_MESSAGE_SUCCESS,
    theftMessage,
});

//------------ THUNKS ----------------

export const addNewUnauthorizedMessage = (messageData) => (dispatch) => {
    const newMessage = {
        status: "new",
        date: Date.now(),
        updateAt: Date.now(),
        createdAt: Date.now(),
        licenseNumber: messageData.licenseNumber,
        color: messageData.color,
        type: messageData.type,
        ownerFullName: messageData.ownerFullName,
        description: messageData.description,
        clientId: MY_CLIENT_ID,
    };
    casesAPI
        .addNewUnauthorizedMessage(newMessage)
        .then((res) => {
            if (res.status === 200) {
                alert("Ваше сообщение отправлено");
                dispatch(addNewMessageSuccess(res.data));
            }
        })
        .catch((req) => alert(req.message));
};

export const addNewMessage = (messageData) => (dispatch) => {
    const token = store.getState().auth.token;
    const newMessage = {
        status: "new",
        date: Date.now(),
        updateAt: Date.now(),
        createdAt: Date.now(),
        licenseNumber: messageData.licenseNumber,
        color: messageData.color,
        type: messageData.type,
        ownerFullName: messageData.ownerFullName,
        officer: messageData.officer,
        description: messageData.description,
        resolution: "",
    };
    casesAPI
        .addNewMessage(token, newMessage)
        .then((res) => {
            if (res.status === 200) {
                alert("Ваше сообщение отправлено");
                dispatch(addNewMessageSuccess(res.data));
            }
        })
        .catch((req) => alert(req.message));
};

export const getTheftMessages = () => (dispatch) => {
    const token = store.getState().auth.token;
    casesAPI
        .getAllMessages(token)
        .then((res) => dispatch(addThefts(res.data)))
        .catch((req) => alert(req.message));
};

export const deleteMessage = (id) => (dispatch) => {
    const token = store.getState().auth.token;
    casesAPI
        .deleteMessage(token, id)
        .then((res) => dispatch(deleteMessageSuccess(res.data)))
        .catch((req) => alert(req.message));
};

export const editMessage = (id, value) => (dispatch) => {
    const token = store.getState().auth.token;
    casesAPI
        .editMessage(token, id, { ...value, updateAt: Date.now() })
        .then((res) => dispatch(editMessageSuccess(res.data)))
        .catch((req) => alert(req.message));
};

export default theftMessageReducer;