import React from 'react'
import {backIn, backInOut, easeIn, easeInOut, motion,useMotionValue,useMotionValueEvent,useScroll, useTransform} from 'framer-motion'
import clsx from "clsx";

const RangeBarItem = ({ item, activeTab, setActiveTab, isSidebarCollapsed, setClickedTab, clickedTab }) => {
    const IconComponent = item.icon;


    return (
      <motion.div
        layout
        className={clsx("sidebar-item", {
          "sidebar-item__active": activeTab === item.id,
        })}
        onFocus={() => setActiveTab(item.id)}
        onMouseOver={() => setActiveTab(item.id)}
        onMouseLeave={() => setActiveTab(item.id)}
        onClick={()=>{setClickedTab(item.id)}}
      >
           {clickedTab === item.id ? (
          <motion.div
            // layoutId="sidebar-item-indicator"
            className="sidebar-item__clicked"
          />
        ) : null}
        {activeTab === item.id ? (
          <motion.div
            layoutId="sidebar-item-indicator"
            className="sidebar-item__active-bg"
          />
        ) : null}

        <motion.span
          className="sidebar-item__title"
        //   animate={{
        //     clipPath: isSidebarCollapsed
        //       ? "inset(0% 100% 0% 0%)"
        //       : "inset(0% 0% 0% 0%)",
        //     opacity: isSidebarCollapsed ? 0 : 1,
        //   }}
        >
          {item.title}
        </motion.span>
      </motion.div>
    );
}

export default RangeBarItem