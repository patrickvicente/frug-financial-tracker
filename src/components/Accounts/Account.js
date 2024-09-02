import React from "react";
import "./Account.css";
import { formatCurrency } from "../../utils/utils";

function Account({id, name, type, currentBalance}) {

    return (
        <div className="account-container" key={id} type={type}>
            <h4>{name}</h4>
            <p>{formatCurrency(currentBalance)}</p>
        </div>
    );
};

export default Account;