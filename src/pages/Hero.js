import React, { useRef } from 'react'
import HeroLineChart from '../components/HeroLineChart'
import {Link} from 'react-router-dom'
import Mobile from '../img/Mobile'
import Notification from '../img/Notification'
import News from '../img/News'
import Logo from '../img/Logo'
import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'
import Navbar from '../components/Navbar'

const Hero = () => {
  const targetRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target:targetRef
  })
  const flush = useTransform(scrollYProgress,[0 ,1],["0deg","180deg"])



  return (
    <div  className='hero'>
      <Navbar id={'hero--nav'}/>
      <div className='hero--1'>
        <motion.div className='hero--1--1'
                  initial={{opacity:0,x:-500}}
                  animate={{opacity:1,x:0}}
                  transition={{duration:0.6,ease:backInOut}}
        >
          <div className='hero--header'> 
            Invest in your future
          </div>
          <div className='hero--desc'>Set your <strong>buy</strong> and <strong>sell</strong> levels easily, maximize profits, and trade smarter with our intuitive app.
          </div>
          <div className='hero--1--button'>
            <Link className='hero--buttons' id='navbar--signup' to='/signup'>Sign up</Link>
          </div>
        </motion.div>
        <motion.div
          initial={{opacity:0,x:+500}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.6,ease:backInOut}}>
        <HeroLineChart />
        </motion.div>

      </div>
      <div className='hero--2'>
        <motion.div className='hero--header--2'
                  initial={{opacity:0,
                  }}
                  whileInView={{opacity:1}}
                  transition={{duration:1}}
                  viewport={{amount:"all"}}>

        MargIn is an is intuitve platform for everyone
        
        </motion.div>
        <div className='hero--2--1'>
          <motion.div className='hero--2--holder'
           
            // viewport={{amount:"all"}}
   
          >
            <motion.div className='hero--2--top'
             initial={{opacity:0, scale:0
             }}
             whileInView={{opacity:1,scale:1
             }}
 
             whileHover={{scale:1.1
               
             }}>2800+</motion.div>
            <div className='hero--2--bottom'>Stocks</div>
          </motion.div>
          <div className='hero--2--holder'>
            <motion.div className='hero--2--top'
            initial={{opacity:0, scale:0
            }}
            whileInView={{opacity:1,scale:1}}
            whileHover={{scale:1.1}}
            // viewport={{amount:"all"}}
            >300+</motion.div>
            <div className='hero--2--bottom'>ETFs</div>
          </div>
          <div className='hero--2--holder'>
            <motion.div className='hero--2--top'

                        initial={{opacity:0, scale:0
                        }}
                        whileInView={{opacity:1,scale:1}}
                        whileHover={{scale:1.1}}
                        // viewport={{amount:"all"}}
                        >10+
                        </motion.div>
            <div className='hero--2--bottom'>Cryptocurrencies</div>
          </div>
        </div>
        <div className='hero--2--2'>
          <motion.div  className='hero--2--picture'
                // style={{opacity:0}}
                      initial={{opacity:0,
                        y:+100 
                      }}
                      // animate={{opacity:1,
                      // }}
                      whileInView={{opacity:1,y:0}}
                      transition={{duration:1,
                      ease:easeIn}}


                      viewport={{amount:"all"}}>
            placeholder for picture of finished platform
          </motion.div>
          <div className='hero--2--steps'>
            <div className='hero--2--steps--title'>MargIn Platform</div>
            <div className='hero--2--steps--action'>Set margin in minutes</div>
            <div className='hero--2--steps--containter'>
              <div className='hero--2--steps--step'>
                <div className='hero--2--steps--number'>1</div>
                <div className='hero--2--steps--text'>Create your free MargIn account</div>
              </div>
              <div className='hero--2--steps--step'>
                <div className='hero--2--steps--number'>2</div>
                <div className='hero--2--steps--text'>Choose financial instrument</div>
              </div>
              <div className='hero--2--steps--step'>
                <div className='hero--2--steps--number'>3</div>
                <div className='hero--2--steps--text'>Set buy and sell margins</div>
              </div>
           
            </div>
            <Link to='/signup'>
              <div className='hero--buttons' id='navbar--signup'>Sign up</div>
            </Link>
          </div>
        </div>

  

        {/* <div className='hero--2'></div>
        <div className='hero--2'></div> */}
      </div>
      <div className='hero--3'>
        {/* app notifications news */}
        <div className='hero--3--header' >Why MargIn?</div>
        <motion.div
        initial={{opacity:0,x:-1500}}
        whileInView={{opacity:1,x:0}}
        // transition={{duration:0.5}}
         className='hero--3--content'>
          <div className='hero--3--container'>
            <div className='hero--3--1'><Mobile h={150}/></div>
            <div className='hero--3--2'>Mobile App</div>
            <div className='hero--3--3'>Soon, set margin on the go with our upcomming user-friendly mobile app.</div>
          </div>
          <div className='hero--3--container'>
            <div className='hero--3--1'><Notification h={150}/></div>
            <div className='hero--3--2'>Notification System</div>
            <div className='hero--3--3'>Get ready for instant alerts on market changes on your margin activities</div>
          </div>
          <div className='hero--3--container'>
            <div className='hero--3--1'><News h={150}/></div>
            <div className='hero--3--2'>News</div>
            <div className='hero--3--3'>Get the latest financial news and insights to make informed margin decisions</div>


          </div>
        </motion.div>

        <Link className='hero--buttons' id='navbar--signup--get-started' to='/signup'>Get Started with MargIn
        </Link>
        
      </div>
      <div className='hero--4'>
        <div className='hero--4--1'>
          <div className='navbar--logo--footer' href='/'>
            <Link to='/' className='navbar--logo' >
              <Logo className='navbar--logo-react' w={58} h={50} fill={'#FDFDFD'} background={'transparent'}/>
                <div  className='navbar--logo--text' id={'hero--nav'}>MargIn</div>
            </Link>
          </div>
          <div className='hero--4--1--header'>Take your investing to the next level.</div>
          <div className='hero--4--1--buttons'>
            <Link className='hero--buttons' id='navbar--signup--get-started' to='/signup'>Create Account
            </Link>
            <Link className='hero--buttons' id='navbar--signup--get-started' to='/login'>Sign in
            </Link>
          </div>
        </div>
        <div className='hero--4--2'>
          <div className='hero--4--2--header'>Tech Stack
            <div className='hero--4--2--content'>MongoDB</div>
            <div className='hero--4--2--content'>Express.js</div>
            <div className='hero--4--2--content'>React</div>
            <div className='hero--4--2--content'>Node</div>
            <div className='hero--4--2--content'>XTB API</div>
            <div className='hero--4--2--content'>Render</div>
          </div>
        </div>

        <div className='hero--4--3'>
          <a className='hero--4--3--a'>© 2023 - 2024 Pikajunglist</a>
          <a className='hero--4--3--a' href='https://github.com/LecDoit/margIN' target='_blank'>Github</a>
          <a className='hero--4--3--a'>Privacy Notice</a>
          <a className='hero--4--3--a'>Terms of Service</a>
          <a className='hero--4--3--a'>Cookie Settings</a>
        </div>

        <div className='hero--4--4'>
        These materials are for general information purposes only and are not investment advice or a recommendation or solicitation to buy, sell, stake or hold any assets/cryptoasset or to engage in any specific trading strategy. MargIn does not and will not work to increase or decrease the price of any particular asset/cryptoasset it makes available. Some assets/crypto products and markets are unregulated, and you may not be protected by government compensation and/or regulatory protection schemes. The unpredictable nature of the assets/crypto-asset markets can lead to loss of funds. Tax may be payable on any return and/or on any increase in the value of your cryptoassets and you should seek independent advice on your taxation position. Geographic restrictions may apply.
        </div>
      </div>


    </div>
  )
}

export default Hero