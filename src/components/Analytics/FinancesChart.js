
import React, {useState, useEffect}from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const FinancesChart = ({data}) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
      });
    
      useEffect(() => {
        const formattedData = {
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
        setChartData(formattedData);
      }, [data]);
    
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

export default FinancesChart;