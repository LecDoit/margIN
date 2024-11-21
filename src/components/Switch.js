import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Switch({ isOn, ...props }) {
    console.log('rendered')
  const className = `switch ${isOn ? "on" : "off"}`;

  return (
    <motion.div animate className={className} {...props}>
      <motion.div animate />
    </motion.div>
  );
}