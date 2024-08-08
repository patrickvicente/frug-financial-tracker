import React, {useState, useEffect}from "react";
import { Line } from "react-chartjs-2";

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

      console.log("chart data", chartData);
    
      
      return (
        <div>
          <Line data={chartData} />
        </div>
      );
};

export default FinancesChart;

