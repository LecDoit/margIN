import React from 'react'
import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'

const Add = () => {
  return (
    <motion.div
        whileHover={{scale:1.1,backgroundColor:'#F3F3F3'}}
        transition={{type:"tweed", stiffness:400, damping:10}}
        whileTap={{scale:0.9,backgroundColor:"#002c58",color:"#FDFDFD"}}
        className='add--stock'>Add</motion.div>
  )
}

export default Add


// --DARKBLUE:#002c58;
// --BLUE:#0043F1;
// --LIGHTBLUE: #80A1F8;
// #d60000