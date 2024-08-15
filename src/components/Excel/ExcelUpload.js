import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionsSlice";
import { addBudget, addBudgetTransaction } from "../../redux/slices/budgetsSlice";
import { excelDateToJSDate } from "../../utils/utils";

const ExcelUpload = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Read Transactions Sheet
            const transactionsSheet = workbook.Sheets[workbook.SheetNames[0]];
            const transactionsData = XLSX.utils.sheet_to_json(transactionsSheet);

            transactionsData.forEach((row, index) => {
                const transactionDate = excelDateToJSDate(row.Date).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });

                const transaction = {
                    id: index + 1,
                    type: row.Type.toLowerCase(),
                    description: row.Description,
                    date: transactionDate,
                    amount: parseFloat(row.Amount),
                    category: row.Category,
                };
                dispatch(addTransaction(transaction));
                dispatch(addBudgetTransaction(transaction))
                console.log("excel", transaction)
            });

            // Read Budgets Sheet
            const budgetsSheet = workbook.Sheets[workbook.SheetNames[1]];
            const budgetsData = XLSX.utils.sheet_to_json(budgetsSheet);

            budgetsData.forEach((row) => {
                const budget = {
                    monthYear: row.MonthYear,
                    category: row.Category.toLowerCase(),
                    budget: parseFloat(row.Budget),
                    type: row.Type,
                };
                dispatch(addBudget(budget));
            });
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default ExcelUpload;