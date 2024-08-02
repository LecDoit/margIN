import { AuthContext} from "../context/AuthContext";
// import { useStocksContext } from "../src/hooks/useStocksContext";
import { useContext } from "react";

export const useAuthContext = ()=>{
    const context = useContext(AuthContext)

    if (!context){
        throw Error('useAuthContext must be used inside an AuthContext.Provider')
    }

    return context
}
