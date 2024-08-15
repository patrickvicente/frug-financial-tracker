import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./chart.css";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement)

function ExpenseChart({expenses}) {
    const expenseData = expenses && expenses.length > 0 ? expenses.map(expense => expense.totalSpent) : [];
    const categories = expenses && expenses.length > 0 ? expenses.map(expense => expense.category) : [];
    console.log("chart categories",categories)
    const data={
        labels: categories,
        datasets: [
            {
                label: "expense",
                data: expenseData,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 1,
                borderColor: "transparent",
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: true, // Show the legend
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += context.raw;
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="chart-container">
            {categories && categories.length > 0 ? (
                <Doughnut className="chart-expense" data={data} options={options}/>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

export default ExpenseChart;