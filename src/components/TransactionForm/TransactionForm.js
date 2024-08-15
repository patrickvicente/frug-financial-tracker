import React, { useState } from "react";
import "./TransactionForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionsSlice";
import { addBudget, addBudgetTransaction } from "../../redux/slices/budgetsSlice";
import Button from "../common/Button";
import { selectBudgetCategories } from "../../redux/selectors/budgetsSelector";

function TransactionForm({closeModal, type}) {
    const [ formData, setFormData ] = useState({
        type: type || "income",
        description: "",
        date: new Date().toISOString().split("T")[0],
        amount: "",
        category: "",
        newCategory: "",
    });
    const categories = useSelector(selectBudgetCategories);

    

    const dispatch = useDispatch();

    const handleChange = e => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    const handleNewCategoryChange = (e) => {
        setFormData({
            ...formData,
            newCategory: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Parse and format date
        const date = new Date(formData.date);
        const formattedDate = date.toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })

        let selectedCategory = formData.category;
        if (formData.newCategory) {
            selectedCategory = formData.newCategory;
        };

        const newTransaction = {
            ...formData,
            id: Date.now(),
            date: formattedDate,
            amount: parseFloat(formData.amount),
            category: selectedCategory,
        };

        dispatch(addTransaction(newTransaction))
        dispatch(addBudgetTransaction(newTransaction));
        
        console.log("Dispatched addTransaction:", newTransaction)
        closeModal();
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit} className="form-txn">
                <div className="input-container">
                    <input type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required/>
                </div>
                <div className="input-container">
                    <input type="number" placeholder="Amount" name="amount" value={formData.amount} onChange={handleChange} required/>
                </div>
                <div className="input-container">
                    <input type="date" placeholder="Date" name="date" value={formData.date} onChange={handleChange} required/>
                </div>
                <div className="input-container">
                    <select 
                        className="transaction-category" 
                        name="category" 
                        onChange={handleChange}
                        value={formData.category}
                    > 
                        {categories.length > 0 && categories.map((category) => {
                            return <option key={category} >{category}</option>
                        })}
                        <option value="" >Add New Category</option>
                    </select>

                    {/* Handles new category */}
                    {formData.category === "" && (
                        <input
                            type="text"
                            placeholder="New Category"
                            name="newCategory"
                            value={formData.newCategory}
                            onChange={handleNewCategoryChange}
                            required
                        />
                    )}
                </div>
                <Button
                    label={`Add ${ type === "income" ? "Income" : "Expense"}`} 
                    className="button-txn" type="submit" 
                />
                    
            </form>
        </div>
    )
};

export default TransactionForm;

