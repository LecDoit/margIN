import axios from'axios';
import { useStocksContext } from "../hooks/useStocksContext";

import { useAuthContext } from '../hooks/useAuthContext';





const StockDetails = ({stock,userProps})=>{

    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()


    const handleClick = async (e) =>{


        const filteredArray = stocks.filter((s)=>s._id !== stock._id)
        const currObj = {email:userProps,stocks:filteredArray}
        console.log({delete:currObj})

        e.preventDefault();
        axios.patch('https://xtbbackend.onrender.com/stocks/deleteStock',
        // axios.patch('http://localhost:10000/stocks/deleteStock',
        
        currObj,
        {
            headers:{
              'Authorization':`Bearer ${user.token}`
            }
          }
        )
            .then((response)=>{
                console.log(response.data)
      
                dispatch({type:'DELETE_STOCK',payload:response.data.stocks}) 


            })
        


    }



    return(
        <div>
            <h4>{stock.symbol}</h4>
            <p>{stock.buy}</p>
            <p>{stock.sell}</p>
            <span onClick={handleClick}>Deletez</span>
        </div>

    )
}

export default StockDetails