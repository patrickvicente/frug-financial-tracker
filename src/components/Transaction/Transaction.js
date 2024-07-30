import React from "react";
import "./Transaction.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatCurrency } from "../../utils/utils";

function Transaction({type, description, date, category, id, amount}) {

    const typeIcon = type === "income" ? <Icon className="icon icon-txn" icon="solar:round-arrow-down-bold" /> 
        : <Icon className="icon icon-txn" icon="solar:round-arrow-up-bold" />

    
    return (
        <div id={id}
            className={`Transaction ${type === "income" ? "income-txn" : "expense-txn"}`}
        >
            <div className="transaction-content">
                {typeIcon}
                <p>{type}</p>
                <p>{description}</p>
                <p className="amount">{formatCurrency(amount)}</p>
                <p>{date}</p>
                <p>{category}</p>
            </div>
        </div>
    );
};

export default Transaction;