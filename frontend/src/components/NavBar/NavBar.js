import React, { useState } from "react";
import "./NavBar.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";
import Modal from "../common/Modal";
import ExcelUpload from "../Excel/ExcelUpload";

function NavBar() {
    const [ isModalOpen, setModalOpen ] = useState(false);
    const handleClick = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


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
                    <Icon className="icon nav-icon" icon="streamline:download-file-solid" onClick={handleClick} />
                </li>
            </ul>
            {/* <div className="Nav-bottom ">
                <Icon className="icon nav-icon logout" icon="majesticons:logout" />
            </div> */}
            <Modal isOpen={isModalOpen} onClose={closeModal} >
                <ExcelUpload closeModal={closeModal} />
            </Modal>
        </nav>
    )
};

export default NavBar