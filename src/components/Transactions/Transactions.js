import React, {useEffect} from "react";
import Transaction from "../Transaction/Transaction";
import "./Transactions.css";
import OptionsMenu from "../common/OptionsMenu";

function Transactions({heading, transactions, className, children}) {

    useEffect(() => {
        console.log("Transactions component re-rendered with transactions:", transactions);
      }, [transactions]);

    if (!transactions || transactions.length === 0) {
        return <p>No transactions to display.</p>;
    }

    // Sort transactions by date in descending order
    const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return (
        <div className={`card transactions ${className}`}>
            <div className="card-header">
                {heading}
                {children}
                <OptionsMenu >
                    <div className="dropdown-item" >
                        Edit
                    </div>
                    <div className="dropdown-item" >
                        Delete
                    </div>
                    <div className="dropdown-item" >
                        Transfer
                    </div>
                </OptionsMenu>
            </div>
            <div className="transactions-list">
                {sortedTransactions.map((transaction) => {
                    const { id, description, amount, category, date, type } = transaction;

                    return ( 
                        <Transaction
                            key={id}
                            id={id}
                            description={description}
                            amount={amount}
                            category={category}
                            date={date}
                            type={type}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Transactions;