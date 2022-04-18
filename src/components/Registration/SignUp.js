import React, {useState, useEffect} from "react";

import "../Authorization/Login.css";
import axios from "axios";


const SignUp = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
        clientId: "af1d5f18-40b4-4325-a2a8-754f2318337a"
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log(formValues);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        axios
            .create({
                baseURL: "https://sf-final-project.herokuapp.com/api",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .post(`/auth/sign_up`, formValues).then(response => response.data);

    };

    const validate = values => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.firstName) {
            errors.firstName = "Некорректный firstName";
        }
        if (!values.lastName) {
            errors.lastName = "Некорректный lastName";
        }
        if (!values.email) {
            errors.email = "Некорректный email";
        } else if (!regex.test(values.email)) {
            errors.email = "invalid email";
        }

        if (!values.password) {
            errors.password = "Некорректный password";
        } else if (values.password.length < 6) {
            errors.password = "Password is too short (minimum is 6 characters)";
        }
        if (!values.repassword) {
            errors.repassword = "Некорректный password";
        } else if (values.repassword !== values.repassword) {
            errors.repassword = "Password should be the same";
        }

        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    return (
        <div className="main-container">
            <div className="container">
                <div className="form-container">
                    <h1 className="form-logo">Sign up</h1>
                    {Object.keys(formErrors).length === 0 && isSubmitting && (
                        <span className="success-msg">Форма успешно отправлена!</span>
                    )}
                    <form className="form" onSubmit={handleSubmit} noValidate>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="firstName">firstName</label>
                                <div className="control-error">
                                    {formErrors.firstName && (
                                        <span className="error">{formErrors.firstName}</span>
                                    )}
                                </div>
                            </div>

                            <input
                                type="firstName"
                                name="firstName"
                                id="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                                className={formErrors.firstName && "input-error"}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="lastname">lastName</label>
                                <div className="control-error">
                                    {formErrors.lastName && (
                                        <span className="error">{formErrors.lastName}</span>
                                    )}
                                </div>
                            </div>

                            <input
                                type="lastName"
                                name="lastName"
                                id="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                                className={formErrors.lastName && "input-error"}
                            />
                        </div>
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
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="repassword">Repassword</label>
                                <div className="control-error">
                                    {formErrors.repassword && (
                                        <span className="error">{formErrors.repassword}</span>
                                    )}
                                </div>
                            </div>
                            <input
                                type="password"
                                name="repassword"
                                id="repassword"
                                value={formValues.repassword}
                                onChange={handleChange}
                                className={formErrors.repassword && "input-error"}
                            />
                        </div>
                        <button className="btn log" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default SignUp;


