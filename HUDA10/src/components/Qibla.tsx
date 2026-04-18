import { useEffect, useRef, useState } from "react";
import { useApp } from "../context";

// Kaaba coordinates
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

function calcBearing(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const φ1 = toRad(lat1), φ2 = toRad(lat2);
  const Δλ = toRad(lon2 - lon1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function calcDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function Qibla() {
  const { t, lang } = useApp();
  const [permission, setPermission] = useState<"idle" | "asking" | "granted" | "denied">("idle");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [qiblaBearing, setQiblaBearing] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [heading, setHeading] = useState<number>(0); // device heading
  const [error, setError] = useState<string>("");
  const [smoothHeading, setSmoothHeading] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const targetHeadingRef = useRef<number>(0);

  // Smooth animation loop for heading
  useEffect(() => {
    const animate = () => {
      setSmoothHeading((prev) => {
        let target = targetHeadingRef.current;
        let diff = target - prev;
        // shortest rotation
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        const next = prev + diff * 0.15;
        return ((next % 360) + 360) % 360;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const requestAccess = async () => {
    setPermission("asking");
    setError("");

    // 1. Geolocation
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      setPermission("denied");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setCoords({ lat, lon });
        const bearing = calcBearing(lat, lon, KAABA_LAT, KAABA_LON);
        setQiblaBearing(bearing);
        setDistance(calcDistance(lat, lon, KAABA_LAT, KAABA_LON));

        // 2. Device orientation
        const setupOrientation = () => {
          const handler = (e: DeviceOrientationEvent) => {
            // iOS: webkitCompassHeading is true heading (0=north, clockwise)
            const w = (e as any).webkitCompassHeading;
            let h: number;
            if (typeof w === "number") {
              h = w;
            } else if (e.alpha !== null) {
              // Android: alpha is counter-clockwise from north
              h = 360 - e.alpha;
            } else {
              return;
            }
            setHeading(h);
            // The compass dial should rotate to keep North up:
            // dial rotation = -heading
            // The qibla pointer rotation (relative to user facing) = qiblaBearing - heading
            targetHeadingRef.current = h;
          };
          window.addEventListener("deviceorientationabsolute", handler as any, true);
          window.addEventListener("deviceorientation", handler, true);
        };

        const DOE = (window as any).DeviceOrientationEvent;
        if (DOE && typeof DOE.requestPermission === "function") {
          DOE.requestPermission()
            .then((res: string) => {
              if (res === "granted") {
                setupOrientation();
                setPermission("granted");
              } else {
                setError("Compass permission denied");
                setPermission("granted"); // still show static qibla
              }
            })
            .catch(() => { setupOrientation(); setPermission("granted"); });
        } else {
          setupOrientation();
          setPermission("granted");
        }
      },
      (err) => {
        setError(err.message);
        setPermission("denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Compute pointer angle relative to user
  const pointerAngle = ((qiblaBearing - smoothHeading) + 360) % 360;
  const aligned = Math.min(pointerAngle, 360 - pointerAngle) < 5;
  const turnDirection = pointerAngle <= 180 ? "→" : "←";
  const angleDiff = Math.round(Math.min(pointerAngle, 360 - pointerAngle));

  const fmt = (n: number) =>
    lang === "bn" ? n.toLocaleString("bn-BD") : lang === "ar" ? n.toLocaleString("ar-EG") : n.toLocaleString("en-US");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 shadow-xl dark:border-emerald-800/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Decorative pattern */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-300/30 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-amber-300/30 to-transparent blur-2xl" />

      <div className="relative mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-lg">
          🕋
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.widgets.qibla}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.widgets.qiblaInstructionTitle}</p>
        </div>
      </div>

      {permission !== "granted" && (
        <div className="relative space-y-4">
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">1</span> <span>{t.widgets.qiblaStep1}</span></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">2</span> <span>{t.widgets.qiblaStep2}</span></div>
            <div className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">3</span> <span>{t.widgets.qiblaStep3}</span></div>
          </div>
          <button
            onClick={requestAccess}
            disabled={permission === "asking"}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {permission === "asking" ? "..." : "🧭"} {t.widgets.qiblaPermission}
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
          {error && <p className="rounded-lg bg-red-50 p-2 text-xs text-red-700 dark:bg-red-950 dark:text-red-300">{error}</p>}
        </div>
      )}

      {permission === "granted" && coords && (
        <div className="relative space-y-4">
          {/* Status badge */}
          <div className={`rounded-2xl px-4 py-2 text-center text-sm font-bold transition-all ${
            aligned
              ? "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/40"
              : "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200"
          }`}>
            {aligned ? t.widgets.qiblaAligned : `${turnDirection} ${fmt(angleDiff)}°`}
          </div>

          {/* Compass */}
          <div className="relative mx-auto h-72 w-72">
            {/* Outer glow ring */}
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
              aligned ? "shadow-[0_0_60px_rgba(16,185,129,0.6)]" : "shadow-[0_0_30px_rgba(6,95,70,0.2)]"
            }`} />

            {/* Compass face */}
            <div
              className="absolute inset-0 rounded-full border-4 border-emerald-700/30 bg-gradient-to-br from-white via-emerald-50 to-amber-50 transition-transform duration-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
              style={{ transform: `rotate(${-smoothHeading}deg)` }}
            >
              {/* Tick marks */}
              {Array.from({ length: 72 }).map((_, i) => (
                <div
                  key={i}
                  className={`compass-tick ${i % 9 === 0 ? "major" : ""}`}
                  style={{ transform: `translateX(-50%) rotate(${i * 5}deg)` }}
                />
              ))}

              {/* Cardinal labels */}
              <div className="absolute left-1/2 top-3 -translate-x-1/2 text-sm font-black text-red-600">N</div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-700 dark:text-slate-300">E</div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-700 dark:text-slate-300">S</div>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-700 dark:text-slate-300">W</div>

              {/* Qibla arrow */}
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{ transform: `rotate(${qiblaBearing}deg)` }}
              >
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center" style={{ transformOrigin: "center bottom" }}>
                  {/* Arrow shaft + head */}
                  <div className="relative -mb-1">
                    <div className={`text-3xl transition-all ${aligned ? "drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" : ""}`}>🕋</div>
                  </div>
                  <svg width="28" height="120" viewBox="0 0 28 120" className={`transition-all ${aligned ? "text-emerald-500" : "text-emerald-700"}`}>
                    <defs>
                      <linearGradient id="arrowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={aligned ? "#10b981" : "#065f46"} />
                        <stop offset="100%" stopColor={aligned ? "#34d399" : "#047857"} />
                      </linearGradient>
                    </defs>
                    <polygon points="14,0 28,28 18,28 18,120 10,120 10,28 0,28" fill="url(#arrowGrad)" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-xl">
              <div className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400/40" />
              <div className="relative h-3 w-3 rounded-full bg-amber-400 shadow-lg" />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white/70 p-2 backdrop-blur dark:bg-slate-800/70">
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.widgets.qiblaHeading}</div>
              <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{fmt(Math.round(smoothHeading))}°</div>
            </div>
            <div className="rounded-xl bg-white/70 p-2 backdrop-blur dark:bg-slate-800/70">
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.widgets.qiblaTarget}</div>
              <div className="text-sm font-bold text-amber-600 dark:text-amber-400">{fmt(Math.round(qiblaBearing))}°</div>
            </div>
            <div className="rounded-xl bg-white/70 p-2 backdrop-blur dark:bg-slate-800/70">
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.widgets.qiblaDistance}</div>
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{fmt(Math.round(distance))} km</div>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">{t.widgets.qiblaCalibrate}</p>

          {error && <p className="rounded-lg bg-amber-50 p-2 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">⚠️ {error} — {lang === "bn" ? "তবুও কিবলার দিক নির্ণয় করা হয়েছে" : "Qibla bearing still computed"}</p>}

          {!heading && (
            <p className="rounded-lg bg-blue-50 p-2 text-center text-xs text-blue-800 dark:bg-blue-950 dark:text-blue-200">
              {lang === "bn" ? "কম্পাস সেন্সর সনাক্ত হয়নি — মোবাইলে ব্যবহার করুন" : lang === "ar" ? "لم يتم اكتشاف مستشعر البوصلة — استخدم على الهاتف" : "Compass sensor not detected — use on mobile device"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
