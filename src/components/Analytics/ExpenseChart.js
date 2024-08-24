import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import "./chart.css";
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

function ExpenseChart({ expenses }) {
   // Sort expenses from lowest to highest by totalSpent
   const sortedExpenses = expenses && expenses.length > 0 
   ? [...expenses].sort((a, b) => a.totalSpent - b.totalSpent) 
   : [];

    const expenseData = sortedExpenses.map(expense => Math.round(expense.totalSpent));
    const categories = sortedExpenses.map(expense => expense.category);
    console.log("chart categories", categories);
    const totalSpent = useMemo(() => expenseData.reduce((sum, expense) => sum + expense, 0), [expenseData]);
    
    const data = {
        labels: categories,
        datasets: [
            {
                label: "expense",
                data: expenseData,
                backgroundColor: [
                    '#15AD70', // Original Green
                    '#1E90FF', // Blue
                    '#8A2BE2', // Purple
                    '#20B2AA', // Teal
                    '#FFA500', // Orange
                    '#FF69B4', // Pink
                    '#FFD700', // Yellow
                    '#FF6347', // Red
                ],
                hoverOffset: 10,
                borderColor: "transparent",
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';

                        if (label) {
                            label += ': ';
                        }
                        const value = context.raw;
                        const percentage = ((value / totalSpent) * 100).toFixed(2);
                        label += `${percentage}%`;
                        return label;
                    }
                }
            },
        },
        cutout: "70%" // Hollow center for text
    };

    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: function (chart) {
            const { ctx, width, height } = chart;
            ctx.save();

            // Draw "Total Expenses" with px font size
            ctx.font = '14px inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#F1F0F5'; // Custom color for the text

            ctx.fillText('Total Expenses', width / 2, height / 2 - 10); // Adjusting the Y position to align text correctly

            // Draw totalSpent amount with 20px font size
            ctx.font = '20px inter';
            ctx.fillText(`$${totalSpent.toLocaleString()}`, width / 2, height / 2 + 15); // Adjusting the Y position for the amount

            ctx.restore();
        }
    };

    return (
        <div className="chart-container">
            {categories && categories.length > 0 ? (
                <Doughnut
                    className="chart-expense"
                    data={data}
                    options={options}
                    plugins={[centerTextPlugin]}
                />
            ) : (
                <p>No Data Found. Add Expense Transaction</p>
            )}
        </div>
    );
}

export default ExpenseChart;