import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MyChartComponent = ({ data }) => {
    console.log("MyChartComponent rendered");
    console.log("Chart data", data);
    const cyanColor = {
        strong: 'rgba(75,192,192,1)',
        light: 'rgba(75,192,192,0.4)',
    };
    const offWhiteColor = {
        default: 'rgba(220,220,220,1)'
    }
    const salmonColor = {
        strong: 'rgba(255,99,132,1)',
        light: 'rgba(255,99,132,0.4)',
    }

    const chartData = {
        labels: data.map(item => item.date), // use the dates as the labels
        datasets: [
            {
                label: 'body weight',
                data: data.map(item => item.weight), // use the numbers as the data points
                fill: false,
                lineTension: 0.1,
                backgroundColor: cyanColor.light,
                borderColor: cyanColor.strong,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: cyanColor.strong,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: cyanColor.strong,
                pointHoverBorderColor: offWhiteColor.default,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            },
        ],
    };
    return <Line data={chartData} />;
};

export default MyChartComponent;