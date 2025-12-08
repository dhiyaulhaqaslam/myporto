import React from "react";

export default function Navbar() {
   return (
      <nav className="nav-shell">
         <div className="nav">
            <a className="nav-brand" href="#home">
               myporto.studio
            </a>
            <div className="nav-links">
               <a href="#about">About</a>
               <a href="#project">Work</a>
               <a href="#process">Process</a>
               <a href="#contact" className="nav-cta">
                  Start a project
               </a>
            </div>
         </div>
      </nav>
   );
}
