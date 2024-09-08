import React, { useState } from "react";
import "./Accounts.css";
import { useSelector } from "react-redux";
import { selectAllAccounts } from "../../redux/selectors/accountsSelector";
import Account from "./Account";
import OptionsMenu from "../common/OptionsMenu";
import { set } from "date-fns";

function Accounts({ handleForm, handleEdit }) {
    const accounts = useSelector(selectAllAccounts);
    const [ isEditMode, setIsEditMode] = useState(false); //Track edit mode state

    const toggleEditMode = () => {
        setIsEditMode((prevState) => !prevState); // Toggle the edit mode
    };

    return (
        <div className="accounts">
            <div className="card-header">
                Accounts
                <OptionsMenu >
                    <div className="dropdown-item" onClick={() => handleForm("account")}>
                        Add
                    </div>
                    <div className="dropdown-item" onClick={toggleEditMode}>
                        Edit
                    </div>
                    <div className="dropdown-item" onClick={() => handleForm("account", "transfer")}>
                        Transfer
                    </div>
                </OptionsMenu>
                
            </div>
            {/* Checks if there is an existing account */}
            {!accounts ? (
                <p>Please add an account</p>
            ) : (
                <div className="accounts-list">
                    {/* maps through the state and renders account */}
                    {Object.entries(accounts).map(([key, value]) => {
                        const { name, type, currentBalance } = value;
                        const id = key;

                        return (
                            <Account
                                key={id}
                                id={id}
                                name={name}
                                type={type}
                                currentBalance={currentBalance}
                                isEditMode={isEditMode}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Accounts;

