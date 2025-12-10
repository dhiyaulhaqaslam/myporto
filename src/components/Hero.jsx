import React, { useState } from "react";
import { motion } from "framer-motion";
import useScrollMotion from "../hooks/useScrollMotion";
import Lanyard from "./Lanyard";

export default function Hero() {
   const scrollY = useScrollMotion();
   const [pointer, setPointer] = useState({ x: 50, y: 50 });
   const particles = [
      { left: "12%", top: "22%", size: 8, delay: 0 },
      { left: "24%", top: "68%", size: 10, delay: 1.2 },
      { left: "48%", top: "30%", size: 12, delay: 0.6 },
      { left: "66%", top: "18%", size: 9, delay: 1.6 },
      { left: "78%", top: "54%", size: 11, delay: 0.9 },
   ];

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
            <div className="particle-field">
               {particles.map((p, idx) => (
                  <div
                     key={idx}
                     className="particle"
                     style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        animationDelay: `${p.delay}s`,
                     }}
                  />
               ))}
            </div>
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
                  <Lanyard
                     name="Dhiy Aulhaq"
                     title="Full Stack Developer & UI/UX Designer"
                     avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                     location="Jakarta, Indonesia"
                     bio="Passionate full-stack developer with expertise in React, Node.js, and modern web technologies. Creating beautiful, functional digital experiences."
                     skills={["React", "Node.js", "TypeScript", "MongoDB", "UI/UX Design", "Motion Design"]}
                     socialLinks={{
                        github: "https://github.com/dhiyaulhaq",
                        linkedin: "https://linkedin.com/in/dhiyaulhaq",
                        twitter: "https://twitter.com/dhiyaulhaq",
                        email: "dhiyaulhaq@example.com"
                     }}
                  />
               </div>
            </div>
         </div>
      </header>
   );
}
