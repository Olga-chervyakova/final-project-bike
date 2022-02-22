import React, { useEffect, useState } from "react";
import moment from "moment"
import axios from "axios";
import "./Detail.css";

const Detail = (props) => {
    const data = props.location.state
    const [cases,setCases]=useState(data)
    const [textValue,setTextValue]=useState(cases)

    const handleSubmit = () => {
        axios.put(`https://sf-final-project.herokuapp.com/api/cases/${cases._id}`, cases, {
            headers:{
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        }).then(() => loadData())
    }
    const loadData = async () => {
        const response = await axios.get(`https://sf-final-project.herokuapp.com/api/cases/${data._id}`, {
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        })
        setCases(response.data)
    }
    const handleChange = (e) => {
        const value = e.target.value
        setTextValue(value)
        const bike={...cases}
        bike.status=value
        bike.ownerFullName=value
        bike.color=value
        bike.type=value
        bike.date=value
        setCases(bike)
    }

    useEffect(() => {
        loadData();
        console.log(data)
    }, []);

    return (
        <>
            <h1 className="detail-title">Детальная страница велосипеда</h1>
            <div className="detail-form">
                <label className="title">Имя владельца</label>
                <textarea className="detail-failed"
                          onChange={handleChange}
                          value={textValue.ownerFullName}>
                </textarea>
                <label className="title">Цвет</label>
                <textarea className="detail-filed"
                          onChange={handleChange}
                          value={textValue.color}>
                </textarea>
                <label className="title">Дата кражи: {moment(cases.date).format("L")}</label>
                <input className="date" type="date"></input>
                <label className="title">Номер:</label>
                <textarea className="detail-title"
                          onChange={handleChange}
                          value={textValue.licenseNumber}>
                </textarea>
                <label className="title">Тип:</label>
                <textarea className="detail-failed"
                          onChange={handleChange}
                          value={textValue.type}>
                </textarea>
                <p className="immutable">Сосздано в {moment(cases.createdAt).format("L")}</p>
                <p className="immutable">Изменено в {moment(cases.updatedAt).format("L")}</p>
                <p className="immutable">Статус: {cases.status}</p>
                <button className="btn save-btn" onClick={handleSubmit}>Сохранить</button>
            </div>
        </>
    )
}
export default Detail;