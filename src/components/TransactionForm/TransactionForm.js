import React, { useState } from "react";
import "./TransactionForm.css";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionsSlice";
import { addBudgetTransaction } from "../../redux/slices/budgetsSlice";

function TransactionForm({closeModal, type, categories}) {
    const [ formData, setFormData ] = useState({
        type: type || "income",
        description: "",
        date: "",
        amount: "",
        category: categories.length > 0 ? categories[0] : "",
    });

    const dispatch = useDispatch();

    const handleChange = e => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    // !!! TO DO handling when form is empty

    const handleSubmit = (e) => {
        e.preventDefault();
        // Parse and format date
        const date = new Date(formData.date);
        const formattedDate = date.toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
        const newTransaction = {
            ...formData,
            id: Date.now(),
            date: formattedDate,
            amount: parseFloat(formData.amount)
        };

        dispatch(addTransaction(newTransaction))

        if (newTransaction.type === "expense") {
            dispatch(addBudgetTransaction(newTransaction));
        }
        console.log("Dispatched addTransaction:", newTransaction)
        closeModal();
    };

    return (
        <div className="transaction-form">
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required/>
                <input type="number" placeholder="Amount" name="amount" value={formData.amount} onChange={handleChange} required/>
                <input type="date" placeholder="Date" name="date" value={formData.date} onChange={handleChange} required/>
                <select 
                    className="transaction-category" 
                    name="category" 
                    onChange={handleChange}
                    value={formData.category}
                > 
                    {
                        categories.length > 0 && categories.map((category) => {
                            return <option key={category} >{category}</option>
                        })
                    }
                </select>
                {/* // TO DO handle Add when it's a NEW CATEGORY
                // ADD transaction type in cat */}
                <button className="button-txn" type="submit" >
                    {`Add ${ type === "income" ? "income" : "Expense"}`}
                </button>
            </form>
        </div>
    )
};

export default TransactionForm;

