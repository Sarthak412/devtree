"use client";

import { useEffect, useRef } from "react";

import { motion, useInView, useAnimation } from "framer-motion";

export default function LeftSlide({ children, width = "fit-content" }) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -75 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
