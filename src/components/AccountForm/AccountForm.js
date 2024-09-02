import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {v4 as uuidv4 } from 'uuid';
import "./AccountForm.css";
import Button from "../common/Button";
import { addAccount } from "../../redux/slices/accountsSlice";

function AccountForm({closeModal}) {
    const [ formData, setFormData ] = useState({
        id: uuidv4(), // generate a unique id
        name: "",
        type: "", // spending, savings, investment, credit, loan
        startingBalance: "",
    });
    const accountTypes = [ "spending", "savings", "investment", "credit", "loan" ];
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addAccount(formData));
        closeModal();
    };

    return (
        <div className="accounts-form form">
            Add a New Account
            <form onSubmit={handleSubmit} className="form-accounts">
                <div className="input-container">
                    <input type="text" placeholder="Account Name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="input-container" >
                    <select name="type" onChange={handleChange} value={formData.type} required>
                        <option value="" disabled>Select Account Type</option>
                        <option value="savings">Savings</option>
                        <option value="spending">Spending</option>
                        <option value="credit">Credit</option>
                        <option value="investment">Investment</option>
                        <option value="loan">Loan</option>
                    </select>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="Staring Balance" name="startingBalance" value={formData.startingBalance} onChange={handleChange} inputMode="decimal" pattern="^\d*(\.\d{0,2})?$" />
                </div>
                <Button label="Add New Account" type="submit" className="button-txn" />
            </form>
        </div>
    )
};

export default AccountForm;