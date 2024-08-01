import React from "react";
import Budget from "./Budget";
import "./Budgets.css";
import Button from "../common/Button";

function Budgets({budgets, handleAdd}) {
    if (!budgets || budgets.length == 0) {
        return <p>No budget set.</p>
    }
    return (
        <div className="card budgets-container" >
            <div className="budgets-header">
                Budget
                <Button label="Add" className="button-add" onClick={() => handleAdd("budget")} />
            </div>
            <div className="budgets-list" >
                {budgets.map((byCategory) => {
                    console.log("byCategory", byCategory)
                    const { category, budget, total } = byCategory;

                    return (
                        <Budget 
                            category={category} 
                            budget={(budget)}
                            total={total}
                        />
                    )
                })}
            </div>
        </div>
    )
};

export default Budgets;