import * as axios from "axios";

const instance = (token) => {
    return axios.create({
        baseURL: "https://sf-final-project.herokuapp.com/api",
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
