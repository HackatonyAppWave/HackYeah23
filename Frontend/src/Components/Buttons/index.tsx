import React from "react";
import "./index.css";
import { motion } from "framer-motion";

interface TextSettings {
  text: string;
  styling: string;
  clickFn: Function;
}

export default function Button({ text, styling, clickFn }: TextSettings) {
  return (
    <>
      <motion.div className={"p-4"}>{text}</motion.div>
    </>
  );
}
