import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Authorization/Login.css";

const Officers = () => {
    const officerValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        clientId: "af1d5f18-40b4-4325-a2a8-754f2318337a",
        approved: false,
    };

    const [data,setData]=useState(null)
    const [formValues, setFormValues] = useState(officerValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log(formValues);
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post("https://sf-final-project.herokuapp.com/api/officers", formValues, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`
            }
        }).then(res => {
            //console.log(res.data)
            setData(res.data)
        })
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
                    <h1 className="form-logo">Cотрудники</h1>
                    {Object.keys(formErrors).length === 0 && isSubmitting && (
                        <span className="success-msg">Форма успешно отправлена!</span>
                    )}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="firstName">Имя</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="lastName">Фамилия</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="email">Email:</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="password">Пароль</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id=""
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn log" type="submit">Отправить</button>
                        <Link className="link" to="/officerList">Список сотрудников</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Officers;