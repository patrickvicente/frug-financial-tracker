import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button";
import { selectAccountsForDropdown } from "../../redux/selectors/accountsSelector";
import { transferAmount } from "../../redux/slices/accountsSlice";
import "./TransferForm.css";

function TransferForm({closeModal}) {
    const [ formData, setFormData ] = useState({
        fromAccountId: "",
        toAccountId: "",
        amount: "",
    });
    const accounts = useSelector(selectAccountsForDropdown);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const transferData = {
            ...formData,
            id: Date.now(),
            amount: parseFloat(formData.amount),
        }
        dispatch(transferAmount(transferData));
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} className="form-transfer">
                Transfer
                <div className="input-container">
                    <input 
                        type="text" 
                        placeholder="Amount" 
                        name="amount" 
                        value={formData.amount} 
                        onChange={handleChange} 
                        inputMode="decimal" 
                        pattern="^\d*(\.\d{0,2})?$" 
                    />
                </div>
                From
                <div className="input-container" >
                    <select className="input-account" name="fromAccountId" onChange={handleChange} value={formData.fromAccountId}>
                        <option value="" disabled>Select Account</option>
                        {accounts.length > 0 && accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
                    </select>
                </div>
                To
                <div className="input-container">
                    <select className="input-account" name="toAccountId" onChange={handleChange} value={formData.toAccountId}>
                        <option value="" disabled>Select Account</option>
                        {accounts.length > 0 && accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
                    </select>
                </div>
                <Button label="Transfer Amount" type="submit" className="button-txn" />
        </form>
    )
};


export default TransferForm;