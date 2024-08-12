import React, { useState } from "react";
import "./BudgetForm.css";
import { useDispatch } from "react-redux";
import { addBudget } from "../../redux/slices/budgetsSlice";
import Button from "../common/Button";

function BudgetForm({closeModal}) {
    const [ formData, setFormData ] =  useState({
        category: "",
        type: "income", // either "Income or Expense"
        budget: "",
        monthYear: new Date().toISOString().split("T")[0].slice(0, 7), // Init form with the current month
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
        console.log("Budget Form Disp[atched", newBudget)
        dispatch(addBudget(newBudget));
        closeModal();
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit} className="form-budget" >
                <div className="input-container">
                    <input 
                        type="month"
                        placeholder="Select Month and Year"
                        name="monthYear"
                        value={formData.monthYear}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <select className="transaction-type" name="type" value={formData.type} onChange={handleChange} >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
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