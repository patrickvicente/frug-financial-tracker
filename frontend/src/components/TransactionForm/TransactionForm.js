import React, { useState } from "react";
import "./TransactionForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionsSlice";
import { addBudgetTransaction } from "../../redux/slices/budgetsSlice";
import Button from "../common/Button";
import { selectBudgetCategories } from "../../redux/selectors/budgetsSelector";
import { selectAccountsForDropdown } from "../../redux/selectors/accountsSelector";
import { addAccountsTransaction } from "../../redux/slices/accountsSlice";

function TransactionForm({closeModal, type}) {
    const [ formData, setFormData ] = useState({
        type: type || "income",
        description: "",
        date: new Date().toISOString().split("T")[0], // init date for today
        amount: "",
        category: "",
        newCategory: "",
        account: "", // account ID default spending
    });
    const categories = useSelector(selectBudgetCategories);
    const accounts = useSelector(selectAccountsForDropdown);

    const dispatch = useDispatch();

    const handleChange = e => {
        console.log("Field Changed:", e.target.name, "Value:", e.target.value); // Add this lin
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
        console.log("Selected Account ID:", formData.account);
        dispatch(addTransaction(newTransaction))
        // check if it is an expecnse transaction then update budgetsSlice
        newTransaction.type === "expense" && dispatch(addBudgetTransaction(newTransaction));
        dispatch(addAccountsTransaction({ id: formData.account, transaction: newTransaction }));
        
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
                    <select className="transaction-account" name="account" onChange={handleChange} value={formData.account}>
                        <option value="" disabled>Select Account</option>
                        {accounts.length > 0 && accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
                    </select>
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

