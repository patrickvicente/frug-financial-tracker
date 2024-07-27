import React from "react";
import Transaction from "../Transaction/Transaction";


// Hard coded transactions list
const transactionsList = [
    {
    id: 123454,
    type: "income",
    description: "Salary",
    date: "July 23, 2024",
    amount: 1578.58,
    category: "Salary",
    },
    {
        id: 546781,
        type: "expense",
        description: "Rent",
        date: "July 4, 2024",
        amount: 1521.25,
        category: "Salary",
        },
]

function Transactions() {
    if (transactionsList.length === 0) {
        return <p>No transactions to display.</p>;
    }
    
    return (
        <div className="TransactionsList">
            {transactionsList.map((transaction) => (
                <Transaction
                    id={transaction.id}
                    description={transaction.description}
                    amount={transaction.amount}
                    category={transaction.category}
                    date={transaction.date}
                    type={transaction.type}
                />
            ))}
        </div>
    );
};

export default Transactions;