import React from "react";
import "./Header.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const getHeaderTitle = () => {
        if (location.pathname.includes("/dashboard")) {
            return "Dashboard";
        } else if (location.pathname.includes("/transactions")) {
            return "Transactions";
        } else if (location.pathname.includes("/analytics")) {
            return "Analytics";
        } else {
            return "Welcome!";
        }
    };

    return (
        <header>
            <div className="header-title">
                <h1>{getHeaderTitle()}</h1>
            </div>
            <div className="user-header" >
                <Icon className="icon user-icon" icon="mdi:user-circle" />
            </div>
        </header>
    );
}

export default Header; 