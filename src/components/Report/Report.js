import React, {useEffect, useState} from "react";
import "../Authorization/Login.css";
import axios from "axios";

const Report = () => {
    const reportValues = {
        ownerFullName: "",
        licenseNumber: "",
        date: new Date(),
        color: "",
        officer:'',
        type: "",
        description: "",
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: "af1d5f18-40b4-4325-a2a8-754f2318337a",
        approved: false
    };
    const [formValues, setFormValues] = useState(reportValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log(formValues);
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };
    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);
        axios
            .post("https://sf-final-project.herokuapp.com/api/public/report", formValues)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        axios
            .create({
                baseURL: "/",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`,
                }
            })
            .post(`https://sf-final-project.herokuapp.com/api/cases`, formValues)
            .then(res => {
                console.log(res)
            });

    };
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    return (
        <div className="main-container">
            <div className="container">
                <div className="form-container">
                    <h1 className="form-logo">Theft report</h1>
                    {Object.keys(formErrors).length === 0 && isSubmitting && (
                        <span className="success-msg">?????????? ?????????????? ????????????????????!</span>
                    )}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="name">?????? ????????????????????</label>
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
                                <label htmlFor="license">?????????? ????????????????</label>
                                <div className="control-error">
                                </div>
                            </div>

                            <input
                                type="text"
                                name="licenseNumber"
                                id="licenseNumber"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="date">???????? ??????????</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="color">????????</label>
                                <div className="control-error">
                                </div>
                            </div>

                            <input
                                type="text"
                                name="color"
                                id="color"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="type">??????</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <label>
                                <input
                                    className="radio"
                                    type="radio"
                                    name="type"
                                    value="sport"
                                    onChange={handleChange}
                                />
                                Sport
                            </label>
                            <label>
                                <input
                                    className="radio"
                                    type="radio"
                                    name="type"
                                    value="general"
                                    onChange={handleChange}
                                />
                                Basic
                            </label>
                        </div>
                        <div className="form-control">
                            <div className="message">
                                <label htmlFor="description">????????????????</label>
                                <div className="control-error">
                                </div>
                            </div>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn log" type="submit">??????????????????</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Report;









