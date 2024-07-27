import React, { useState } from "react";
import "./Dashboard.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../common/Button";
import Transactions from "../Transactions/Transactions";
import Modal from "../common/Modal";
import TransactionForm from "../TransactionForm/TransactionForm";

function Dashboard() {
    const [ isModalOpen, setModalOpen ] = useState(false);

    const openModal = (type) => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    return (
        <div className="Dashboard">
            <div className="grid">
                    <div className="card balance">
                        <div className="card-icon">
                            <Icon className="icon dashboard-icon" icon="lucide:wallet" />
                        </div>
                        <div className="card-info">
                            Balance<br/>$2,500.13
                        </div>
                    </div>
                    <div className="card income">
                        <div className="card-icon">
                            <Icon className="icon dashboard-icon" icon="mdi:hand-coin-outline" />
                        </div>
                        <div className="card-info">
                            Income<br/>$3,200.00
                            <Button className="add-button" onClick={openModal} />
                        </div>
                    </div>
                    <div className="card expenses">
                        <div className="card-icon">
                            <Icon className="icon dashboard-icon" icon="uil:money-insert" />
                        </div>
                        <div className="card-info">
                            Expenses<br/>$2,800.00
                            <Button className="add-button" onClick={openModal} />
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
                    <div className="card finances-analytics">Finances</div>
                    <div className="card expenses-analytics">Expenses</div>
                    <div className="card transactions">
                        Transactions
                        <Transactions />
                    </div>
                    <div className="card budget">Budget</div>
                    <div className="card goals">Goals</div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} >
                <TransactionForm />
            </Modal>
        </div>
    )
};

export default Dashboard;