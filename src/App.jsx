import React, { useEffect, useRef, useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Footer from "./components/Footer";
import useScrollMotion from "./hooks/useScrollMotion";

const services = [
   {
      title: "Product direction",
      body: "Narrative-first thinking, strategy workshops, and crisp briefs that translate vision into motion-ready interfaces.",
   },
   {
      title: "Interactive build",
      body: "React, motion design, and tasteful WebGL moments tuned for performance and progressive enhancement.",
   },
   {
      title: "Identity on the web",
      body: "Design systems, bespoke typography, and expressive visuals that feel cinematic without losing clarity.",
   },
];

const projects = [
   {
      name: "Vesper Studio",
      summary: "Art-direction heavy homepage with layered parallax, scroll narratives, and live case studies.",
      tags: ["Art direction", "Parallax story", "React"],
      link: "#",
   },
   {
      name: "Northwind OS",
      summary: "Product site for a developer tool with animated diagrams, feature deep dives, and smooth section reveals.",
      tags: ["Design system", "Motion", "Docs UX"],
      link: "#",
   },
   {
      name: "Axis Ventures",
      summary: "Fund portfolio with glassmorphism, radial glow accents, and tailored interactions for founders.",
      tags: ["Brand web", "Framer-motion", "Performance"],
      link: "#",
   },
];

const milestones = [
   { title: "Discovery → Direction", detail: "Define narrative, tone, and interaction depth with lightweight prototypes." },
   { title: "Design → Motion", detail: "Component library, grids, and micro-motions that feel intentional and balanced." },
   { title: "Build → Ship", detail: "Production-ready React build, accessibility passes, and performance sweeps." },
];

export default function App() {
   const scrollY = useScrollMotion();
   const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
   const sectionIds = ["home", "about", "project", "process", "contact"];
   const currentIndexRef = useRef(0);
   const lockRef = useRef(false);

   const parallaxLayers = [
      { className: "orb orb-a", factor: -0.05 },
      { className: "orb orb-b", factor: -0.09 },
      { className: "orb orb-c", factor: -0.13 },
   ];

   // Large scenic, filmic parallax stack
   const globalLayers = useMemo(
      () => [
         { className: "global-layer image-back", factor: -0.18, pointer: 32, scale: 1.18, start: 0, end: 1.4 },
         { className: "global-layer image-mid", factor: -0.12, pointer: 26, scale: 1.12, start: 0.6, end: 2.2 },
         { className: "global-layer image-front", factor: -0.07, pointer: 20, scale: 1.06, start: 1.4, end: 3.2 },
         { className: "global-layer tint", factor: -0.04, pointer: 16, scale: 1, start: 0, end: 3.4 },
         { className: "global-layer grain", factor: -0.02, pointer: 6, scale: 1, start: 0, end: 3.4 },
      ],
      []
   );

   const getLayerOpacity = (progress, start, end) => {
      const fade = 0.35; // portion of window heights for fade
      const fadeIn = Math.min(1, Math.max(0, (progress - start) / fade));
      const fadeOut = Math.min(1, Math.max(0, (end - progress) / fade));
      return Math.max(0, Math.min(fadeIn, fadeOut));
   };

    // PPT-like slide navigation on wheel/keys
   useEffect(() => {
      const onMouse = (e) => {
         setMouse({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
         });
      };

      window.addEventListener("pointermove", onMouse, { passive: true });

      const sections = sectionIds
         .map((id) => document.getElementById(id))
         .filter(Boolean);

      const scrollToIndex = (index) => {
         const el = sections[index];
         if (!el) return;
         lockRef.current = true;
         el.scrollIntoView({ behavior: "smooth", block: "start" });
         currentIndexRef.current = index;
         setTimeout(() => {
            lockRef.current = false;
         }, 900);
      };

      const onWheel = (e) => {
         if (Math.abs(e.deltaY) < 12) return;
         if (lockRef.current) return;
         e.preventDefault();
         const dir = e.deltaY > 0 ? 1 : -1;
         const next = Math.min(
            sectionIds.length - 1,
            Math.max(0, currentIndexRef.current + dir)
         );
         if (next !== currentIndexRef.current) scrollToIndex(next);
      };

      const onKey = (e) => {
         if (lockRef.current) return;
         if (["ArrowDown", "PageDown"].includes(e.key)) {
            e.preventDefault();
            scrollToIndex(Math.min(sectionIds.length - 1, currentIndexRef.current + 1));
         }
         if (["ArrowUp", "PageUp"].includes(e.key)) {
            e.preventDefault();
            scrollToIndex(Math.max(0, currentIndexRef.current - 1));
         }
      };

      const onScroll = () => {
         if (lockRef.current) return;
         const midpoint = window.scrollY + window.innerHeight * 0.5;
         let closest = 0;
         let closestDist = Infinity;
         sections.forEach((el, idx) => {
            const rect = el.getBoundingClientRect();
            const center = window.scrollY + rect.top + rect.height * 0.5;
            const dist = Math.abs(center - midpoint);
            if (dist < closestDist) {
               closestDist = dist;
               closest = idx;
            }
         });
         currentIndexRef.current = closest;
      };

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("keydown", onKey, { passive: false });
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
         window.removeEventListener("pointermove", onMouse);
         window.removeEventListener("wheel", onWheel);
         window.removeEventListener("keydown", onKey);
         window.removeEventListener("scroll", onScroll);
      };
   }, [sectionIds]);

   return (
      <div className="page-shell">
         <div className="global-parallax">
            {globalLayers.map((layer) => (
               <div
                  key={layer.className}
                  className={layer.className}
                  style={{
                     transform: `translate3d(${(mouse.x - 0.5) * layer.pointer}px, ${
                        scrollY * layer.factor
                     }px, 0) scale(${layer.scale})`,
                     opacity: getLayerOpacity(scrollY / window.innerHeight, layer.start, layer.end),
                  }}
               />
            ))}
            {parallaxLayers.map((layer) => (
               <div
                  key={layer.className}
                  className={layer.className}
                  style={{
                     transform: `translate3d(${(mouse.x - 0.5) * 14}px, ${
                        scrollY * layer.factor
                     }px, 0)`,
                  }}
               />
            ))}
         </div>
         <Navbar />
         <main>
            <Hero />

            <Section
               id="about"
               eyebrow="Signature"
               title="Minimal, cinematic, intentionally playful."
               intro="I blend product thinking with motion-led storytelling. Each build leans on clarity first—then adds depth with light, parallax, and tactile interactions."
            >
               <div className="card-grid">
                  {services.map((item) => (
                     <div className="glass-card" key={item.title}>
                        <div className="card-heading">{item.title}</div>
                        <p>{item.body}</p>
                     </div>
                  ))}
               </div>
            </Section>

            <Section
               id="project"
               eyebrow="Selected work"
               title="Interfaces with a sense of theatre."
               intro="A few favorites that pair refined visuals with measurable outcomes."
            >
               <div className="project-grid">
                  {projects.map((project) => (
                     <a className="project-card" href={project.link} key={project.name}>
                        <div className="project-meta">
                           <span className="pill">Case study</span>
                           <span className="pill subtle">2025</span>
                        </div>
                        <div className="project-title-row">
                           <div>
                              <h3>{project.name}</h3>
                              <p>{project.summary}</p>
                           </div>
                           <span className="arrow">→</span>
                        </div>
                        <div className="tag-row">
                           {project.tags.map((tag) => (
                              <span className="tag" key={tag}>
                                 {tag}
                              </span>
                           ))}
                        </div>
                     </a>
                  ))}
               </div>
            </Section>

            <Section
               id="process"
               eyebrow="Process"
               title="Calm, collaborative, measurable."
               intro="A steady cadence keeps projects moving while leaving space for exploration."
            >
               <div className="timeline">
                  {milestones.map((step, index) => (
                     <div className="timeline-item" key={step.title}>
                        <div className="timeline-index">{String(index + 1).padStart(2, "0")}</div>
                        <div>
                           <div className="timeline-title">{step.title}</div>
                           <p>{step.detail}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </Section>

            <Section
               id="contact"
               eyebrow="Contact"
               title="Let’s build something vivid."
               intro="Available for select collaborations and product launches."
            >
               <div className="contact-panel">
                  <div>
                     <div className="card-heading">Tell me about your next thing.</div>
                     <p>
                        I respond within two business days with an approach, timeline, and first ideas on motion and structure.
                     </p>
                     <div className="contact-actions">
                        <a className="cta" href="mailto:hello@myporto.dev">
                           Email me
                        </a>
                        <a className="ghost" href="#project">
                           View projects
                        </a>
                     </div>
                  </div>
                  <div className="contact-meta">
                     <div className="contact-block">
                        <div className="pill subtle">Availability</div>
                        <strong>New slots open Feb 2025</strong>
                        <small>Retainers + launch partnerships</small>
                     </div>
                     <div className="contact-block">
                        <div className="pill subtle">Typical scope</div>
                        <strong>6–10 weeks</strong>
                        <small>Strategy, design system, build</small>
                     </div>
                  </div>
               </div>
            </Section>
            <Footer />
         </main>
      </div>
   );
}
