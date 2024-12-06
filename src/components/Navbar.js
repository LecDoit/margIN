import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import {motion} from 'framer-motion'
import Logo from '../img/Logo'
import { colors } from '../helpers/webSocketHelpers'

const Navbar = ({id}) => {

    const {logout} = useLogout()
    const {user} = useAuthContext()
    const [animation,setAnimation] = useState('')
  
    const handleClick = ()=>{
        logout()
    }

    const heroVariants = {
        hidden:{
            y:-60}
        ,
        visible:{
            y:0

        }
    }
    const loginVariants = {
        hidden:{
            y:0}
        ,
        visible:{
            y:0

        }
    }

    const simpleFunc = ()=>{   
        if (id==='login--nav' || id ==='signup--nav' ){
            return {loginVariants,fill:"#002c58"}
        } else if (id==='hero--nav' ){
            return {heroVariants,fill:'#FDFDFD'}
        } else if ( id==="home--nav"){
            return {loginVariants,fill:'#FDFDFD'}
        }
        }

    

  return (

        <motion.div className='navbar' id={id}
        variants={simpleFunc()}
        initial={'hidden'}
        animate={'visible'}
        transition={{duration:0.6}}
        >

            <div className='navbar--logo' href='/'>
     
        
                <Link to='/' className='navbar--logo' >
                <Logo className='navbar--logo-react' w={58} h={50} fill={simpleFunc().fill} background={'transparent'}/>
                    <div  className='navbar--logo--text' id={id}>MargIn</div>
                </Link>
            </div>

        
                {user && (
                <div className='navbar--buttons--nav'>
                    <div className='navbar--email'>{user.email}</div>
                    <motion.div
                        whileHover={{backgroundColor:colors.LIGHTBLUE,
                        boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)'}}
                        transition={{type:"tween",duration:0.1}}
                        whileTap={{scale:0.98,backgroundColor:colors.BLUE,color:colors.WHITE}} 
                        className='navbar--buttons' onClick={handleClick}>Log out</motion.div>
                        
                </div>
                )}
                {!user && (
                    <div className='navbar--buttons--nav'>
                        <Link  to='/login'>
                            <motion.div
                                whileHover={{backgroundColor:colors.LIGHTBLUE,
                                boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)'}}
                                transition={{type:"tween",duration:0.1}}
                                whileTap={{scale:0.98,backgroundColor:colors.BLUE,color:colors.WHITE}} 
                             className='navbar--buttons' id={id}>Sign in</motion.div>
                        </Link>
                        <Link to='/signup'>
                            <motion.div 
                                whileHover={{backgroundColor:colors.LIGHTBLUE,
                                boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)'}}
                                transition={{type:"tween",duration:0.1}}
                                whileTap={{scale:0.98,backgroundColor:colors.BLUE,color:colors.WHITE}} 
                            className='navbar--buttons'id={id} >Sign up</motion.div>
                        </Link>
                    </div>
                )}
            {/* </div> */}
        </motion.div>

  )
}

export default Navbar