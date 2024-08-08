import React from "react";
import Transactions from "./Transactions";
import { useSelector } from "react-redux";
import { selectAllTransactions } from "../../redux/selectors/transactionsSelectors";
import { selectAllBudgets } from "../../redux/selectors/budgetsSelector";


function TransactionsView() {
    const transactions = useSelector(selectAllTransactions);
    const budgets = selectAllBudgets

    return (
        <div className="TransactionsView"> 
            <Transactions transactions={transactions} budgets={budgets} />
        </div>
    )
};

export default TransactionsView;