import React, { useState } from "react";
import "./TransactionForm.css";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionsSlice";

function TransactionForm({closeModal, type}) {
    const [ formData, setFormData ] = useState({
        type: type || "income",
        description: "",
        date: "",
        amount: "",
        category: "",
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
        console.log("Dispatched addTransaction:", newTransaction)
        closeModal();
    };

    return (
        <div className="transaction-form">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} />
                <input type="number" placeholder="Amount" name="amount" value={formData.amount} onChange={handleChange} />
                <input type="date" placeholder="Date" name="date" value={formData.date} onChange={handleChange} />
                {/*!! TO DO To validate category */}
                <input type="text" placeholder="Category" name="category" value={formData.category} onChange={handleChange} />
                <button className="button-txn" type="submit" >
                    {`Add ${ type === "income" ? "income" : "Expense"}`}
                </button>
            </form>
        </div>
    )
};

export default TransactionForm;

