import React from "react";
import "./NavBar.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="NavBar">
            <h1 className="logo-text">früg</h1>
            <ul className="icon-container" >
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => isActive ? "active" : ""} >
                        <Icon className="icon nav-icon" icon="mage:dashboard-2-fill" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/transactions">
                        <Icon className="icon nav-icon" icon="grommet-icons:transaction" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/analytics">
                        <Icon className="icon nav-icon" icon="mdi:analytics" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/download">
                        <Icon className="icon nav-icon" icon="streamline:download-file-solid" />
                    </NavLink>
                </li>
            </ul>
            {/* <div className="Nav-bottom ">
                <Icon className="icon nav-icon logout" icon="majesticons:logout" />
            </div> */}
        </nav>
    )
};

export default NavBar