import { useEffect, useRef, useState } from "react";
import { useApp } from "../context";

export default function Counter({ end, suffix = "+" }: { end: number; suffix?: string }) {
  const { lang } = useApp();
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1500; const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  const fmt = (x: number) =>
    lang === "bn" ? x.toLocaleString("bn-BD") : lang === "ar" ? x.toLocaleString("ar-EG") : x.toLocaleString("en-US");

  return <span ref={ref}>{fmt(n)}{suffix}</span>;
}
