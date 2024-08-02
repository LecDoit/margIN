import { StocksContext} from "../context/StocksContext";
// import { useStocksContext } from "../src/hooks/useStocksContext";
import { useContext } from "react";

export const useStocksContext = ()=>{
    const context = useContext(StocksContext)

    if (!context){
        throw Error('useStocksContext must be used inside an StocksContext.Provider')
    }

    return context
}
