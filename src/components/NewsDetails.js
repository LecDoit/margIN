import React from 'react'
import {TfiClose} from 'react-icons/tfi'
import {motion} from 'framer-motion'

const NewsDetails = ({setShowModal,showModal,data}) => {


    const backdrop ={
        visible:{opacity:1},
        hidden:{opacity:0}
    }

    const modal = {
        hidden:{     
            width:0,   
            height:0,   
            opacity:0,
        },
        visible:{       
            width:"100%",  
            height:"100%",       
            opacity:1,
            transition:{delay:0.1,duration:0.1}
        }
    }

    const handleBackdropClick = (e)=>{
        if (e.target.className === "backdrop"){
            setShowModal(false)
            
        }
    }

  return (
    <div>
        <motion.div className='backdrop'
            variants={backdrop}
            initial="hidden"
            animate='visible'
            exit='hidden'
            onClick={handleBackdropClick}>  
                <motion.div className='modal--news'>
                    <div className='modal--title'>
                        <div className='modal--title--left'>
                            <div dangerouslySetInnerHTML={{ __html: data.title}}></div>
                        </div>
                        <div className='modal--title--right'>
                            <motion.div 
                                initial={{ scale: 1 }}
                                whileHover={{

                                scale: 1.2, 
                                transition: { duration: 0.2 } 
                                }}
                                whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.1 } 
                                }}
                                style={{ 
                                cursor: "pointer",
                                }}
                                onClick={()=>setShowModal(false)}>
                                        
                                <TfiClose className={'tficlose'}/>
                            
                            </motion.div>
                        </div>
                    </div>     
                    <div className='modal--body--news' >
                        <div dangerouslySetInnerHTML={{ __html: data.body}}></div>
                    </div>
                </motion.div>
        </motion.div>
    </div>
  )
}

export default NewsDetails