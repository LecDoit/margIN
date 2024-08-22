import React,{useEffect,useState,useCallback} from 'react'
import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'
import { LuChevronRight } from "https://esm.sh/react-icons/lu";
import { LuChevronLeft } from "https://esm.sh/react-icons/lu";
import { LuHome } from "https://esm.sh/react-icons/lu";
import { LuMail } from "https://esm.sh/react-icons/lu";
import { LuFolderClosed } from "https://esm.sh/react-icons/lu";
import { LuStickyNote } from "https://esm.sh/react-icons/lu";
import { LuBell } from "https://esm.sh/react-icons/lu";
import { LuPin } from "https://esm.sh/react-icons/lu";
import * as newz  from "https://esm.sh/react-icons/lu";
import SidebarItem from './SidebarItem.js';
import { json, useFetcher } from 'react-router-dom';
import { stringify } from 'json5';
import Delete from './Delete.js';

const SIDEBAR_ITEMS = [
    { id: "dashboard", title: "Dashboard", icon: LuHome },
    { id: "stocks", title: "Stocks", icon: LuStickyNote },
    { id: "portfolio", title: "Portfolio", icon: LuFolderClosed },
    { id: "indicators", title: "Indicators", icon: LuBell },
    { id: "news", title: "News", icon: LuMail }
,
  ];

const Sidebar = ({onSelect}) => {
    // console.log(newz.module)

    const [isCollapsed,setIsCollapsed] = useState(true);
    const [isHover,setIsHover] = useState(false);
    const [activeTab, setActiveTab] = useState(SIDEBAR_ITEMS[0].id);
    const [showSidebar,setShowSidebar] = useState(false)
    const [pined,setPined] = useState('unpined')

    const hoverClickLogic =()=>{
        if (isCollapsed==true && isHover==true){

            setShowSidebar(true)   
        } else if (isCollapsed==false && isHover==true){

            setShowSidebar(true)  
        } else if (isCollapsed == true && isHover==false){

            setShowSidebar(false)  
        } else if (isCollapsed==false && isHover==false){

            setShowSidebar(true) 
        }
    }

    useEffect(()=>{
        hoverClickLogic()

    },[isHover,isCollapsed,showSidebar])

    const pin = ()=>{
        setIsCollapsed(!isCollapsed)
        if (pined==='unpined'){
            setPined('pined')
        } else {
            setPined('unpined')
        }

    }


    


  return (
    <motion.div className='sidebar'
    animate={{width:!showSidebar? 50:"100%"}}
    layout
    onMouseEnter={()=>setIsHover(true)}
    onMouseLeave={()=>setIsHover(false)}
    >
           
        
        {!showSidebar ?  <div></div> 
        :<div>
        <button id={pined}  className='sidebar--collapse--button' 
        onClick={pin}
        >
            <LuPin/>
        </button>
         
         </div>}
        {SIDEBAR_ITEMS.map((item) => (
        <div key={item.id} onClick={()=>{onSelect(item.id)}}>
        <SidebarItem 
          isSidebarCollapsed={!showSidebar}
          key={item.id}
          item={item}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        </div>
      ))}


    </motion.div>
  )
}

export default Sidebar