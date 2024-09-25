import React, {useEffect} from "react";
import Transaction from "../Transaction/Transaction";
import "./Transactions.css";
import OptionsMenu from "../common/OptionsMenu";

function Transactions({heading, transactions, className, children, openDetailModal}) {

    useEffect(() => {
        console.log("Transactions component re-rendered with transactions:", transactions);
      }, [transactions]);

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
                { !transactions || transactions.length === 0
                ? <p>No transactions to display.</p>
                : sortedTransactions.map((transaction) => {
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
                            onClick={() => openDetailModal("transaction", {id, description, category, date, amount, type})}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Transactions;