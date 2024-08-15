import React from "react";
import { useSelector } from "react-redux";
import { selectTotalsByMonth } from "../../../redux/selectors/transactionsSelectors";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );

const IncomeExpenseBarChart = () => {
  const totalsByMonth = useSelector(selectTotalsByMonth);

  const months = Object.keys(totalsByMonth);
  const incomeData = months.map(month => totalsByMonth[month].income);
  const expenseData = months.map(month => totalsByMonth[month].expenses);

  const data = {
    labels: months, // X-axis labels (months)
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Income vs. Expenses",
        },
      },
  };

  return <Bar data={data} options={options} />;
};

export default IncomeExpenseBarChart;