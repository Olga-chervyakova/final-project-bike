import React, {useState}  from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Authorization/Login.css";

const Officers = () => {
    const [isSubmit,setSubmit]=useState()
    const [data,setData]=useState(null)
    const [name,setName]=useState("")
    const [surName,setSurName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            firstName: name,
            lastName: surName,
            email: email,
            password: password,
            clientId: "af1d5f18-40b4-4325-a2a8-754f2318337a",
            approved: false,
        }
        axios.post("https://sf-final-project.herokuapp.com/api/officers",data, {
            headers:{
                Authorization: "Bearer " +localStorage.getItem("token")
            }
        }).then(res => {
            setData(res.data)
            setName("")
            setSurName("")
            setEmail("")
            setPassword("")
            setSubmit(true)
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
                                name="firstName"
                                id="firstName"
                                onChange={(e) => setName(e.target.value)} value={name}
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
                                onChange={(e) => setSurName(e.target.value)} value={surName}
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
                                onChange={(e) => setEmail(e.target.value)} value={email}
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
                                onChange={(e) => setPassword(e.target.value)} value={password}
                            />
                        </div>
                        <button className="btn log" type="submit">Отправить</button>
                        {isSubmit && <small className="report-text">Отправлено!</small>}
                        <Link className="link" to="/officerList">Список сотрудников</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Officers;