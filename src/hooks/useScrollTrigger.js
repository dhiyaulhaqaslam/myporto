import { useEffect, useState } from "react";

export default function useScrollTrigger(targetId = "", offset = 0) {
   const [triggered, setTriggered] = useState(false);

   useEffect(() => {
      const elem = document.getElementById(targetId);
      if (!elem) return;

      const handle = () => {
         const rect = elem.getBoundingClientRect();
         const scrolledPast = rect.top <= window.innerHeight - offset;

         if (scrolledPast && !triggered) {
            setTriggered(true); // hanya sekali saja
         }
      };

      window.addEventListener("scroll", handle);
      return () => window.removeEventListener("scroll", handle);
   }, [targetId, offset, triggered]);

   return triggered;
}
