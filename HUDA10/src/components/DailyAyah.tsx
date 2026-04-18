import { useEffect, useState } from "react";
import { useApp } from "../context";

type Ayah = { ar: string; bn: string; ref: string };

const FALLBACK: Ayah = {
  ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  bn: "নিশ্চয়ই কষ্টের সাথে স্বস্তি রয়েছে।",
  ref: "Quran 94:6",
};

export default function DailyAyah() {
  const { t } = useApp();
  const [ayah, setAyah] = useState<Ayah | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toDateString();
    const key = `dh-ayah-${today}`;
    const cached = localStorage.getItem(key);
    if (cached) { try { setAyah(JSON.parse(cached)); setLoading(false); return; } catch {} }

    const fetchAyah = async (retry = true): Promise<void> => {
      try {
        // random ayah number 1..6236
        const num = Math.floor(Math.random() * 6236) + 1;
        const [arRes, bnRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/ayah/${num}/ar.alafasy`).then((r) => r.json()),
          fetch(`https://api.alquran.cloud/v1/ayah/${num}/bn.bengali`).then((r) => r.json()),
        ]);
        const ar = arRes?.data?.text;
        const bn = bnRes?.data?.text;
        const surah = arRes?.data?.surah?.englishName;
        const aN = arRes?.data?.numberInSurah;
        if (ar && bn) {
          const data = { ar, bn, ref: `${surah} : ${aN}` };
          setAyah(data);
          localStorage.setItem(key, JSON.stringify(data));
        } else throw new Error("bad data");
      } catch {
        if (retry) return fetchAyah(false);
        setAyah(FALLBACK);
      } finally {
        setLoading(false);
      }
    };
    fetchAyah();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-6 shadow-xl dark:border-amber-800/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl" />
      <div className="relative mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg">📖</div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.widgets.ayah}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{ayah?.ref || "..."}</p>
        </div>
      </div>
      {loading ? (
        <div className="space-y-3">
          <div className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          <p className="text-center text-sm text-slate-500">{t.widgets.ayahLoading}</p>
        </div>
      ) : ayah ? (
        <div className="space-y-4">
          <p dir="rtl" className="rounded-2xl bg-white/70 p-4 text-right font-serif text-2xl leading-loose text-emerald-900 dark:bg-slate-800/60 dark:text-emerald-200" style={{ fontFamily: "Amiri, serif" }}>
            {ayah.ar}
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{ayah.bn}</p>
        </div>
      ) : null}
    </div>
  );
}
