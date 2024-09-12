import React from "react";
import "./Account.css";
import { formatCurrency } from "../../utils/utils";
import Button from "../common/Button";

function Account({id, name, type, currentBalance, isEditMode, onClick}) {

    return (
        <div className="account-container" key={id} type={type} onClick={onClick}>
            {isEditMode && (
                <Button label="edit" className="button-edit"/>
            )}
            <div className="account-info">
                <h4>{name}</h4>
                <p>{formatCurrency(currentBalance)}</p>
            </div>
        </div>
    );
};

export default Account;