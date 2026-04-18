import { useState } from "react";
import { useApp } from "../context";

export default function Footer() {
  const { t, setPage } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative mt-16 border-t border-emerald-200/40 bg-gradient-to-b from-emerald-50 to-white text-slate-700 dark:border-emerald-900/40 dark:from-slate-950 dark:to-slate-950 dark:text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src="/image/logo.png" alt="Madrasah Darul Huda Logo" className="h-12 w-12 rounded-full" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
            <h3 className="text-lg font-extrabold text-emerald-800 dark:text-emerald-300">{t.siteName}</h3>
          </div>
          <p className="text-sm">{t.tagline}</p>
          <p className="text-xs">{t.contact.addressMain}</p>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-emerald-800 dark:text-emerald-300">{t.footer.quickLinks}</h4>
          <ul className="space-y-2 text-sm">
            {(["home","about","academic","admission","contact"] as const).map((p) => (
              <li key={p}><button onClick={() => setPage(p)} className="hover:text-emerald-600 hover:underline">{(t.nav as any)[p]}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-emerald-800 dark:text-emerald-300">{t.contact.phone}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:01711962740" className="hover:text-emerald-600">📞 01711-962740</a></li>
            <li><a href="tel:01805448500" className="hover:text-emerald-600">📞 01805-448500</a></li>
            <li><a href="https://wa.me/8801711962740" className="hover:text-emerald-600">💬 WhatsApp</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-emerald-800 dark:text-emerald-300">{t.footer.newsletter}</h4>
          <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); setEmail(""); }} className="space-y-2">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.footer.yourEmail} className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-800" />
            <button className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-800 py-2 text-sm font-bold text-white hover:scale-[1.02]">{t.footer.subscribe}</button>
            {subscribed && <p className="text-xs text-emerald-600">✓</p>}
          </form>
        </div>
      </div>
      <div className="border-t border-emerald-100 px-4 py-4 text-center text-xs dark:border-emerald-900">
        © {new Date().getFullYear()} {t.siteName}. {t.footer.rights}.
      </div>
    </footer>
  );
}
