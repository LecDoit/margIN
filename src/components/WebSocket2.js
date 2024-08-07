import React,{useEffect,useState,useCallback} from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "../hooks/useStocksContext";
import useWebsocketHook from '../hooks/useWebSocketHook'
import LineChart from "./LineChart"
import StockSearch from './StockSearch';

import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'


const WebSocket2 = () => {
  const {data,error} = useWebsocketHook(getEurUsd)

  useEffect(()=>{
    if (data){
      console.log(data)
    }
    

  },[data])

    // const {stocks,dispatch} = useStocksContext() 
    // const [socketUrl, setSocketUrl] = useState('wss://ws.xtb.com/demo');
    // const [credentials,setCredentials] = useState({user:user,
    //                                                 pwd:pwd})


    // const { sendMessage,sendJsonMessage, lastMessage, readyState ,lastJsonMessage} = useWebSocket(socketUrl,{
    //     onOpen: ()=> console.log('opened'),
    //     onClose: ()=> console.log('closed'),
    //     onMessage:(e)=>console.log(e),
    //     // onMessage: (e)=>console.log(e)
    //     shouldReconnect: (closeEvent)=>false,
    //     // heartbeat: {
    //     //     message:`{
    //     //         "command": "ping"
    //     //     }`,
            
    //     //     returnMessage: 'pong',
    //     //     timeout: 60000, // 1 minute, if no response is received, the connection will be closed
    //     //     interval: 5000, // every 25 seconds, a ping message will be sent
    //     //   },
        
    // });

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    //   }[readyState];

 
    // useEffect(() => {

    //     console.log(credentials)

    //     sendJsonMessage(logIn(user, pwd));

    //     sendJsonMessage(getAllSymbols);
      
         

    // }, [pwd,user]);


  return (
    <div>WebSocket2


    </div>

  )
}

export default WebSocket2