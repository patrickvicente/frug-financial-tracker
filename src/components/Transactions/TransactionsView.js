import React from "react";
import "./TransactionsView.css";
import Transactions from "./Transactions";
import { useSelector } from "react-redux";
import { selectAllBudgets } from "../../redux/selectors/budgetsSelector";
import Budgets from "../Budgets/Budgets";
import { selectTransactionsByType } from "../../redux/selectors/transactionsSelectors";
import Button from "../common/Button";


function TransactionsView() {
    const incomeTransactions = useSelector(state => selectTransactionsByType(state, "income"));
    const expenseTransactions = useSelector(state => selectTransactionsByType(state, "expense"));
    const budgets = useSelector(selectAllBudgets)

    return (
        <div className="grid TransactionsView"> 
            <div className="card income-transactions">
                <div className="card-header">
                    Income
                    <Button label="Add Income" className="button-add" />
                </div>
                <Transactions transactions={incomeTransactions} budgets={budgets} />
            </div>
            <div className="card expense-transactions">
                <div className="card-header">
                    Expenses
                    <Button label="Add Expense" className="button-add" />
                </div>
                <Transactions transactions={expenseTransactions} budgets={budgets} />
            </div>
            <div className="card budgets-container">
                <Budgets budgets={budgets} />
            </div>
        </div>
    )
};

export default TransactionsView;