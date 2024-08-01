import React, { useState } from "react";
import "./BudgetForm.css";
import { useDispatch } from "react-redux";
import { addBudget } from "../../redux/slices/budgetsSlice";

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
        <form onSubmit={handleSubmit} >
            <input 
                type="text"
                placeholder="New Budget Category" 
                name="category" 
                value={formData.category}
                onChange={handleChange}
            />
            <input 
                type="number"
                placeholder="Amount" 
                name="budget" 
                value={formData.budget}
                onChange={handleChange}
            />
            <button className="button-budget" type="submit">Add Budget</button>
        </form>
    );
};

export default BudgetForm;