import {useEffect,useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useStocksContext } from "./useStocksContext";
import { useAuthContext } from "./useAuthContext";
import {chartRangeFactory,lineChartFactory,logIn,getAllSymbols,getEurUsd} from '../helpers/webSocketHelpers'


const useWebSocketHook = (xtbMessageArg) => {

    const {user} = useAuthContext()
    const {stocks,dispatch} = useStocksContext() 
    const [socketUrl, setSocketUrl] = useState('wss://ws.xtb.com/demo');

    const [xtbMessage,setXtbMessage] = useState('')

    const [data,setData]= useState(null);
    const [isPendingCredentials,setIsPendingCredentials]= useState(null);
    const [error,setError]= useState(null);


    const [userXtb,setUserXtb] = useState('')
    const [passwordXtb,setPasswordXtb] = useState('')
    const [streamSessionId, setStreamSessionId] = useState(null)



    const fetchCredentials = async()=>{
        // const response = await fetch('http://localhost:10000/stocks/getCredentials',{
        const response = await fetch('https://xtbbackend.onrender.com/stocks/getCredentials',{
            method:'GET',
            headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        setUserXtb(json.user)
        setPasswordXtb(json.password)
        setXtbMessage(xtbMessageArg)
                                              
                                              
                                              
                                                      }

    const { sendMessage,sendJsonMessage, lastMessage, readyState ,lastJsonMessage} = useWebSocket(socketUrl,{
        // onOpen: ()=> console.log('opened'),
        // onClose: ()=> console.log('closed'),
        // onMessage:(e)=>console.log(e),
        shouldReconnect: (closeEvent)=>false,

        
    });

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    //   }[readyState];

//  get the XTB credentials from API
    useEffect(() => {
        // console.log('initial')

        if (user){
            fetchCredentials()
            // console.log('fetching crede and setting up the argument to send')
        }
    }, []);

// since we received the credentials from API we can now log into the XTB WebSocket
    useEffect(()=>{
        if(userXtb){
            sendJsonMessage(logIn(userXtb, passwordXtb));
        }
    },[userXtb])

  
// component for gathering the neccessary messages
    useEffect(()=>{

        // for streamSession ID message
        if(lastJsonMessage?.status===true && lastJsonMessage !== undefined && lastJsonMessage?.streamSessionId){
            // console.log('this is happening')
            setStreamSessionId(lastJsonMessage.streamSessionId)
        } 

        // for any other requested Data
        if  (lastJsonMessage?.returnData  ){
            setData(lastJsonMessage)   
            // console.log('what is happening here?',lastJsonMessage)
        }

        // console.log(lastJsonMessage)
        
    },[lastJsonMessage,sendJsonMessage])


// execute this code right after we log in into the XTB WebSocket
    useEffect(()=>{
        if (streamSessionId){
            sendJsonMessage(xtbMessage)
        }
     

    },[setStreamSessionId,streamSessionId])


    // useEffect(()=>{

    //     console.log(data)
    // },[data])



  return {data,error}
}

export default useWebSocketHook