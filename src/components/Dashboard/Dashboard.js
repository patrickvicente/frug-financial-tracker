import React from "react";
import "./Dashboard.css";
import { Icon } from "@iconify/react/dist/iconify.js";

function Dashboard() {
    // To write states here
    return (
        <div className="Dashboard">
            <div className="grid">
                    <div className="card balance">
                        <Icon className="icon dashboard-icon" icon="lucide:wallet" />
                        Balance<br/>$2,500.13
                    </div>
                    <div className="card income">
                        <Icon className="icon dashboard-icon" icon="mdi:hand-coin-outline" />
                        Income<br/>$3,200.00
                        <button>+</button>
                    </div>
                    <div className="card expenses">
                        <Icon className="icon dashboard-icon" icon="uil:money-insert" />
                        Expenses<br/>$2,800.00
                    </div>
                    <div className="card savings">
                        <Icon className="icon dashboard-icon" icon="fluent:savings-16-regular" />
                        Savings<br/>$2,500.13
                    </div>
                    <div className="card finances-analytics">Finances</div>
                    <div className="card expenses-analytics">Expenses</div>
                    <div className="card transactions">Transactions</div>
                    <div className="card budget">Budget</div>
                    <div className="card goals">Goals</div>
            </div>
        </div>
    )
};

export default Dashboard;