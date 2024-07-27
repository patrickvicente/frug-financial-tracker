import React from "react";
import "./Modal.css";

function Modal({isOpen, onClose, children}) {
    if(!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose} >
            <div className="modal" onClick={(e) => e.stopPropagation()} >
                <button className="close-button" onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;