import React, { useState } from "react";
import { motion } from "framer-motion";
import useScrollMotion from "../hooks/useScrollMotion";

export default function Hero() {
   const scrollY = useScrollMotion();
   const [pointer, setPointer] = useState({ x: 50, y: 50 });

   const handleMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setPointer({ x, y });
   };

   return (
      <header
         id="home"
         className="hero"
         style={{ "--px": `${pointer.x}%`, "--py": `${pointer.y}%` }}
         onMouseMove={handleMove}
      >
         <div className="hero-parallax">
            <div className="glow glow-1" style={{ transform: `translateY(${scrollY * 0.12}px)` }} />
            <div className="glow glow-2" style={{ transform: `translateY(${scrollY * 0.2}px)` }} />
            <div className="glow glow-3" style={{ transform: `translateY(${scrollY * 0.32}px)` }} />
         </div>

         <div className="hero-inner">
            <div className="eyebrow">Portfolio — Parallax Edition</div>
            <div className="hero-grid">
               <div className="hero-copy">
                  <motion.h1
                     initial={{ y: 40, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 0.8 }}
                  >
                     Building <span className="accent">cinematic</span> digital
                     experiences with purposeful motion.
                  </motion.h1>

                  <motion.p
                     initial={{ y: 24, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.15, duration: 0.8 }}
                  >
                     I craft elegant product stories with layered parallax, tactile hover states,
                     and soft gradients. Each screen balances clarity with a sense of wonder.
                  </motion.p>

                  <motion.div
                     className="hero-actions"
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3, duration: 0.8 }}
                  >
                     <a className="cta" href="#project">
                        View signature work
                     </a>
                     <a className="ghost" href="#contact">
                        Book a call
                     </a>
                  </motion.div>

                  <div className="hero-meta">
                     <div className="pill">Available Q1 · Remote friendly</div>
                     <div className="stat-row">
                        <div>
                           <strong>30+</strong>
                           <span>launches with crafted motion systems</span>
                        </div>
                        <div>
                           <strong>92</strong>
                           <span>performance score avg in Lighthouse</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="hero-visual">
                  <div className="visual-card">
                     <motion.div
                        className="visual-badge"
                        animate={{ y: [-6, 8, -4] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     >
                        Crafted with intention
                     </motion.div>
                     <motion.div
                        className="visual-ring"
                        animate={{ rotate: [0, 6, -4, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                     />
                     <motion.div
                        className="visual-core"
                        animate={{ scale: [1, 1.04, 0.98, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                     >
                        <div className="core-gradient" />
                        <div className="core-glow" />
                        <div className="core-dots" />
                     </motion.div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}
