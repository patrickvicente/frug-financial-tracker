import React, { Children } from "react";

function OptionsMenu({children}) {
    return (
        <div className="dropdown">
            <div className="three-dots">
                &#x22EE; {/* HTML Entity for vertical ellipsis */}
            </div>
            <div className="dropdown-menu">
                {children}
            </div>
        </div>
    );
};

export default OptionsMenu;