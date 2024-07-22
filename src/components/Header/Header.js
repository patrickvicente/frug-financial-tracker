import React from "react";
import "./Header.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import userIcon from "../../assets/icons/user_icon.png";

function Header() {
    return (
        <header>
            <div className="header-title">
                <h1>Dashboard</h1>
            </div>
            <div className="user-header" >
                <Icon className="icon user-icon" icon="mdi:user-circle" />
            </div>
        </header>
    );
}

export default Header; 