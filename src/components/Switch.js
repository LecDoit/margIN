import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {colors} from '../helpers/webSocketHelpers';
export default function Switch({setPossesedToggle,possesedToggle}) {
  const [isOn, setIsOn] = useState(false);
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  const toggleSwitch = () => {
    setPossesedToggle(!possesedToggle)
    setIsOn(!isOn);}

  return (
    <motion.div className="switch" data-ison={isOn} onClick={toggleSwitch}
      style={{backgroundColor:isOn ?  colors.BLUE : colors.DARKBLUE}}
      whileHover={{scale:1.02,
      boxShadow:'5px 14px 8px -6px  rgba(129, 161, 248,0.1)'}}
        // whileTap={{scale:0.98,backgroundColor:"#002c58",color:"#FDFDFD"}}
    >
      <motion.div 

      className="handle" layout transition={spring} />
    </motion.div>
  );
}


