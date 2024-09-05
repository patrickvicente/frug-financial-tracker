import React from "react";
import "./Accounts.css";
import { useSelector } from "react-redux";
import { selectAllAccounts } from "../../redux/selectors/accountsSelector";
import Account from "./Account";

function Accounts({ handleForm, handleEdit }) {
    const accounts = useSelector(selectAllAccounts);

    return (
        <div className="accounts">
            <div className="card-header">
                Accounts
                <div className="dropdown">
                    <div className="three-dots">
                        &#x22EE; {/* HTML Entity for vertical ellipsis */}
                    </div>
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => handleForm("account")}>
                            Add
                        </div>
                        <div className="dropdown-item" onClick={() => handleEdit()}>
                            Edit
                        </div>
                        <div className="dropdown-item" onClick={() => handleForm("account", "transfer")}>
                            Transfer
                        </div>
                    </div>
                </div>
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
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Accounts;

