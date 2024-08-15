import React, { useState } from "react";
import "./Dashboard.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../common/Button";
import Transactions from "../Transactions/Transactions";
import Modal from "../common/Modal";
import TransactionForm from "../TransactionForm/TransactionForm";
import {useSelector } from "react-redux";
import { selectAllTotals, selectAllTransactions, selectTotalsByMonth, selectTransactionsByType } from "../../redux/selectors/transactionsSelectors";
import { selectAllBudgets, selectBudgetCategories } from "../../redux/selectors/budgetsSelector";
import { formatCurrency } from "../../utils/utils";
import Budgets from "../Budgets/Budgets";
import BudgetForm from "../BudgetForm/BudgetForm";
import ExpenseChart from "../Analytics/ExpenseChart";
import FinancesChart from "../Analytics/FinancesChart";

function Dashboard() {
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ formType, setFormType ] = useState("transaction")
    const [ transactionType, setTransactionType ] = useState("");
    const transactions = useSelector(selectAllTransactions);
    const budgets = useSelector(selectAllBudgets);
    const budgetCategories = useSelector(selectBudgetCategories);
    const totals = useSelector(selectAllTotals);
    const totalsByMonth = useSelector(selectTotalsByMonth);
    const expenseTransactions = useSelector(state => selectTransactionsByType(state, "expense"))
    console.log("Expenses", expenseTransactions);
    console.log("Budget Categories", budgetCategories);

    const handleAdd = (form, txnType) => {
        setFormType(form)
        setTransactionType(txnType);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);
    
    return (
        <div className="Dashboard">
            <div className="grid">
                    <div className="card balance">
                        <div className="card-icon">
                            <Icon className="icon dashboard-icon" icon="lucide:wallet" />
                        </div>
                        <div className="card-info">
                            Balance<br/>{formatCurrency(totals.balance)}
                        </div>
                    </div>
                    <div className="card income">
                        <div className="card-icon">
                            <Icon className="icon dashboard-icon" icon="mdi:hand-coin-outline" />
                        </div>
                        <div className="card-info">
                            Income<br/>{formatCurrency(totals.income)}
                            <Button label="Add" className="button-add" onClick={() => handleAdd("transaction","income")} />
                        </div>
                    </div>
                    <div className="card expenses">
                        <div className="card-icon">
                            <Icon className="icon dashboard-icon" icon="uil:money-insert" />
                        </div>
                        <div className="card-info">
                            Expenses<br/>{formatCurrency(totals.expenses)}
                            <Button label="Add" className="button-add" onClick={() => handleAdd("transaction","expense")} />
                        </div>
                    </div>
                    <div className="card savings">
                        <div className="card-icon">
                            <Icon className="icon dashboard-icon" icon="fluent:savings-16-regular" />
                        </div>
                        <div className="card-info">
                            Savings<br/>$2,500.13
                        </div>
                    </div>
                    <div className="card finances-analytics">
                        Finances
                        <FinancesChart totals={totalsByMonth} />
                    </div>
                    <div className="card expenses-analytics">
                        Expenses
                        <ExpenseChart categories={budgetCategories} expenses={expenseTransactions} />
                    </div>
                    <div className="card transactions">
                        Transactions
                        <Transactions transactions={transactions} budgets={budgets} />
                    </div>
                    <div className="card budgets-container">
                        <Budgets handleAdd={handleAdd} />
                    </div>
                    <div className="card accounts">Accounts</div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} >
                {
                    formType === "transaction" 
                    ? <TransactionForm closeModal={closeModal} type={transactionType} />
                    : <BudgetForm closeModal={closeModal} />
                }
            </Modal>
        </div>
    )
};

export default Dashboard;