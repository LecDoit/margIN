import React,{useEffect,useState,useCallback} from 'react';


import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import LineChart from "./LineChart"
import StockSearch from './StockSearch';

import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'



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
        onClose: ()=> console.log('closed'),
        // onMessage: (e)=>console.log(e)
        shouldReconnect: (closeEvent)=>true,
        heartbeat: {
            message:`{
                "command": "ping"
            }`,
            
            // {
            //     "command": "ping",
            //     "streamSessionId": `${logId.streamSessionId}`
            // },
            returnMessage: 'pong',
            timeout: 60000, // 1 minute, if no response is received, the connection will be closed
            interval: 5000, // every 25 seconds, a ping message will be sent
          },
        
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

    // console.log(lastJsonMessage)        
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
            sendJsonMessage(logIn(user,pwd))
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
        // console.log(logId.streamSessionId)
        

       

    }
    useEffect(()=>{
        // console.log("1",xtbStocks)
        // if (xtbStocks.status===undefined){
        //     console.log("2",xtbStocks)
        //     setOperation('')
            
        // } else {

        if (stocks.length===xtbStocks.length){
            // console.log('cos tutaj sie dzieje tutaj ma byc rowna dlugosc i loopuje')
            setReadyToBeSent([])
           
            for (let i =0;i<stocks.length;i++){
                // console.log("3",xtbStocks)
                setReadyToBeSent((prevState)=>([...prevState,lineChartFactory(xtbStocks[i],stocks[i])]))  
        
             }

            
        }
    // }
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

