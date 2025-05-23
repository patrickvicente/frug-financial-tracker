import React, { useState } from "react";
import "./TransactionsView.css";
import Transactions from "./Transactions";
import { useSelector } from "react-redux";
import { selectAllBudgets } from "../../redux/selectors/budgetsSelector";
import Budgets from "../Budgets/Budgets";
import { selectAllTransactions, selectTransactionsByMonth } from "../../redux/selectors/transactionsSelectors";
import Button from "../common/Button";
import Filter from "../common/Filter";
import Modal from "../common/Modal";
import TransactionForm from "../TransactionForm/TransactionForm";
import BudgetForm from "../BudgetForm/BudgetForm";

function TransactionsView() {
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ transactionType, setTransactionType ] = useState("");
    const [ formType, setFormType ] = useState("transaction");
    const [ filterDate, setFilterDate ] = useState(null);
    const filteredTransactionsByMonth = useSelector(state => filterDate ? selectTransactionsByMonth(state, filterDate.month, filterDate.year) : []);
    const transactions = useSelector(selectAllTransactions);
    const budgets = useSelector(selectAllBudgets);

    const handleAdd = (form, txnType) => {
        setFormType(form)
        setTransactionType(txnType);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const getFilteredTransactions = (type) => {
        if (!filterDate) {
            // Return all transactions if no filter date is set
            return transactions.filter(transaction => transaction.type == type);
        }
        
        return filteredTransactionsByMonth.filter(transaction => transaction.type === type);
    };

    return (
        <div className="grid TransactionsView">
            <div className="card filter-container">
                <Filter className="card filter" transactions={transactions} onFilterChange={setFilterDate} />  
            </div>
                <Transactions heading="Income" className="income-transactions" transactions={getFilteredTransactions('income')} budgets={budgets}>
                    <Button label="Add Income" className="button-add" onClick={() => handleAdd("transaction", "income")} />
                </Transactions>
                <Transactions heading="Expenses" className="expense-transactions" transactions={getFilteredTransactions('expense')} budgets={budgets} >
                    <Button label="Add Expense" className="button-add" onClick={() => handleAdd("transaction", "expense")}/>
                </Transactions>
            <div className="card budgets-container">
                <Budgets budgets={budgets} handleAdd={handleAdd} />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} >
                {
                    formType === "transaction" 
                    ? <TransactionForm closeModal={closeModal} type={transactionType}  />
                    : <BudgetForm closeModal={closeModal} />
                }
            </Modal>
        </div>
    )
};

export default TransactionsView;