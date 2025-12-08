import React from "react";

export default function Footer() {
   return (
      <footer className="footer">
         <div className="footer-inner">
            <div>© {new Date().getFullYear()} myporto — crafted with calm energy.</div>
            <div className="footer-links">
               <a href="#project">Work</a>
               <a href="mailto:hello@myporto.dev">Email</a>
               <a href="#contact">Start a project</a>
            </div>
         </div>
      </footer>
   );
}
