import React from "react";
import "./Analytics.css";
import IncomeExpenseBarChart from "./charts/IncomeExpenseChart";

function Analytics() {

    return (
        <div className="grid analytics-container" >
            <div className="card finance-overview">
                <IncomeExpenseBarChart />
            </div>
            <div className="card expense-overview"></div>
            <div className="card categories-overview"></div>
            <div className="card budget-overview"></div>
        </div>
    )
};

export default Analytics;