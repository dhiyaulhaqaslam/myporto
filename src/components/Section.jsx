import React from "react";

export default function Section({ id, eyebrow, title, intro, children }) {
   return (
      <section id={id} className="section">
         <div className="section-header">
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <div className="section-headline">
               <h2>{title}</h2>
               {intro && <p>{intro}</p>}
            </div>
         </div>
         <div className="section-body">{children}</div>
      </section>
   );
}
