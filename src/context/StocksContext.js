import { createContext } from "react";
import { useReducer } from "react";


export const StocksContext = createContext() 

export const stocksReducer = (state,action)=>{
    switch (action.type){
        case 'SET_STOCKS':
            // console.log('SET STOCKS');
            // console.log(action.payload)
            return {
                
                stocks:action.payload
            }
        case 'CREATE_STOCK':
            // console.log(action.payload)
            return {
                // stocks:[action.payload,...state.stocks] 
                stocks:action.payload

            }


        case "DELETE_STOCK":
            // console.log({DELETE_STOCK:action.payload})

            return{

                stocks:action.payload

            }
        default:
            return state
    }

}


export const StocksContextProvider = ({children})=>{

    const [state,dispatch] = useReducer(stocksReducer,{
        stocks: null
    })



    return(
        <StocksContext.Provider value={{...state,dispatch}}>
            {children}

        </StocksContext.Provider>
    )

}

