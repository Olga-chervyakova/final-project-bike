import * as axios from "axios";

const instance = (token) => {
    return axios.create({
        baseURL: " http://84.201.129.203:8888/api/",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const authAPI = {
    signUp(userInfo) {
        return instance()
            .post(`/auth/sign_up`, userInfo)
            .then((response) => response);
    },
    signIn(userData) {
        return instance()
            .post(`/auth/sign_in`, userData)
            .then((response) => response);
    },
};

export const officersAPI = {
    getOfficers(token) {
        return instance(token)
            .get(`/officers`)
            .then((response) => response);
    },
    addNewOfficer(officerData, token) {
        return instance(token)
            .post(`/officers`, officerData)
            .then((response) => response);
    },
    editOfficer(token, officerId, officerData) {
        return instance(token)
            .put(`/officers/${officerId}`, officerData)
            .then((response) => response);
    },
    deleteOfficer(id, token) {
        return instance(token)
            .delete(`/officers/${id}`)
            .then((response) => response);
    },
};

export const casesAPI = {
    addNewUnauthorizedMessage(newMessage) {
        return instance()
            .post(`/public/report`, newMessage)
            .then((response) => response);
    },
    addNewMessage(token, newMessage) {
        return instance(token)
            .post(`/cases`, newMessage)
            .then((response) => response);
    },
    editMessage(token, messageId, newMessage) {
        return instance(token)
            .put(`/cases/${messageId}`, newMessage)
            .then((response) => response);
    },
    deleteMessage(token, messageId) {
        return instance(token)
            .delete(`/cases/${messageId}`)
            .then((response) => response);
    },
    getAllMessages(token) {
        return instance(token)
            .get(`/cases`)
            .then((response) => response);
    },
    getCurrentMessage(token, messageId) {
        return instance(token)
            .get(`/cases/${messageId}`)
            .then((response) => response);
    },
};