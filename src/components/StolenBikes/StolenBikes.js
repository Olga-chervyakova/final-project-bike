import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "moment";
import "./index.css";
const ReportList = () => {
    const [data, setData] = useState([]);
    const handleDelete = e => {
        e.preventDefault();

        const itemIdx = +e.target.attributes.getNamedItem("deteleitem").value;
        const item = data[itemIdx];
        console.log(itemIdx)

    };
    const loadData = async () => {
        console.log(localStorage.getItem("bikeTheftAuthorization"));
        const response = await axios.get("https://sf-final-project.herokuapp.com/api/cases", {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("bikeTheftAuthorization")
            }
        })
         .then(res => {
            console.log(response.data);
            setData(response.data);
         });
    };

    useEffect(() => {
        console.log(localStorage.getItem("bikeTheftAuthorization"));
        loadData();
    }, []);

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                        <tr key="0">
                            <th>Date</th>
                            <th>Type</th>
                            <th>Color</th>
                            <th>Name of Owner</th>
                            <th>Ответственный сотрудник</th>
                            <th>Status</th>
                            <th>Changed</th>
                            <th>Solution</th>
                            <th>Решение</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table>
                        <tbody>
                        {data.map((report, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>{Moment(report.date).format("DD.MM.YYYY")}</td>
                                    <td>{report.type}</td>
                                    <td>{report.color}</td>
                                    <td>{report.ownerFullName}</td>
                                    <td>{report.officer || "-"}</td>
                                    <td>{report.status}</td>
                                    <td>{Moment(report.updateAt).format("DD.MM.YYYY")}</td>
                                    <td>{report.resolution}</td>
                                    <td>
                                        <button deteleitem={index} onClick={handleDelete}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default ReportList;