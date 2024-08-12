import React from "react";
import Budget from "./Budget";
import "./Budgets.css";
import Button from "../common/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

function Budgets({budgets, handleAdd}) {
    if (!budgets || budgets.length == 0) {
        return <p>No budget set.</p>
    }
    return (
        <div className="budgets" >
            <div className="card-header">
                Budget
                <div className="select-month">
                    <Icon className="icon icon-side" icon="iconamoon:arrow-left-2-thin" />
                    August 2024
                    <Icon className="icon icon-side" icon="iconamoon:arrow-right-2-thin" />
                </div>
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