import React from 'react';
import { Pie } from 'react-chartjs-2';
import {colors} from '../helpers/webSocketHelpers'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getByDisplayValue } from '@testing-library/react';
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ portfolioEvaluation }) => {
  // Filter and process data to exclude evaluations with value 0
  const colorArray = [
    colors.DARKBLUE,
    colors.BLUE,
    colors.LIGHTBLUE,
    colors.LIGHTERGRAY,
    colors.LOADINGLIGHTGRAY,
    colors.COAL,
    colors.LIGHTGRAY,
  ];
  const filteredData = portfolioEvaluation.filter((item) => item.evaluation > 0);

  // Extract labels (e.g., symbol) and evaluations
  const labels = filteredData.map((item) => item.symbol); // Change to item.type if you want to group by type
  const dataValues = filteredData.map((item) => item.evaluation);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Evaluation',
        data: dataValues,
        backgroundColor: colorArray.slice(0, labels.length), // Dynamically pick colors based on dataset size
        hoverBackgroundColor: colorArray.slice(0, labels.length).map(
          (color) => `${color}CC` // Slightly transparent hover effect
        ),
        borderWidth: 1,
        borderColor:colors.DARKBLUE 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    
    plugins: {
      legend: {
        display: true, // Ensure the legend is displayed
        position: 'right', // Position the legend to the right of the chart
        labels: {
          color: colors.DARKBLUE, // Customize label text color if needed
          font: {
            size: 12, // Customize font size
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(2)}`;
          },
        },
      },
      datalabels: {
        color: colors.WHITE, // Text inside the pie chart segments
        font: {
          size: 12,
          weight: 'bold',
        },
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          console.log(context.dataset.label)
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%` ; // Show percentage
        },
      },
    },
  };

  return (
    <motion.div 
        whileHover={{scale:1.02,backgroundColor:colors.WHITE,
        boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)',
        border:`1px solid ${colors.LIGHTBLUE}`}}
        transition={{type:"tween",duration:0.1}}
         
        className='piechart'
    >
        <div className='piechart--title oswald'>Asset Distribution Overview</div>
        <div className='piechart--chart'>
            <Pie data={data} options={options} />
        </div>
        
    </motion.div>
  );
};

export default PieChart;
