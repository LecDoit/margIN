import React, { useEffect, useState } from 'react'
import {findItemByProperty,priceDiff} from '../helpers/webSocketHelpers';
import {motion} from 'framer-motion'

const Actions = ({action,actionReminder,lsPricesState}) => {

    const [actionReminderState,setActionReminderState] = useState([])
    console.log(lsPricesState)

    useEffect(()=>{
        if (actionReminder){
            setActionReminderState(actionReminder)
            console.log(actionReminder)
        }
    },[actionReminder])



console.log(priceDiff(50,100))
    
  return (
    <div className='actions'>
        <div className='actions--title oswald'>{action} reminder</div>
        <div className='actions--header'>
            <div className='actions--header--item'>#</div>
            <div className='actions--header--item'>Asset</div>
            <div className='actions--header--item'>Price</div>
            <div className='actions--header--item'>{action} Margin</div>
            <div className='actions--header--item'>Deviation</div>
        </div>
        {actionReminderState.map((item,i)=>
            <div className='actions--content' key={i}>
                <div className='actions--content--item lato'>{i+1}</div>
                <div className='actions--content--item lato'>{item.symbol}</div>
                <div className='actions--content--item lato'>{findItemByProperty(lsPricesState,'symbol',item.symbol).p}</div>
                <div className='actions--content--item lato'>{action=='Buy'? item.buy:item.sell}</div>
                <motion.div style={{display:'flex',
                    alignItems:action=='Buy' ? 'flex-start': 'flex-end'
                }} className='actions--content--item--deviation lato'>
                    <motion.div
                    style={{overflow:'hidden',
                        backgroundColor:action=='Buy' ? "#00b232" : "#d60000"
                    }}
                    initial={{height:0}}
                    animate={{height:20*(priceDiff(findItemByProperty(lsPricesState,'symbol',item.symbol).p,item.buy))}}
                     className='actions--content--fill'></motion.div>
                </motion.div>
            </div>
        )}
    </div>
  )
}

export default Actions
