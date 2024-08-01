import React from "react";
import "./Button.css";

function Button ({label, onClick, type="button", className="", disabled=false }) {

    return (
        <button
            type={type}
            className={`btn ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;