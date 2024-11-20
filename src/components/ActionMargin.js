import React, { useEffect, useState } from 'react'
import {findItemByProperty,priceDiff} from '../helpers/webSocketHelpers';
import {motion} from 'framer-motion'

const ActionMargin = ({action,actionReminder,lsPricesState}) => {

    const [actionReminderState,setActionReminderState] = useState([])
    console.log(actionReminder)

    useEffect(()=>{
        if (actionReminder){
            setActionReminderState(actionReminder)
        }
    },[actionReminder])



    
  return (
    <div className='actions'>
        <div className='actions--title oswald'>{action} reminder</div>
        <div className='actions--header'>
            <div className='actions--header--item'>#</div>
            <div className='actions--header--item'>Asset</div>
            <div className='actions--header--item'>Buy Margin</div>
            <div className='actions--header--item'>Sell Margin</div>
        </div>
        {actionReminderState.map((item,i)=>
            <motion.div className='actions--content' key={i}
            whileHover={{scale:1.02,backgroundColor:'rgba(253, 253, 253,0.1)',
                boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)'}}
                transition={{type:"tween",duration:0.1}}
                whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}}>
                <div className='actions--content--item lato'>{i+1}</div>
                <div className='actions--content--item lato'>{item.symbol}</div>
                <div className='actions--content--item lato'>{item.buy}</div>
                <div className='actions--content--item lato'>{item.sell}</div>
                
            </motion.div>
        )}
    </div>
  )
}

export default ActionMargin
