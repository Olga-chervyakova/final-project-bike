import React, { useState, useEffect } from "react";
import Moment from "moment";
import "regenerator-runtime/runtime";
import "core-js/stable";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import "./index.css";

const StolenBikes = () => {
    let history = useHistory();

    const [data, setData] = useState([]);
    const [inputValue,setInputValue] = useState()
    const [textValue,setTextValue] = useState()

    const handleDelete = e => {
        e.preventDefault();

        const itemIdx = + e.target.attributes.getNamedItem("deleteitem").value;
        const item = data[itemIdx];

        axios.delete(`https://sf-final-project.herokuapp.com/api/cases/${item._id}`, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`
            }
        }).then(()=>loadData())
    }

    const handleInputValue = (e) => {
        const value = e.target.value
        setInputValue(value)
        const objectIdx = + e.target.selectedOptions[0].getAttribute("objectindex");
        const reports = [...data]

        const report = {...reports[objectIdx]}
        report.status = value
        reports[objectIdx] = report
        setData(reports)
    }

    const handleChange = (e) => {
        e.preventDefault()

        const reportIdx = + e.target.attributes.getNamedItem("reportindex").value;
        const report = data[reportIdx]

        if(report.status=== "done" && isEmpty(textValue)) {
            alert("Поле обязательное")
        }
        axios.put(`https://sf-final-project.herokuapp.com/api/cases/${report._id}`,report, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`
            }
        }).then(() => loadData())
    }

    function isEmpty (str) {
        return (!str || str.lenght === 0);
    }
    function isDone (report) {
        let is = (!isEmpty(report.resolution) && (report.status === "done"))
        return is
    }

    const loadData = async () => {
        const response = await axios.get("https://sf-final-project.herokuapp.com/api/cases", {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`
            }
        }).then(res => {
            setData(res.data.data);
        }).catch(function(err) {
            if (err.response.data.errCode === 'AUTH' && err.response.status === 401) {
                //history.push('/login?redirect=/stolen-bikes');
                history.push('/login');
            }
        })
    };

    useEffect(() => {
        loadData();
    }, []);

    return (<div className="main-container">
        <div className="table-container">
            <div className="tbl-header">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                    <tr key="0">
                        <th>ФИО арендатора</th>
                        <th>Дата кражи</th>
                        <th>Номер лицензии</th>
                        <th>Тип велосипеда</th>
                        <th>Цвет</th>
                        <th>Статус сообщения</th>
                        <th>Решение</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div className="tbl-content">
                <table>
                    <tbody>
                    {
                        data.map((report, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>{report.ownerFullName}</td>
                                    <td>{Moment(report.date).format("DD.MM.YYYY")}</td>
                                    <td>{report. licenseNumber}</td>
                                    <td>{report.type}</td>
                                    <td>{report.color}</td>
                                    <td>{report.status}
                                        <select defaultValue={report.status} disabled = {
                                            report.status === "done" && report.resolution
                                        } onChange={handleInputValue}>
                                            <option objectindex={index} value="new">Новый</option>
                                            <option objectindex={index} value="in_progress">В процессе</option>
                                            <option objectindex={index} value="done">Завершен</option>
                                        </select>
                                    </td>
                                    <td>{report.resolution}
                                        <textarea disabled = {
                                            (!isEmpty(report.resolution) && (report.status === "done"))
                                        } className="text" onChange={(e)=> setTextValue(e.target.value)} value={report.resolution}>
                                        </textarea>
                                    </td>
                                    <td>
                                        <button className="edit"  itemindx={index} onClick={handleChange} disabled ={
                                            (!isEmpty(report.resolution) && (report.status === "done"))
                                        }
                                        >Изменить</button>
                                        <button className="delete" deleteitem={index} onClick={handleDelete}>
                                            Удалить
                                        </button>
                                        <Link to={{
                                            pathname: "/detail-bike",
                                            state: report,
                                        }}><button className="detail-btn">Подробно</button></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};
export default StolenBikes;

