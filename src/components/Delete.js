import React from 'react'
import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'

const Delete = () => {
  return (
    <motion.div
        whileHover={{scale:1.02,backgroundColor:'rgba(241,0,0,0.08)'}}
        transition={{type:"spring", stiffness:400, damping:10}}
        whileTap={{scale:0.9,backgroundColor:"#002c58",color:"#FDFDFD"}}
     className='delete--stock'>Delete</motion.div>
  )
}

export default Delete


// --DARKBLUE:#002c58;
// --BLUE:#0043F1;
// --LIGHTBLUE: #80A1F8;
// #d60000