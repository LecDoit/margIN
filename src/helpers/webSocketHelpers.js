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

export const lineChartFactory = (arg,arg2,arg3,tension,thicknes,bgO)=>{
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
        
        
    }]

    // const year = new Date(arg.returnData.rateInfos[0].ctm).getFullYear()
    // const month = new Date(arg.returnData.rateInfos[0].ctm).getMonth()

    
    for (let i = 0;i<arg.returnData.rateInfos.length;i++){
        const year = new Date(arg.returnData.rateInfos[i].ctm).getFullYear()
        const month = new Date(arg.returnData.rateInfos[i].ctm).getMonth()
        const open = (arg.returnData.rateInfos[i].open)
        const combine = `${year}`+`,`+`${month}`
        labels.push(combine)
        datasets[0].data.push(open)
        
    
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
