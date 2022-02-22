import React, {useState}  from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Authorization/Login.css";


const Officers = () => {
    const officersValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
        clientId: "af1d5f18-40b4-4325-a2a8-754f2318337a",
        approved: false,
    };
    const [formValues, setFormValues] = useState(officersValues);
    const [isSubmit,setSubmit]=useState();


    const handleChange = e => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };
    const handleSubmit = e => {
        e.preventDefault();
        axios.post("https://sf-final-project.herokuapp.com/api/officers",officersValues, {
            headers:{
                Authorization: "Bearer " +localStorage.getItem("token")
            }
        })
    }

    return (
        <div className="main-container">
            <div className="container">
                <div className="form-container">
                    <h1 className="form-logo">Cотрудники</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="name">Имя</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="text"
                                name="ownerFullName"
                                id="ownerFullName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="name">Фамилия</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="name">Email:</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="name">Пароль</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="name">Повторите пароль</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="password"
                                name="repassword"
                                id="repassword"
                                onChange={handleChange}
                            />
                        </div>

                        <button className="btn log" type="submit">Отправить</button>
                        {isSubmit && <small className="report-text">Отправлено!</small>}
                        <Link className="link" to="/officerlist">Список сотрудников</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Officers;