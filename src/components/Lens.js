import React from 'react'
import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'
import {GoSearch} from 'react-icons/go'

const Lens = () => {
  return (
    <motion.div className='goSearch--lens'
        whileHover={{scale:1.1, color:"#002c58"}}
        transition={{type:"spring", stiffness:400, damping:10}}
        whileTap={{scale:0.9}}
        >
        <GoSearch />
     </motion.div>
  )
}

export default Lens


// --DARKBLUE:#002c58;
// --BLUE:#0043F1;
// --LIGHTBLUE: #80A1F8;
// #d60000