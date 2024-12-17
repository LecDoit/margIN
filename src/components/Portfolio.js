import React,{useState,useEffect} from 'react'
import { motion } from "framer-motion";
import { useStocksContext } from "../hooks/useStocksContext";
import {calculatePortfolio,colors,findItemByProperty} from '../helpers/webSocketHelpers';

const Portfolio = () => {

    const {stocks,dispatch} = useStocksContext()
    const [lsPricesState,setLsPricesState] = useState(JSON.parse(localStorage.getItem('prices')))

    console.log(lsPricesState)

  return (
    <div className='portfolio'>
        <div className='portfolio--wrapper'>
            <div className='portfolio--title oswald'>Investment Summary and Pricing</div>
            <div className='portfolio--header'>
                <div className='portfolio--header--item lato '>Name</div>
                <div className='portfolio--header--item lato' >Type</div>
                <div className='portfolio--header--item lato'>Amount</div>
                <div className='portfolio--header--item lato'>Net Worth</div>
            </div>
            <div className='portfolio--content--group'>
                {stocks.map((stock,i)=>{
                    if (stock.trades.length>0){
                        return(
                            <div className='portfolio--content--item ' key={i}>
                                <div className='portfolio--content--item--stock lato' >{stock.description}</div>
                                <div className='portfolio--content--item--stock lato'>{stock.categoryName}</div>
                                <div className='portfolio--content--item--stock lato'>{calculatePortfolio(stock)}</div>
                                <div className='portfolio--content--item--stock lato'>{calculatePortfolio(stock)*findItemByProperty(lsPricesState,'symbol',stock.symbol).p}</div>
                            </div> 
                            )
                    }
                })}
            </div>
        </div>
    </div>
  )
}

export default Portfolio