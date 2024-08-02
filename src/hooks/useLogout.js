import { useAuthContext } from "./useAuthContext"
import { useStocksContext } from "../hooks/useStocksContext";


export const useLogout = ()=>{

    const {dispatch} = useAuthContext()
    const {dispatch:workoutsDispatch} = useAuthContext()

    const logout = ()=>{
        // remove user from storage
        localStorage.removeItem('user')

        //
        dispatch({type:'LOGOUT'})
        workoutsDispatch({type:`SET_STOCKS`,payload:null})

    }
    return {logout}
}