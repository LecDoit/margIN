import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div className="handle" layout transition={spring} />
    </div>
  );
}

