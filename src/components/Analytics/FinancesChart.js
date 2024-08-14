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
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend,
);


const FinancesChart = ({data}) => {
    const labels = Object.keys(data);
    const incomeData
    return (
      <LineGraph />
    )
};

export default FinancesChart;

