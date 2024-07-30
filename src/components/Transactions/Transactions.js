import React, {useEffect} from "react";
import Transaction from "../Transaction/Transaction";
import "./Transactions.css";

function Transactions({transactions}) {

    useEffect(() => {
        console.log("Transactions component re-rendered with transactions:", transactions);
      }, [transactions]);

    if (!transactions || transactions.length === 0) {
        return <p>No transactions to display.</p>;
    }

    return (
        <div className="transactions-list   ">
            {transactions.map((transaction) => {
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
    );
};

export default Transactions;