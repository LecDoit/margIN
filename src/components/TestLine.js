import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LineChartWithBuySellDots = () => {
  const [highlightedPoints, setHighlightedPoints] = useState([]);
  const [day, setDay] = useState('');
  const [price, setPrice] = useState('');
  const [tradeType, setTradeType] = useState(''); // New state for trade type

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const prices = [50, 60, 70, 60, 65, 55, 75]; // Sample data for line

  const data = {
    labels: weekDays,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
        pointRadius: 0, // Hide all default points
        showLine: true, // Show the line only
      },
      {
        label: 'Highlighted Points',
        data: prices.map((price, index) => {
          const day = weekDays[index];
          const point = highlightedPoints.find(
            (point) => point.day === day && point.price === price
          );
          return point ? price : 0; // Only show dot if it's highlighted
        }),

        // this is just styling
        pointBackgroundColor: highlightedPoints.map((point) =>
          point.tradeType === 'buy' ? 'green' : 'red'
        ),
        pointBorderColor: highlightedPoints.map((point) =>
          point.tradeType === 'buy' ? 'green' : 'red'
        ),
        pointRadius: 8,
        showLine: false, // Hide connecting line for custom points
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const addHighlightPoint = () => {
    if (day && price && tradeType) {
      setHighlightedPoints((prevPoints) => [
        ...prevPoints,
        { day, price: Number(price), tradeType },
      ]);
      setDay('');
      setPrice('');
      setTradeType('');
    }
  };

  return (
    <div>
      <h3>Add Buy/Sell Dots on the Line Chart</h3>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Select Day:
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">--Choose Day--</option>
            {weekDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: '20px' }}>
          Enter Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            min="0"
            max="100"
          />
        </label>
        <label style={{ marginLeft: '20px' }}>
          Trade Type:
          <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
            <option value="">--Choose Type--</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <button onClick={addHighlightPoint} style={{ marginLeft: '20px' }}>
          Add Point
        </button>
      </div>


      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartWithBuySellDots;
