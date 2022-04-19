import React, { useState } from "react";
import {useHistory} from "react-router-dom"

import "./Login.css";
import axios from "axios";


const Login = () => {
    let history = useHistory();

    const initialValues = { email: "", password: "" };
    const [isError, setIsError] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    //input change handler
    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //form submission handler
    const handleSubmit = e => {
        e.preventDefault();
        if (isError === true) {
            setFormErrors(validate(formValues));
        } else {
            axios.post(`https://sf-final-project.herokuapp.com/api/auth/sign_in`, formValues, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                    if (res.status === 200) {
                        console.log(res.data);
                        localStorage.setItem("bikeTheftAuthorization", res.data.data.token);
                        localStorage.setItem("userId", res.data.data.user.id);

                        /*const search = useLocation().search;
                        const redirect = new URLSearchParams(search).get("redirect");
                        if (redirect != null) {
                            console.log('@@@@@');
                            console.log(redirect);
                            history.push(redirect);
                        } else {*/
                            history.push("/");
                        //}
                    } else {
                        alert(res.statusText);
                    }
                });
        }
    };

    //form validation handler
    const validate = values => {
        let errors = {};
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Cannot be blank";
        }

        if (!values.password) {
            errors.password = "Cannot be blank";
        }
        return errors;
    };

    return (
        <div className="main-container">
            <div className="container">
                <div className="container">
                    <div className="form-container">
                        <h1 className="form-logo">Log In</h1>
                        <form className="form" onSubmit={handleSubmit} noValidate>
                            <div className="form-control">
                                <div className="message">
                                    <label htmlFor="email">Email</label>
                                    <div className="control-error">
                                        {formErrors.email && (
                                            <span className="error">{formErrors.email}</span>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    className={formErrors.email && "input-error"}
                                />
                            </div>
                            <div className="form-control">
                                <div className="message">
                                    <label htmlFor="password">Password</label>
                                    <div className="control-error">
                                        {formErrors.password && (
                                            <span className="error">{formErrors.password}</span>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                    className={formErrors.password && "input-error"}
                                />
                                {isError && <small className="text-danger">Что-то пошло не так. Пожалуйста повторите попытку.</small>}
                            </div>
                            <button className="btn log" type="submit">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;


