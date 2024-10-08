import {format} from 'date-fns'

export const chartRangeFactory = (start,end,symbol,ticks,period)=>{
    const chartRange = {
        "command": "getChartRangeRequest",
        "arguments": {
            "info": {
                "end": end,
                "period": period,
                "start": start,
                "symbol": symbol,
                "ticks": ticks
            }
        }
    }

    return chartRange
}



export const lineChartFactory = (arg,arg2,arg3,tension,thicknes,bgO,buy,sell)=>{
    // console.log(arg.returnData.rateInfos)

    const labels = []
    const datasets = [{
        label:arg2,
        data:[],
        fill:true,
        backgroundColor:[`rgba(0, 44, 88,${bgO})`],
        borderColor:arg3,
        borderWidth:thicknes,
        tension:tension,
        pointRadius:0,        
    },
    {
        label:"buy",
        data:[],
        fill:true,
        backgroundColor:[`rgba(0, 175, 50,0.01)`],
        borderColor:`rgba(0, 175, 50)`,
        borderWidth:thicknes,
        tension:tension,
        pointRadius:0,        
    },
    {
        label:"sell",
        data:[],
        fill:`end`,
        backgroundColor:[`rgba(214, 0, 90,0.01)`],
        borderColor:`rgba(214, 0, 90)`,
        borderWidth:thicknes,
        tension:tension,
        pointRadius:0,        
    },
]

    // const year = new Date(arg.returnData.rateInfos[0].ctm).getFullYear()
    // const month = new Date(arg.returnData.rateInfos[0].ctm).getMonth()

    
    for (let i = 0;i<arg.returnData.rateInfos.length;i++){
        const date = (new Date(arg.returnData.rateInfos[i].ctm))
        const day = date.getDate().toString().padStart(2, '0');  // Gets the day and pads it to 2 digits
        const month = date.toLocaleString('en-US', { month: 'short' });  // Gets the abbreviated month name
        const year = date.getFullYear();  // Gets the full year

        const formattedDate = `${day} ${month} ${year}`;

        const open = (arg.returnData.rateInfos[i].open)/100

        labels.push(formattedDate)
        datasets[0].data.push(open)
        if (buy>0){
            datasets[1].data.push(buy)
        }
        if (sell>0){
            datasets[2].data.push(sell)
        }
        
        
                
    
    }

    const chartjsObj = {
        labels:labels,
        datasets:datasets

    }

    return chartjsObj
}


    export const logIn = (user,pwd)=>{

    
        return ({
        "command": "login",
        "arguments": {
            "userId": user,
            "password": pwd,

        }
        })
    }



export const getAllSymbols = {"command":"getAllSymbols"}
export const getEurUsd = {
        "command": "getSymbol",
        "arguments": {
            "symbol": "EURPLN"
        }
    }


export const findKeyByTicks = (obj, targetTicks) => {
        for (const key in obj) {
            if (obj[key].ticks === targetTicks) {
                return key; // Return the key if the ticks value matches
            }
        }
        return null; // Return null if no match is found
    };




export  const ticksAndPeriods = {
    '1W':{ticks:2017,period:5,state:'lastWeek'},
    '1M':{ticks:1460,period:30,state:'lastMonth'},
    '6M':{ticks:1095,period:240,state:'last6Months'},
    '1Y':{ticks:2016,period:240,state:'lastYear'},
    '5Y':{ticks:1825,period:1440,state:'last5Years'},
    '10Y':{ticks:520,period:10080,state:'last10Years'},        
}