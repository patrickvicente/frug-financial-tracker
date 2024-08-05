import React, { useState } from "react";
import "./BudgetForm.css";
import { useDispatch } from "react-redux";
import { addBudget } from "../../redux/slices/budgetsSlice";
import Button from "../common/Button";

function BudgetForm({closeModal}) {
    const [ formData, setFormData ] =  useState({
        category: "",
        budget: "",
        total: 0
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBudget = {
            ...formData,
            budget: parseFloat(formData.budget),
        }

        dispatch(addBudget(newBudget));
        closeModal();
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit} className="form-budget" >
                <div className="input-container">
                    <input 
                        type="text"
                        placeholder="New Budget Category" 
                        name="category" 
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <input 
                        type="number"
                        placeholder="Amount" 
                        name="budget" 
                        value={formData.budget}
                        onChange={handleChange}
                    />
                </div>
                <Button label="Add Budget" className="button-budget" type="submit"/>
            </form>
        </div>
    );
};

export default BudgetForm;