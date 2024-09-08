import React, { useState } from "react";
import "./Dashboard.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../common/Button";
import Transactions from "../Transactions/Transactions";
import Modal from "../common/Modal";
import TransactionForm from "../TransactionForm/TransactionForm";
import {useSelector } from "react-redux";
import { selectAllTotals, selectAllTransactions, selectTotalsByMonth, selectTransactionsByType } from "../../redux/selectors/transactionsSelectors";
import { selectAllBudgetCategories, selectAllBudgets } from "../../redux/selectors/budgetsSelector";
import { formatCurrency } from "../../utils/utils";
import Budgets from "../Budgets/Budgets";
import BudgetForm from "../BudgetForm/BudgetForm";
import ExpenseChart from "../Analytics/ExpenseChart";
import FinancesChart from "../Analytics/FinancesChart";
import Accounts from "../Accounts/Accounts";
import AccountForm from "../AccountForm/AccountForm";

function Dashboard() {
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ formType, setFormType ] = useState("transaction")
    const [ transactionType, setTransactionType ] = useState("");
    const transactions = useSelector(selectAllTransactions);
    const budgets = useSelector(selectAllBudgets);
    const budgetCategories = useSelector(selectAllBudgetCategories);
    const totals = useSelector(selectAllTotals);
    const totalsByMonth = useSelector(selectTotalsByMonth);
    const expenseTransactions = useSelector(state => selectTransactionsByType(state, "expense"))
    console.log("Expenses", expenseTransactions);
    console.log("Budget Categories", budgetCategories);

    const handleForm = (form, txnType) => {
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
                            <Button label="Add" className="button-add" onClick={() => handleForm("transaction","income")} />
                        </div>
                    </div>
                    <div className="card expenses">
                        <div className="card-icon">
                            <Icon className="icon dashboard-icon" icon="uil:money-insert" />
                        </div>
                        <div className="card-info">
                            Expenses<br/>{formatCurrency(totals.expenses)}
                            <Button label="Add" className="button-add" onClick={() => handleForm("transaction","expense")} />
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
                        <FinancesChart totals={totalsByMonth} />
                    </div>
                    <div className="card expenses-analytics">
                        <ExpenseChart expenses={budgetCategories} />
                    </div>
                    <Transactions heading="Transactions" transactions={transactions} budgets={budgets} />
                    <div className="card budgets-container">
                        <Budgets handleForm={handleForm} />
                    </div>
                    <div className="card accounts">
                        <Accounts handleForm={handleForm} />
                    </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} >
                {
                    formType === "transaction" 
                    ? <TransactionForm closeModal={closeModal} type={transactionType} />
                    : formType === "budget"
                    ? <BudgetForm closeModal={closeModal} />
                    : formType === "account"
                    ? <AccountForm closeModal={closeModal} type={transactionType}  />
                    : null
                }
            </Modal>
        </div>
    )
};

export default Dashboard;