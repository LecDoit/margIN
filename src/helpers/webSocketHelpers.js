import {format} from 'date-fns'
import { get } from 'react-hook-form'

export function formatDateTime(isoString) {
    const date = new Date(isoString);

    // Extract year, month, day, hours, and minutes
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    // Format as "YYYY-MM-DD HH:MM"
    // return `${year}-${month}-${day} ${hours}:${minutes}`;
    return `${year}-${month}-${day}`;
}


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

export const credentials = {
    user:16313473,
    password:"Xtbxtbxtb123"

}

export const tradeFactory = (td,price,quantity,type)=>{
    const trade ={
        tradeDate:td,
        price:price,
        quantity:quantity,
        type:type

    }
    return trade
}


export const getSymbolFactory = (symbol)=>{
    const getSymbol ={
        "command": "getSymbol",
        "arguments": {
            "symbol": `${symbol}`
        }
    }
    return getSymbol
    
}

export const lineChartDotsFactory = (date,price,type)=>{

    return 
}


export const lineChartFactory = (arg,arg2,arg3,tension,thicknes,bgO,buy,sell,trades)=>{

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
    {
        label:"trade",
        data:[],
        pointBackgroundColor:[],
        pointBorderColor:[],
        pointRadius:5,
        showLine:true,

    }
]

    
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
        if (trades){
            const searchPrice = trades.find((trade)=>trade.price==open)

            if (searchPrice){
                
                const tradeDate = new Date(searchPrice.tradeDate) 
                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                const formattedTradeDate = tradeDate.toLocaleDateString('en-GB', options);

                if(formatDateTime(formattedTradeDate)==formatDateTime(formattedDate)) {
                    datasets[3].data.push(open)
                    if (searchPrice.type=='buy'){
                        datasets[3].pointBackgroundColor.push('#00b232')
                        datasets[3].pointBorderColor.push('#00b232')
                    } else {
                         datasets[3].pointBackgroundColor.push('#d60000')
                         datasets[3].pointBorderColor.push('#d60000')
                    }
                }
            }else {
                datasets[3].data.push(null)
                datasets[3].pointBackgroundColor.push(null)
                datasets[3].pointBorderColor.push(null)
            }
            
            
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

export const findItemByProperty = (array,property,value)=>{
    return array.find(((item)=>item[property]===value))

}
    
export const endDate = new Date().getTime()


export const oneYearsInMilliseconds = 1 * 365.25 * 24 * 60 * 60 * 1000;
export const fiveYearsInMilliseconds = 5 * 365.25 * 24 * 60 * 60 * 1000;
export const tenYearsInMilliseconds = 10 * 365.25 * 24 * 60 * 60 * 1000;   
export const sixMonthsInMilliseconds = (365.25 / 2) * 24 * 60 * 60 * 1000;
export const oneMonthInMilliseconds = (365.25 / 12) * 24 * 60 * 60 * 1000;
export const oneWeekInMilliseconds = (365.25 / 52.17857) * 24 * 60 * 60 * 1000;

export const sevenDaysInMilliseconds = 7*24*60*60*1000
export const twoDaysInMilliseconds = 2*24*60*60*1000
export const oneDaysInMilliseconds = 1*24*60*60*1000




export const ticksAndPeriods = [
    {name:'IW',ticks:2500,period:1440,state:endDate-oneWeekInMilliseconds},
    {name:'IM',ticks:2501,period:1440,state:endDate-oneMonthInMilliseconds},
    {name:'6M',ticks:2502,period:1440,state:endDate-sixMonthsInMilliseconds},
    {name:'IY',ticks:2503,period:1440,state:endDate-oneYearsInMilliseconds},
    {name:'5Y',ticks:2504,period:1440,state:endDate-fiveYearsInMilliseconds},
    {name:'IOY',ticks:5005,period:1440,state:endDate-tenYearsInMilliseconds},        
]

export function convertMsToDate(ms) {
    const date = new Date(ms);
    return date.toISOString().slice(0, 16).replace("T", " ");
}

export const formatDateTo12Hour = (dateTime) => {
    const date = new Date(dateTime);
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    return date.toLocaleString('en-US', options);
};



export const calculatePortfolio = (stock)=>{
    const trades = stock.trades
    let holdingAsset = 0
    trades.map((trade)=>{
        if(trade.type==='buy'){
            holdingAsset= holdingAsset+trade.quantity
        } else if(trade.type==='sell'){
            holdingAsset= holdingAsset-trade.quantity
        }
        
    })
    // console.log(holdingAsset)
    return holdingAsset
    

}