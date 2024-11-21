import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {colors,sortAssetType,sortAssetTypeAndRemove} from '../helpers/webSocketHelpers';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Switch from './Switch'
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = ({ assetType,assetTypeTotalWorth }) => {
  const sorted = sortAssetTypeAndRemove(assetType)
  const values = Object.values(sorted);
  const [isOn,setIsOn] = useState(false)

  // console.log(assetTypeTotalWorth,assetType,sortAssetTypeAndRemove(assetType))

  const data = {
    labels: Object.keys(sorted),
    datasets: [
      {
        label: 'Assets',
        data: values,
        backgroundColor: values.map(() => colors.DARKBLUE), // Default color
        hoverBackgroundColor: values.map(() => colors.LIGHTBLUE), // Hover color
        borderColor: colors.BLACK,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        displayColors:false,  
        titleFont:{
        },
        enabled: true,  // Enable the tooltip
        backgroundColor: colors.BLUE, // Background color of tooltip
        titleColor: colors.WHITE, // Title text color
        bodyColor: colors.WHITE, // Body text color
        borderColor: colors.LIGHTBLUE, // Border color of the tooltip
        borderWidth: 1, // Border width of the tooltip
        callbacks: {
          // Custom tooltip for the label
          label: (tooltipItem)=> {

            // Show custom format for the tooltip value
            return `Total Value: ${Math.floor(assetTypeTotalWorth[tooltipItem.label])}`
          },
        },
      },
      datalabels: {
        color: colors.LIGHTGRAY, // Label color (inside bars)
        font: {
          size: 14,
          
        },
        anchor: 'center', // Center of the bar
        align: 'center',  // Center of the bar
        formatter: (value) => (value === 0 ? '' : value),
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
  };

  return (
    <div>
      <div className='barchart--title oswald'>Asset Allocation Overview</div>
      
      <Bar data={data} options={options} />
      <Switch isOn={isOn} onClick={()=>setIsOn(!isOn)} />
    </div>

  );
};

export default BarChart;
