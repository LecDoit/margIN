import React,{useEffect,useState,useCallback} from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import LineChart from "./LineChart"
import StockSearch from './StockSearch';



const chartRangeFactory = (start,end,symbol,ticks,period)=>{
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

const lineChartFactory = (arg,arg2)=>{

    const labels = []
    const datasets = [{
        label:arg2.symbol,
        data:[],
        backgroundColor:["magenta"],
        borderColor:'black',
        borderWidth:2
        
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

function WebSocket({user,pwd}) {

    const {stocks,dispatch} = useStocksContext() 


    const [socketUrl, setSocketUrl] = useState('wss://ws.xtb.com/demo');
    const [messageHistory, setMessageHistory] = useState([]);
    const [logId, setLogId] = useState([]);
    const [symbols,setSymbols] = useState('')
    const [logged,setLogged ] = useState(false);
    const [allSymbolsReceived,setAllSymbolsReceived ] = useState(false);

    const [operation,setOperation] = useState('')
    const [xtbStocks,setXtbStocks] = useState([])
    const [readyToBeSent,setReadyToBeSent] = useState([])
    const [currentStock,setCurrentStock] = useState('')
    const [counter,setCounter] = useState(0)

    const [equal,setEqual] = useState(false)


    const { sendMessage,sendJsonMessage, lastMessage, readyState ,lastJsonMessage} = useWebSocket(socketUrl,{
        onOpen: ()=> console.log('opened'),
        shouldReconnect: (CloseEvent)=>true,
    });
    
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

        
    const startDate = new Date('January 1, 2022').getTime()
    const endDate = new Date().getTime()

    

    

    const getAllSymbols = {"command":"getAllSymbols"}
    const getEurUSD = {
        "command": "getSymbol",
        "arguments": {
            "symbol": "EURPLN"
        }
    }



    const logIn = {
        "command": "login",
        "arguments": {
            "userId": user,
            "password": pwd,

        }
    }

// CATCHING MESSAGES CONTROLLER
    
    useEffect(() => {

        if (lastMessage !== null) {
        setMessageHistory((prev) => prev.concat(lastJsonMessage))

            if (operation==='login'){
                setLogId((lastJsonMessage))              
                setLogged(true)
                setOperation('LoggedIn')
                // console.log('2. im logging in and setup logged to true')
            }  else if (operation==='chartRequest'){

                if (counter===0){
                    // console.log('setting to finish now')
                    setOperation('finished')
                } else {

                    setXtbStocks((prevState)=>([...prevState,lastJsonMessage]))  
                    // console.log({otrzymuje:lastJsonMessage})
                    // console.log('7. chart rquest as operation and setting xtb stocks')
                    // console.log({couter:counter})
                    setCounter((count)=>count-1)
                }

            } else if (operation==='getAllSymbols'){
                setSymbols(lastJsonMessage)
                setAllSymbolsReceived(true)
                setOperation("getAllSymbolsReceived")
                // console.log('4. since its getallsymbols i should set symbols in jook and change symbols recieved to true')
            }

        }        

        
    }, [lastMessage]);


// INITIAL CONTROLLER
    // useEffect(()=>{ 
    //     sendJsonMessage(logIn)
    //     setOperation('login')  
    //     console.log('1. it should be first')

    //         // console.log(operation)
    // },[])

// OPERATION CONTROLLER 

    useEffect(()=>{


        // geting All Symbols
        if (operation===''){
            sendJsonMessage(logIn)
            setOperation('login')  
            // console.log('1. it should be first')
        } else if (operation==='getAllSymbolsReceived' ){
            // console.log('5. since all symbols are recieved we need to loop and send')
            if (stocks.length===0){
                setOperation('chartRequest')
                // console.log('5.1 stocks are 0 so set operation to chart request')
            } else {

            
            for (let a = 0 ; stocks.length>a;a++){
                sendJsonMessage(chartRangeFactory(stocks[a].start,endDate,stocks[a].symbol,stocks[a].ticks,stocks[a].period))
                // console.log('6. im doing loop')
                setOperation('chartRequest')
                setCounter((count)=>count+1)
            }
            }
            // setOperation('chartRequest')
        } else if (operation==="LoggedIn"){
                sendJsonMessage(getAllSymbols)
                setOperation('getAllSymbols')
                // console.log('3. since logged is true im asking for symbols and setup operation to get all symbols')

        // } else if (stocks.length===0) {
        //     console.log('NO GURWA')
        }
          
    },[operation])

    
    useEffect(()=>{
        if (operation==="chartRequest"){
            // console.log('it works now')
            setOperation('getAllSymbolsReceived')
            setXtbStocks([])
            setReadyToBeSent([])
        }
        // console.log({operation,stocks,xtbStocks})
        // console.log('jezeli stock sie odswiezyl globalnie to to powinno zadzialac')


    },[stocks])






    const printFunc = ()=>{
        sendJsonMessage(getAllSymbols)
        setOperation('getAllSymbols')

    }

    const printAllSymbols = ()=>{
        console.log({readyToBeSent,stocks,xtbStocks,operation})

       

    }
    useEffect(()=>{
        if (stocks.length===xtbStocks.length){
            // console.log('cos tutaj sie dzieje tutaj ma byc rowna dlugosc i loopuje')
            setReadyToBeSent([])
           
            for (let i =0;i<stocks.length;i++){
              
          
                setReadyToBeSent((prevState)=>([...prevState,lineChartFactory(xtbStocks[i],stocks[i])]))  
              
             }
        
        }
    },[stocks,xtbStocks])

    useEffect(()=>{

        if(stocks.length===xtbStocks.length && 
            xtbStocks.length===readyToBeSent.length){

            setEqual(true)

        } else{

            setEqual(false)
        }
        
    },[stocks,xtbStocks,readyToBeSent,equal])

    return (
        <div>
            {symbols ? <StockSearch symbols={symbols.returnData} userProps={user} pwd = {pwd}/> : <div>no</div>}
            <div>{connectionStatus}</div>
            <button onClick={printAllSymbols}>PrintAllSymbolsState</button>
            
            {equal===true && readyToBeSent.map((item,i)=>{
                
 
            return  <LineChart  stock={stocks[i]} user={user} pwd = {pwd} key={i} chartData=
                {item}/>
        
                    })
            }  


       



                
        </div>
    );
    }


export default WebSocket;

