import React from "react";
import { Line } from "react-chartjs-2";

const FinancesChart = ({data}) => {
    const BalanceChart = ({ data }) => {
        const chartData = {
            labels: data.map(item => item.date),
            datasets: [
                {
                    label: 'Balance',
                    data: data.map(item => item.balance),
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        };
    
        const options = {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month',
                    },
                },
                y: {
                    beginAtZero: true,
                },
            },
        };
    
        return (
            <div>
                <h2>Balance Over Time</h2>
                <Line data={chartData} options={options} />
            </div>
        );
    };
    
}

export default FinancesChart;