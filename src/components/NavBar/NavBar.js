import React from "react";
import "./NavBar.css";
import { Icon } from "@iconify/react/dist/iconify.js";

function NavBar() {
    return (
        <div className="NavBar">
            <h1 className="logo-text">früg</h1>
            <div className="icon-container" >
                <Icon className="icon nav-icon" icon="mage:dashboard-2-fill" />
                <Icon className="icon nav-icon" icon="grommet-icons:transaction" />
                <Icon className="icon nav-icon" icon="mdi:analytics" />
                <Icon className="icon nav-icon" icon="streamline:download-file-solid" />
            </div>
            <div className="Nav-bottom ">
                <Icon className="icon nav-icon logout" icon="majesticons:logout" />
            </div>
        </div>
    )
};

export default NavBar