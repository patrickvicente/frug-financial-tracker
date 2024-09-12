import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./DetailModal.css";

function DetailModal({ isOpen, onClose, type, data}) {
    if (!isOpen) return null; //  return nothing oif the modal is closed

    // render content dynamically based on type and data
    const renderContent = () => {
        switch (type) {
            case "account":
                return (
                    <div className="details-containers">
                        <h2>Account Details</h2>
                        <p>Name: {data.name}</p>
                        <p>Type: {data.type}</p>
                        <p>Balance: {data.currentBalance}</p>
                    </div>
                );
            case "transaction":
                return (
                    <div className="details-containers">
                        <h2>Transaction Details</h2>
                        <p>Description: {data.description}</p>
                        <p>Category: {data.category}</p>
                        <p>Amount: {data.amount}</p>
                        <p>Date: {data.date}</p>
                    </div>
                );
            case "budget":
                return (
                    <div className="details-containers">
                        <h2>Budget Details</h2>
                        <p>Category: {data.category}</p>
                        <p>Allocated Budget: {data.budget}</p>
                        <p>Remaining: {data.remaining}</p>
                    </div>
                );
            default:
                return <p>No details available.</p>;
        }
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}><Icon icon="ep:close-bold" /></button>
                {renderContent()}

                {/* Modal footer for Edit and Delete */}
                <div className="detail-modal-footer">
                    <button >
                        Edit
                    </button>
                    <button >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DetailModal;