import React, { useState } from "react";
import "./ExcelUpload.css";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionsSlice";
import { addBudget, addBudgetTransaction } from "../../redux/slices/budgetsSlice";
import { addAccountsTransaction } from "../../redux/slices/accountsSlice";
import { selectAccountsForDropdown } from "../../redux/selectors/accountsSelector";
import { excelDateToJSDate } from "../../utils/utils";
import Button from "../common/Button";

const ExcelUpload = ({ closeModal }) => {
    const [file, setFile] = useState(null);  // Store the selected file
    const [isDownloaded, setIsDownloaded] = useState(false);
    const dispatch = useDispatch();

    // Retrieve accounts from the Redux store
    const accounts = useSelector(selectAccountsForDropdown);
    const accountMap = accounts.reduce((map, account) => {
        map[account.name.toLowerCase()] = account.id;
        return map;
    }, {});

    const handleFileUpload = () => {
        if (!file) return;

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

                const accountId = accountMap[row.Account.toLowerCase()];
                if (!accountId) {
                    console.error(`Account name "${row.Account}" not found.`);
                    return;
                }

                const transaction = {
                    id: index + 1,
                    type: row.Type.toLowerCase(),
                    description: row.Description,
                    date: transactionDate,
                    amount: parseFloat(row.Amount),
                    category: row.Category,
                    account: accountId
                };
                console.log(transaction);

                dispatch(addTransaction(transaction));
                // Update budget only fo expense
                transaction.type === "expense" && dispatch(addBudgetTransaction(transaction));
                dispatch(addAccountsTransaction({ id: accountId, transaction }));
            });

            // Read Budgets Sheet
            const budgetsSheet = workbook.Sheets[workbook.SheetNames[1]];
            const budgetsData = XLSX.utils.sheet_to_json(budgetsSheet);

            budgetsData.forEach((row) => {
                const budget = {
                    monthYear: row.MonthYear,
                    category: row.Category.toLowerCase(),
                    budget: parseFloat(row.Budget),
                    type: row.Type.toLowerCase(),
                };
                if (isNaN(budget.budget) || budget.budget <= 0) {
                    console.warn(`Skipping invalid or zero budget for category: ${budget.category}`);
                    return;  // Skip if budget is not a valid number or zero
                }
                dispatch(addBudget(budget));
                console.log("uploaded budget", budget);
            });
        };

        reader.readAsArrayBuffer(file);
        closeModal();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);  // Store the selected file
    };

    const handleDownloadTemplate = () => {
        // Instructions sheet data
        const instructionsData = [
            ["Instructions"],
            [""],
            ["IMPORTANT!"],
            ["Make sure to add the accounts first on the website"],
            ["1. Transactions Sheet"],
            ["- 'Date': Enter the transaction date in DD/MM/YYYY format."],
            ["- 'Type': Specify whether the transaction is 'income' or 'expense'."],
            ["- 'Description': Provide a brief description of the transaction."],
            ["- 'Amount': Enter the transaction amount as a number (e.g., 100.50)."],
            ["- 'Category': Enter the category under which the transaction falls (e.g., 'Groceries', 'Salary')."],
            ["- 'Account': Enter the name of the account under which this transaction falls (e.g., 'Savings')."],
            [""],
            ["2. Budgets Sheet"],
            ["- 'MonthYear': Enter the year and month in YYYY-MM format (e.g., '2024-08')."],
            ["- 'Category': Enter the budget category (e.g., 'Groceries', 'Rent')."],
            ["- 'Budget': Enter the budgeted amount as a number (e.g., 500.00)."],
            ["- 'Type': Specify whether the budget is for 'income' or 'expense'."],
            [""],
            ["Note: Ensure that all data is filled in correctly as per the instructions to avoid errors during processing."]
        ];

        // Transactions sheet template
        const transactionsTemplate = [
            ["Date", "Type", "Description", "Amount", "Category", "Account"]
        ];

        // Budgets sheet template
        const budgetsTemplate = [
            ["MonthYear", "Category", "Budget", "Type"]
        ];

        // Create a new workbook and add sheets
        const workbook = XLSX.utils.book_new();

        // Add Instructions sheet
        const instructionsSheet = XLSX.utils.aoa_to_sheet(instructionsData);
        XLSX.utils.book_append_sheet(workbook, instructionsSheet, "Instructions");

        // Add Transactions sheet template
        const transactionsSheet = XLSX.utils.aoa_to_sheet(transactionsTemplate);
        XLSX.utils.book_append_sheet(workbook, transactionsSheet, "Transactions");

        // Add Budgets sheet template
        const budgetsSheet = XLSX.utils.aoa_to_sheet(budgetsTemplate);
        XLSX.utils.book_append_sheet(workbook, budgetsSheet, "Budgets");

        // Generate the Excel file and trigger download
        XLSX.writeFile(workbook, "Frug_Finance_Template.xlsx");
        setIsDownloaded(true);
    };

    return (
        <div className="excel-upload-container">
            <h3>Upload Transactions in Bulk</h3>
            {/* Checks if the file is downloaded */}
            {!isDownloaded 
            ? <>
                <p>NOTE: Please use the template before uploading the excel file</p>
                <Button className="button-download" onClick={handleDownloadTemplate} label="Download Excel Template"/>
                <div className="input-container">
                    <input type="file" onChange={handleFileChange} />
                </div>
            </>

            : <div className="input-container">
                <input type="file" onChange={handleFileChange} />
            </div>
            }
            
            {file && (
                <Button className="button-upload" onClick={handleFileUpload} label="Upload File" />
            )}
        </div>
    );
};

export default ExcelUpload;