import React from "react";
import "./Button.css";
import { Icon } from "@iconify/react/dist/iconify.js";

function Button ({ onClick, type="button", className="", disabled=false }) {

    const buttonIcon = () => {
        return className === "add-button" ?
            <Icon className="icon button-icon" icon="zondicons:add-solid" /> : 
            <Icon className="icon button-icon" icon="zondicons:minus-solid" />
    };

    return (
        <button
            type={type}
            className={`button ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {buttonIcon()}
        </button>
    );
};

export default Button;