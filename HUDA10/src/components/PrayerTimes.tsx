import { useEffect, useState } from "react";
import { useApp } from "../context";

type Times = Record<string, string>;

export default function PrayerTimes() {
  const { t, lang } = useApp();
  const [times, setTimes] = useState<Times | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const cacheKey = `dh-prayer-${today.toDateString()}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try { setTimes(JSON.parse(cached)); setLoading(false); return; } catch {}
    }
    // Lalmonirhat ~ 25.9923, 89.2847
    fetch(`https://api.aladhan.com/v1/timings/${Math.floor(today.getTime() / 1000)}?latitude=25.9923&longitude=89.2847&method=1`)
      .then((r) => r.json())
      .then((data) => {
        const tt = data?.data?.timings;
        if (tt) {
          const trimmed: Times = {
            Fajr: tt.Fajr, Sunrise: tt.Sunrise, Dhuhr: tt.Dhuhr,
            Asr: tt.Asr, Maghrib: tt.Maghrib, Isha: tt.Isha,
          };
          setTimes(trimmed);
          localStorage.setItem(cacheKey, JSON.stringify(trimmed));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const fmt = (s: string) => {
    if (!s) return "--:--";
    const t24 = s.slice(0, 5);
    const [h, m] = t24.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = ((h + 11) % 12) + 1;
    const time = `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
    if (lang === "bn") return time.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);
    if (lang === "ar") return time.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
    return time;
  };

  const labels: Record<string, string> = {
    Fajr: t.widgets.fajr, Sunrise: t.widgets.sunrise, Dhuhr: t.widgets.dhuhr,
    Asr: t.widgets.asr, Maghrib: t.widgets.maghrib, Isha: t.widgets.isha,
  };
  const icons: Record<string, string> = {
    Fajr: "🌅", Sunrise: "☀️", Dhuhr: "🌞", Asr: "🌤️", Maghrib: "🌇", Isha: "🌙",
  };

  return (
    <div className="rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-white via-emerald-50/50 to-white p-6 shadow-xl dark:border-emerald-800/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-lg">🕌</div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.widgets.prayer}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Lalmonirhat</p>
        </div>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => <div key={i} className="h-10 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />)}
        </div>
      ) : (
        <div className="space-y-2">
          {(["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"] as const).map((k) => (
            <div key={k} className="group flex items-center justify-between rounded-xl bg-white/60 p-3 transition-all hover:scale-[1.02] hover:bg-emerald-50 hover:shadow-md dark:bg-slate-800/60 dark:hover:bg-slate-700">
              <span className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                <span className="text-lg">{icons[k]}</span>{labels[k]}
              </span>
              <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">{times ? fmt(times[k]) : "--:--"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
