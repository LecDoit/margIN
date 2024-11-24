import React,{useEffect,useState,useCallback} from 'react';
import {Line} from 'react-chartjs-2'
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
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
  const findIndex = (arg,arr)=>{
    const index= arr.indexOf(arg)
    // const deepCopy = JSON.parse(JSON.stringify(arr));
    const newArr = []

    for (let a = 0 ;a<arr.length;a++){
      if (a===index){
        newArr.push(arg)
      } else{
        newArr.push(null)
      }
    }

    return newArr
     

  }

  const [refreshData,setRefreshData]= useState('')

  const [labels,setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July'])
  const [color,setColors] = useState(['#00b232', '#00b232', '#00b232', '#00b232', '#00b232', '#00b232', '#00b232'])
  const [data1,setData1] = useState( labels.map(() => faker.number.int({ min: 0, max: 1000 })))
  const [trade,setTrade] = useState()

  const random  = (findIndex(getRandomItem(data1),data1))

  setTimeout(()=>{
    setData1(labels.map(() => faker.number.int({ min: 0, max: 1000 })))
  },4000)


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
        datalabels: {
          display: false}

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
  },
    
}



  const data = {
    labels,
    datasets: [

      {

        data:data1,
        fill:true,
        borderColor: '#002c58',
        backgroundColor:`rgba(0, 44, 88,0.03`,
        pointRadius:0,
        tension:0,
        borderWidth:1.4,
      },
      {
        data: labels.map(() => faker.number.int({ min: 200, max: 200 })),
        borderColor: `rgba(0, 175, 50)`,
        backgroundColor: `rgba(0, 175, 50)`,
        pointRadius:0,
        tension:0,
        borderWidth:1.4,
      },
      {
        data: labels.map(() => faker.number.int({ min: 700, max: 700 })),
        borderColor: `rgba(214, 0, 90)`,
        backgroundColor: `rgba(214, 0, 90)`,
        pointRadius:0,
        tension:0,
        borderWidth:1.4,
      },
      {
        label:"trade",
        data:random,
        pointBackgroundColor:()=>Math.random()<0.5? 'rgba(0, 175, 50)':'rgba(214, 0, 90)',
        pointBorderColor:()=>Math.random()<0.5? 'rgba(0, 175, 50)':'rgba(214, 0, 90)',
        pointRadius:5,
        showLine:false,

    }
    ],
    

  };
  // console.log(data.datasets[3].data)


    return(
        
          <div className='hero--1--2'>

            <Line options={options}  data={data} />
          </div>
        
    )



}

export default HeroLineChart