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
        const aDate = (new Date(arg.returnData.rateInfos[i].ctm))
        const formatadate = format(aDate,'MM/dd/yyyy HH:mm')
        const year = new Date(arg.returnData.rateInfos[i].ctm).getFullYear()
        const month = new Date(arg.returnData.rateInfos[i].ctm).getMonth()
        const open = (arg.returnData.rateInfos[i].open)/100
        const combine = `${year}`+`,`+`${month}`
        labels.push(formatadate)
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
