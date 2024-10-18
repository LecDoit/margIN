import {useCallback, useEffect,useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "./useStocksContext";
import { useAuthContext } from "./useAuthContext";
import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd,credentials} from '../helpers/webSocketHelpers'



const useWebSocketHook = (xtbMessageArg) => {
// console.log('how many times running?')

    const {user} = useAuthContext()
    const {stocks,dispatch} = useStocksContext() 
    const [socketUrl, setSocketUrl] = useState('wss://ws.xtb.com/demo');

    const [xtbMessage,setXtbMessage] = useState('')

    const [data,setData]= useState(null);
    const [isLoggedIn,setIsLoggedIn]= useState(false);
    const [error,setError]= useState(null);

    const [streamSessionId, setStreamSessionId] = useState(null)
    const [hookIsLoading,setHookIsLoading] = useState(false)


    const { sendMessage,sendJsonMessage, lastMessage, readyState ,lastJsonMessage} = useWebSocket(socketUrl,{
        onOpen: ()=> {
            console.log('opened')           
            sendJsonMessage(logIn(credentials.user,credentials.password))
        },
        onClose: ()=> console.log('closed',lastJsonMessage),
        onError: (e)=> setError(e),
        onMessage:()=>{
  
          

        }
            ,
        shouldReconnect: ()=>true,

        
    });

    // sendJsonMessage(logIn(credentials.user,credentials.password))
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

      const functionCall = useCallback((arg) =>{

            sendJsonMessage(arg)

      },[streamSessionId,sendJsonMessage])

      useEffect(()=>{
        
        if (lastJsonMessage){
            console.log('is true',lastJsonMessage)
            if (lastJsonMessage.status && lastJsonMessage.streamSessionId){
                const receivedSessionKey = lastJsonMessage.setStreamSessionId
                localStorage.setItem('sessionKey',receivedSessionKey)
                setStreamSessionId(receivedSessionKey)
                // hookIsLoading(true)
                setIsLoggedIn(true)
            }
        if (lastJsonMessage.returnData){
            setData(lastJsonMessage)
            setHookIsLoading(false)
            }
        }

      },[lastJsonMessage,sendJsonMessage])




  return {data,error,setHookIsLoading,functionCall,isLoggedIn}
}

export default useWebSocketHook

// naprawic zeby zmienialo sie na true w jednym momencie