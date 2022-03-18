import React, { useState, useEffect } from "react";
import Moment from "moment";
import "regenerator-runtime/runtime";
import "core-js/stable";
import axios from "axios";

import "./index.css";

const StolenBikes = () => {
    const [data, setData] = useState([]);
    const handleDelete = e => {
        e.preventDefault();

        const itemIdx = + e.target.attributes.getNamedItem("deteleitem").value;
        const item = data[itemIdx];
    }
    const loadData = async () => {
        const response = await axios.get("https://sf-final-project.herokuapp.com/api/cases", {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`
            }
        }).then(res => {
            setData(res.data.data);
         });
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
                        {
                            data.map((report, index) => {
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
                                            <button deteleitem={index} onClick={handleDelete}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default StolenBikes;

