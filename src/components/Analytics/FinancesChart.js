import React from "react";
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend, 
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend,
);


const FinancesChart = ({totals}) => {
  console.log("Finances Chart is Rendering")
    const labels = Object.keys(totals);
    const incomeData = labels.map(label => totals[label].income);
    const expensesData = labels.map(label => totals[label].expenses);
    const balanceData = labels.map(label => totals[label].balance);

    const data = {
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "green",
          fill: false,
        },
        {
          label: "Expenses",
          data: expensesData,
          borderColor: "red",
          fill: false,
        },
        {
          label: "Balance",
          data: balanceData,
          borderColor: "blue",
          fill: false,
        },
      ],
    };

    console.log("chart totals", totals);
    console.log("Chart Data: ", data);
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Income, Expenses, and Balance Over Time",
        },
      },
      scales: {
        x: {
            type: 'category',
        },
        y: {
            beginAtZero: true,
        },
      },
    };
    return <Line data={data} options={options}/>
    
};

export default FinancesChart;

