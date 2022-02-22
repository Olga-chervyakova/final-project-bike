import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OfficerList.css";

const OfficerList = () => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)

    const handleApprove = (e) => {
        e.preventDefault();
        const personIdx = + e.target.attributes.getNamedItem("approveperson").value
        const person = data[personIdx]
        const persons = [...data]
        const onePerson = {...persons[personIdx]}

        if(person.approved===false){
            person.approved=true
            axios.put("https://sf-final-project.herokuapp.com/api/officers/${person._id}",person,{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => loadData())
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();

        const itemIdx = + e.target.attributes.getNamedItem("deleteperson").value
        const person = data[itemIdx]

        axios.delete("https://sf-final-project.herokuapp.com/api/officers/${person._id}",{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(() => loadData())
    }

    const loadData = async () => {
        setLoading(true)

        const response = await axios.get("https://sf-final-project.herokuapp.com/api/officers",{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        setData(response.data)
        setLoading(false)
    }

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
                            data.map((person,index) =>
                                <tr key={person._id}>
                                    <td>{person.firstName}</td>
                                    <td>{person.lastName}</td>
                                    <td>{person.email}</td>
                                    <td>{person.approved.toString()}</td>
                                    <td><button className="approve-btn" onClick={handleApprove} approveperson={index}>Одобрить</button></td>
                                    <td><button className="delete-btn" onClick={handleDelete} deleteperson={index}>Удалить</button></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default OfficerList;

