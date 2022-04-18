import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OfficerList.css";
import "../StolenBikes/index.css";

const OfficerList = () => {
    const [data,setData] = useState([]);

    const handleApprove = (e) => {
        e.preventDefault();
        const officerIdx = + e.target.attributes.getNamedItem("approveofficer").value
        const officer = data[officerIdx]
        const officers = [...data]
        const oneOfficer = {...officers[officerIdx]}

        if (officer.approved === false) {
            officer.approved = true
            console.log(officer);
            axios.put(`https://sf-final-project.herokuapp.com/api/officers/${officer._id}`,officer,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`,
                }
            }).then(() => loadData())
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();

        const itemIdx = + e.target.attributes.getNamedItem("deleteofficer").value
        const officer = data[itemIdx]

        axios.delete(`https://sf-final-project.herokuapp.com/api/officers/${officer._id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`,
            }
        }).then(() => loadData())
    }

    const loadData = async () => {
        const response = await axios.get("https://sf-final-project.herokuapp.com/api/officers",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`
            }
        }).then(res => {
            setData(res.data.officers);
        });
    };

    useEffect(() => {
        loadData();
    }, []);
    return(<div className="main-container">
            <div className="table-container">
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                        <tr key="0">
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>e-mail</th>
                            <th>Одобрен</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table>
                        <tbody>
                        {
                            data.map((officers, index) => {
                                return (
                                    <tr key={officers._id}>
                                        <td>{officers.firstName}</td>
                                        <td>{officers.lastName}</td>
                                        <td>{officers.email}</td>
                                        <td>{officers.approved.toString()}</td>
                                        <td>
                                            <button className="approve-btn" onClick={handleApprove}
                                                    approveofficer={index}>Одобрить
                                            </button>
                                        </td>
                                        <td>
                                            <button className="delete-btn" onClick={handleDelete}
                                                    deleteofficer={index}>Удалить
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default OfficerList;

