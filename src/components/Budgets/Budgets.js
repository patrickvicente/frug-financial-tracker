import React, { useState } from "react";
import Budget from "./Budget";
import "./Budgets.css";
import Button from "../common/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { selectBudgetByMonth, selectBudgetsByMonth } from "../../redux/selectors/budgetsSelector";
import { formatMonthYear, getNextMonth, getPreviousMonth, getThisMonth } from "../../utils/utils";

function Budgets({handleAdd}) {
    const [ monthYear, setMonthYear ] = useState(getThisMonth())
    const budgets = useSelector((state) => selectBudgetByMonth(state, monthYear));
    let remainingToBudget = null;
    let totalBudget = null;
    if (budgets) {
        remainingToBudget = budgets.remaining; // remaining budget for the month
        totalBudget = budgets.totalBudget; // totalb budget for the month
    }
    
    
    return (
        <div className="budgets" >
            <div className="card-header">
                Budget
                <div className="select-month">
                    <Icon className="icon icon-side" icon="iconamoon:arrow-left-2-thin" onClick={() => setMonthYear(getPreviousMonth(monthYear))} />
                    {formatMonthYear(monthYear)}
                    <Icon className="icon icon-side" icon="iconamoon:arrow-right-2-thin" onClick={() => setMonthYear(getNextMonth(monthYear))}/>
                </div>
                <Button label="Add" className="button-add" onClick={() => handleAdd("budget")} />
            </div>
            
            {/* Handles cases where budget is not set */}
            {!budgets ? <p>No budget set.</p>
            : <div className="budgets-list" >
                    <Budget category="remaining to budget" remaining={remainingToBudget} budget={remainingToBudget} total={totalBudget} id="remaining"/>
                    {Object.entries(budgets.categories).map(([key, value]) => {
                        console.log("Budgest Comp category", key, value)
                        const { budget, remaining, totalSpent } = value;
                        const category = key;

                        return (
                            <Budget 
                                category={category} 
                                budget={budget}
                                total={totalSpent}
                                remaining={remaining}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
};

export default Budgets;