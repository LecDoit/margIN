import React,{useEffect,useState,useCallback} from 'react'
import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'
import { LuHome ,LuMail,LuFolderClosed,LuStickyNote,LuBell,LuPin} from "react-icons/lu";

// import * as newz  from "react-icons/lu";
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
    // const [activeTab, setActiveTab] = useState(SIDEBAR_ITEMS[1].id);
    // const [clickedTab, setClickedTab] = useState(SIDEBAR_ITEMS[1].id);
    const [activeTab, setActiveTab] = useState(()=>localStorage.getItem('selectedSidebarItem') || 'stocks');
    const [clickedTab, setClickedTab] = useState(()=>localStorage.getItem('selectedSidebarItem') || 'stocks');
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

    useEffect(()=>{

        const myFunc = ()=>{
            setActiveTab(clickedTab)
        } 
        if (!isHover){
            const timer = setTimeout(myFunc,5000)
        }


        

      },[activeTab,isHover])
    
    const handleClick=(e)=>{
        localStorage.setItem('selectedSidebarItem',e.id)
        onSelect(e.id)
    }
    useEffect(()=>{
        // onVisible(showSidebar)
    },[showSidebar])
        


  return (
    <motion.div className='sidebar'
        animate={{width:!showSidebar? 50:180}}
        layout
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
    >
        {!showSidebar ?  <div></div> 
            :<div>
                <button id={pined}  className='sidebar--collapse--button' 
                onClick={pin}>
                    <LuPin/>
                </button>
         
            </div>}

        {SIDEBAR_ITEMS.map((item) => (
        // <div key={item.id} onClick={()=>{onSelect(item.id)}}>
            <div key={item.id} onClick={()=>{handleClick(item)}}>
                <SidebarItem 
                isSidebarCollapsed={!showSidebar}
                key={item.id}
                item={item}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setClickedTab={setClickedTab}
                clickedTab={clickedTab}
                />
            </div>
        ))}


    </motion.div>
  )
}

export default Sidebar