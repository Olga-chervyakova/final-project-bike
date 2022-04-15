import React, { useEffect, useState } from "react";
import moment from "moment"
import axios from "axios";
import "./DetailBike.css";

const DetailBike = (props) => {
    const data = props.location.state
    const [cases, setCases] = useState(data)
    const [textValue, setTextValue] = useState(cases)

    const handleSubmit = () => {
        axios.put(`https://sf-final-project.herokuapp.com/api/cases/${cases._id}`, cases, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`,
            }
        }).then(() => loadData())
    }
    const loadData = async () => {
        const response = await axios.get(`https://sf-final-project.herokuapp.com/api/cases/${data._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`,
            }
        })
        setCases(response.data.data)
    }
    const handleChange = (e) => {
        const value = e.target.value
        setTextValue(value)
        const bike = {...cases}
        bike.status = value
        bike.ownerFullName = value
        bike.color = value
        bike.type = value
        bike.date = value
        setCases(bike)
    }

    useEffect(() => {
        loadData();
        console.log(data)
    }, []);

    return (
        <div className="main-container">
            <div className="container">
                <div className="form-container-bike">
                    <h1 className="detail-title">Детальная страница велосипеда</h1>
                    <div className="detail-form-bike">
                        <label className="title-bike">ФИО арендатора</label>
                        <textarea
                            className="detail-bike"
                            onChange={handleChange}
                            value={textValue.ownerFullName}>
                        </textarea>

                        <label className="title-bike">Цвет</label>
                        <textarea
                            className="detail-bike"
                            onChange={handleChange}
                            value={textValue.color}>
                        </textarea>

                        <label className="title-bike">Дата кражи: {moment(cases.date).format("L")}</label>
                        <input
                            className="date"
                            type="date">
                        </input>

                        <label className="title-bike">Номер:</label>
                        <textarea
                            className="detail-bike"
                            onChange={handleChange}
                            value={textValue.licenseNumber}>
                        </textarea>

                        <label className="title-bike">Тип:</label>
                        <textarea
                            className="detail-bike"
                            onChange={handleChange}
                            value={textValue.type}>
                        </textarea>

                        <p className="details-info">Создано в {moment(cases.createdAt).format("L")}</p>
                        <p className="details-info">Изменено в {moment(cases.updatedAt).format("L")}</p>
                        <p className="details-info">Статус: {cases.status}</p>
                        <button className="btn-details log" onClick={handleSubmit}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailBike;