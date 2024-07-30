import React from "react";
import "./Modal.css";
import { Icon } from "@iconify/react/dist/iconify.js";

function Modal({isOpen, onClose, children}) {
    if(!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose} >
            <div className="modal" onClick={(e) => e.stopPropagation()} >
                <button className="close-button" onClick={onClose}><Icon icon="ep:close-bold" /></button>
                {children}
            </div>
        </div>
    );
};

export default Modal;