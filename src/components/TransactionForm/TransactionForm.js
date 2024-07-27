import React from "react";
import "./TransactionForm.css";

function TransactionForm() {
    // TO DO add props to check wherher its expense or income
    return (
        <div className={`TransactionForm`}>
            <form >
                <input type="text" placeholder="Description" name="description" />
                <input type="number" placeholder="Amount" name="amount" />
                <input type="date" placeholder="Date" name="date" />
                {/*!! TO DO To validate category */}
                <input type="text" placeholder="Category" name="category" />
                <button className="button-txn" type="submit">Add Income</button>
            </form>
        </div>
    )
};

export default TransactionForm;

