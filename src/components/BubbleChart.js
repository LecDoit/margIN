import React from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Required for time formatting
import ChartDataLabels from "chartjs-plugin-datalabels";
import { colors } from "../helpers/webSocketHelpers";

ChartJS.register(TimeScale, LinearScale, PointElement, Tooltip, Legend);

const TradeBubbleChart = ({ bubbleData }) => {

    const mapDataset = (data) => {
        const minRadius = 5; // Minimum bubble radius
        const maxRadius = 20; // Maximum bubble radius
      
        // Find min and max values in the dataset
        const minValue = Math.min(...data.map((item) => item.value));
        const maxValue = Math.max(...data.map((item) => item.value));
      
        // Normalize bubble radius
        const normalizeRadius = (value) => {
          if (minValue === maxValue) return (minRadius + maxRadius) / 2; // Handle uniform data
          return (
            minRadius +
            ((value - minValue) / (maxValue - minValue)) * (maxRadius - minRadius)
          );
        };
      
        return {
          label: "Trade Data",
          data: data.map((item) => ({
            x: item.date,
            y: item.type === "buy" ? 2 : 8,
            r: normalizeRadius(item.value), // Use normalized radius
            rawValue:item.value,
            symbol:item.symbol
          })),
          backgroundColor: data.map((item) =>
            item.type === "buy" ? colors.GREENF : colors.REDF
          ),
          borderColor: data.map((item) =>
            item.type === "buy" ? colors.GREEN : colors.RED
          ),
          borderWidth: 1,
        };
      };


  const data = {
    datasets: [mapDataset(bubbleData)],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time", // Use a time scale for the X-axis
        title: {
          display: false,
          text: "Date",
        },
        time: {
          unit: "day", // Display ticks per day
        },
        grid:{
            display:true
        }
      },
      y: {
        title: {
          display: false,
          text: "Trade Type",
        },
        ticks: {
          stepSize: 1,
          callback: (value) => (value === 2 ? "Buy" : value === 8 ? "Sell" : ""),
        },
        grid:{
            display:true
        },
        min: 0,
        max: 10,
      },
    },
    plugins: {
    legend:{
        display:false
    },

      tooltip: {
        callbacks: {
          label: function (context) {
            const type = context.raw.y === 2 ? "Buy" : "Sell";
            return `${context.raw.symbol} Value: $${context.raw.rawValue}`;
          },
        },
      },
      datalabels:{
      align:"top",
      color:colors.DARKBLUE,
      formatter: function (value, context) {

        return value.rawValue
        
      },
      font: {
        size: 12, // Font size
      },
      }
    },
  };

  return <Bubble className="dashboard--bubble" data={data} options={options} />;
};

export default TradeBubbleChart;
