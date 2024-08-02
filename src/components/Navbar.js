import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import {backIn, backInOut, easeIn, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'
import Logo from '../img/Logo'

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
                    <div className='navbar--buttons' onClick={handleClick}>Log out</div>
                </div>
                )}
                {!user && (
                    <div className='navbar--buttons--nav'>
                        <Link  to='/login'>
                            <div className='navbar--buttons' id={id}>Sign in</div>
                        </Link>
                        <Link to='/signup'>
                            <div className='navbar--buttons'id={id} >Sign up</div>
                        </Link>
                    </div>
                )}
            {/* </div> */}
        </motion.div>

  )
}

export default Navbar