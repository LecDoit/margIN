import React, { useEffect, useState } from 'react';
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
import { sort } from 'semver';
import { motion } from "framer-motion";
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
  const sortedAndRemoved =  sortAssetTypeAndRemove(assetType)
  const sorted = sortAssetType(assetType)

  const [possesedToggle,setPossesedToggle] = useState(false)
  const [value2Use,setValue2Use] = useState('')



  useEffect(()=>{
    if (possesedToggle){
      setValue2Use(sortedAndRemoved)
    } else {
      setValue2Use(sorted)
    }
  },[possesedToggle,assetType])


  const data = {
    labels:   Object.keys(value2Use),
    datasets: [
      {
        label: 'Assets',
        data: value2Use,
        backgroundColor:  Object.values(value2Use).map(() => possesedToggle ? colors.BLUE : colors.DARKBLUE), // Default color
        hoverBackgroundColor:  Object.values(value2Use).map(() => colors.LIGHTBLUE), // Hover color
        borderColor: colors.BLACK,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    <motion.div 
      whileHover={{scale:1.02,backgroundColor:colors.WHITE,
      boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)',
      border:`1px solid ${colors.LIGHTBLUE}`}}
      transition={{type:"tween",duration:0.1}}
      className='barchart'
      >
      <div className='barchart--toggle'> 
        <div className='barchart--title oswald'>{possesedToggle ? 'Portfolio': 'All' } Monitored Asset Overview</div>
        <Switch setPossesedToggle={setPossesedToggle} possesedToggle={possesedToggle}/>
      </div>
      <div className='barchart--control'>
      <Bar data={data} options={options} />
      </div>

    </motion.div>
  );
};

export default BarChart;
