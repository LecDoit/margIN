import React,{useEffect,useState,useCallback} from 'react';
import {Bar,Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import {Chart as ChartJS,
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement,
        Tooltip,
        Legend
} from 'chart.js/auto'


import {faker} from '@faker-js/faker';




function HeroLineChart() {

  const [refreshData,setRefreshData]= useState('')

  setTimeout(()=>{setRefreshData(Math.random())},4000)

   const options = {
    responsive: true,
    plugins: {
      annotation:{
        annotations:{ 
          line1:{
            type:'line',
            yMin: 600,
            yMax: 600,
            borderColor:'rgb(255,99,132)',
            borderWidth:2
          }
        }
      },
      legend: false,
      title: {
        display: true,

      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [

      {
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        data: labels.map(() => faker.number.int({ min: 200, max: 200 })),
        borderColor: 'rgb(255,99,132)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        data: labels.map(() => faker.number.int({ min: 700, max: 700 })),
        borderColor: 'rgb(0,128,0)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



    return(
        
          <div className='hero--1--2'>

            <Line data={data} options={options} />
          </div>
        
    )



}

export default HeroLineChart