import React, { useState, useEffect } from "react";
import Moment from "moment";
import "regenerator-runtime/runtime";
import "core-js/stable";
import axios from "axios";

import "./index.css";
import {Link} from "react-router-dom";

const StolenBikes = () => {
    const [data, setData] = useState([]);

    const handleDelete = e => {
        e.preventDefault();

        const itemIdx = +e.target.attributes.getNamedItem("deleteitem").value;
        const item = data[itemIdx];
        console.log(itemIdx);
    }

    const loadData = async () => {
        const response = await axios.get("https://sf-final-project.herokuapp.com/api/cases", {
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        // .then(res => {
        console.log(response.data);
        setData(response.data);
        // });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                        <tr key="0">
                            <th>date</th>
                            <th>type</th>
                            <th>color</th>
                            <th>ownerFullName</th>
                            <th>officers</th>
                            <th>Changed</th>
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
                                    <td>{report.officers || "-"}</td>
                                    <td>{report.status}</td>
                                    <td>{Moment(report.updateAt).format("DD.MM.YYYY")}</td>
                                    <td>{report.resolution}</td>
                                    <td>
                                        <button deleteitem={index} onClick={handleDelete}>
                                            Delete
                                        </button>
                                        <Link to={{
                                            pathname: "/detail",
                                            state: item,
                                        }}><button className="detail-btn">Подробно</button></Link>
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
export default StolenBikes;
