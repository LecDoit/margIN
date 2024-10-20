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
    responsive:true,
    interaction:{
        mode:'nearest',
        axis:'xy',
        intersect:false
    },
    maintainAspectRatio:false,
    plugins:{
        legend:{
            display:false,
        },
        tooltip:{
            enabled:true,
            mode:'nearest',
           
            callbacks:{
                label: (e)=>{
                    return `Price: ${e.raw}`
                }
            },
            backgroundColor:'rgba(0, 67, 241)',
            titleFont:{
            },
            displayColors:false,         
            
        },

    },
    elements:{
        line:{

        }
    },
    scales:{
        x:{
            display:true,
            grid:{
                display:false
            },
            ticks:{
                maxTicksLimit:7,
                align:"start"
                
            }
        },
        y:{
            display:true,
            grid:{
                display:false
            },
            ticks:{
                // color:'#fff',
                callback: (e)=>{
                    return `${e}`
                }
            }
        }
    }
    
}
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [

      {

        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        fill:true,
        borderColor: '#002c58',
        backgroundColor:'rgba(0, 44, 88, 0.03)',
        pointRadius:0,
        tension:0,
        borderWidth:1.4,
      },
      {
        data: labels.map(() => faker.number.int({ min: 200, max: 200 })),
        borderColor: 'rgb(255,99,132)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius:0,
        tension:0,
        borderWidth:1.4,
      },
      {
        data: labels.map(() => faker.number.int({ min: 700, max: 700 })),
        borderColor: 'rgb(0,128,0)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius:0,
        tension:0,
        borderWidth:1.4,
      },
    ],
  };


    return(
        
          <div className='hero--1--2'>

            <Line options={options}  data={data} />
          </div>
        
    )



}

export default HeroLineChart