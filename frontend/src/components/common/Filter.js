import React, { useState, useEffect } from "react";

function Filter({ transactions, onFilterChange }) {
    const [uniqueDates, setUniqueDates] = useState([]);

    useEffect(() => {
        const dates = transactions.map(transaction => {
            const date = new Date(transaction.date);
            return date.toLocaleString("default", { month: "long", year: "numeric" });
        });
        setUniqueDates([...new Set(dates)]);
    }, [transactions]);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        if (value === "all") {
            onFilterChange(null);
        } else {
            const [month, year] = value.split(" ");
            const date = new Date(`${month} 1, ${year}`);
            onFilterChange({
                month: date.getMonth(),
                year: date.getFullYear()
            });

            console.log('Date Logged', date);
        }

    };

    return (
        <div className="filter-container">
            <select id="dateFilter" onChange={handleFilterChange}>
                <option value="all">All</option>
                {uniqueDates.map((date, index) => (
                    <option key={index} value={date}>{date}</option>
                ))}
            </select>
        </div>
    );
}

export default Filter;