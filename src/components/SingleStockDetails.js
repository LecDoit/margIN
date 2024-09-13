import React, { useEffect } from 'react'
import {motion,AnimatePresence} from 'framer-motion'

const SingleStockDetails = ({showModal,setShowModal,centerX,centerY}) => {

    useEffect(()=>{

        console.log(centerX,centerY)
    },[centerX,centerY])
    
    const backdrop ={
        visible:{opacity:1},
        hidden:{opacity:0}
    }

    const modal = {
        hidden:{     
            width:0,   
            height:0,   
            y:centerY,
            opacity:0,
        },
        visible:{       
            width:"100%",  
            height:"80vh",       
            y:"2vh",
            opacity:1,
            transition:{delay:0.1,duration:0.1}
        }

    }
    const funcCheck = ()=>{
        console.log('works')
        setShowModal(false)
    }


  return (
    <AnimatePresence >
        {showModal && (
            <motion.div className='backdrop'
            variants={backdrop}
            initial="hidden"
            animate='visible'
            exit='hidden'

            >  
                <motion.div className='modal'
                    variants={modal}
                    initial="hidden"
                    animate='visible'
                >
                    <div>this is modal</div>
                    <div onClick={()=>setShowModal(false)}>Update</div>
                </motion.div>              
            </motion.div>

        )}
    </AnimatePresence>
  )
}

export default SingleStockDetails