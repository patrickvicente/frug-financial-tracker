import React from "react";
import "./Budget.css";
import { formatCurrency } from "../../utils/utils";

function Budget({ category, budget, total }) {

    const percentSpend = (total / budget) * 100;
    const progress = percentSpend > 100 ? 100 : percentSpend;

    return (
        <div className="budget-container">
            <div className="budget-details">
                <p>{category}</p>
                <p>{formatCurrency(total)}<span>/{formatCurrency(budget)}</span></p>
            </div>
            <div className="budget-bar">
                <div className="filled" style={{width: `${progress}%`}}></div>
            </div>
        </div>
    )
};

export default Budget;