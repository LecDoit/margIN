import React from 'react'
import Logo from '../img/Logo'
import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'



const Loading = () => {
  return (
    <motion.div className='loading'
    // style={{opacity:0}}
    initial={{opacity:0}}
    animate={{opacity:1}}

    
    >
        <motion.div        
        style={{opacity:0.9}}
        animate={{
                rotate:[0,360,360,0],
              
        
        
            }}
        transition={{
        
            repeat:Infinity,
                duration:2.5,
                ease:easeInOut,
                repeatType:"loop",
                opacity:1

            }}>
            <Logo className='loading--logo'  w={100} h={100} fill={'#002c58'} 
            background='transparent'/>
        </motion.div>
    </motion.div>
  )
}

export default Loading