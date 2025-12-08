import { useEffect, useState } from "react";

export default function useScrollMotion() {
   const [scroll, setScroll] = useState(0);

   useEffect(() => {
      const handle = () => setScroll(window.scrollY);
      window.addEventListener("scroll", handle);
      return () => window.removeEventListener("scroll", handle);
   }, []);

   return scroll;
}
