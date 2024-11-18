import React, { useEffect, useState } from 'react'
import {calculatePortfolio,actionResult,findItemByProperty} from '../helpers/webSocketHelpers';

const Actions = ({buyReminder,lsPricesState,lsActionState}) => {

    const [buyReminderState,setBuyReminderState] = useState([])
    console.log(lsPricesState)

    useEffect(()=>{
        if (buyReminder){
            setBuyReminderState(buyReminder)
            // console.log(buyReminder)
        }
    },[buyReminder])
    
  return (
    <div>
        <div>
            <div>Stock</div>
            <div>Price</div>
            <div>Buy Margin</div>
            <div>Deviation</div>
        </div>
        {buyReminder.map((item,i)=>
            <div key={i}>
                <div>{item.symbol}</div>
                <div>{findItemByProperty(lsPricesState,'symbol',item.symbol).p}</div>
                <div>{item.buy}</div>
                <div></div>
            </div>
        )}
    </div>
  )
}

export default Actions