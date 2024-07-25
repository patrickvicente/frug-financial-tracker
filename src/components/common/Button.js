import React from "react";
import "./Button.css";

function Button ({ children, onClick, type="button", className="", disabled=false }) {

    return (
        <button
            type={type}
            className={`button ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;