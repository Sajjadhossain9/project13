import { useState } from "react";
import { useApp } from "../context";
import { LANG_LABELS, type Lang } from "../i18n";

const PAGES = [
  "home","about","academic","teachers","scholars","guardians","hafeez","student","notice","gallery","contact","admission","girls",
] as const;

export default function Navbar() {
  const { t, lang, setLang, dark, setDark, page, setPage } = useApp();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/50 bg-white/85 backdrop-blur-xl dark:border-emerald-900/30 dark:bg-slate-950/85">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <button onClick={() => setPage("home")} className="flex items-center gap-2 group">
          <img
            src="/image/logo.png"
            alt="Madrasah Darul Huda Logo"
            className="h-11 w-11 rounded-full object-cover shadow-md transition-transform group-hover:scale-110"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="text-start">
            <div className="text-base font-extrabold leading-tight text-emerald-800 dark:text-emerald-300">{t.siteName}</div>
            <div className="hidden text-[10px] text-amber-600 dark:text-amber-400 sm:block">{t.tagline}</div>
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 xl:flex">
          {PAGES.slice(0, 9).map((p) => (
            <li key={p}>
              <button
                onClick={() => setPage(p)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300 ${
                  page === p ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {(t.nav as any)[p]}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage("admission")}
            className="hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg sm:block"
          >
            {t.cta.admit}
          </button>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((x) => !x)}
              className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-white px-2.5 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-800 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700"
              aria-label="Language"
            >
              🌐 {LANG_LABELS[lang]}
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute end-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-2xl dark:border-emerald-900 dark:bg-slate-900">
                  {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`block w-full px-4 py-2 text-start text-sm transition-colors hover:bg-emerald-50 dark:hover:bg-slate-800 ${
                        lang === l ? "bg-emerald-100 font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200" : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {LANG_LABELS[l]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Dark mode */}
          <button
            onClick={() => setDark(!dark)}
            className="rounded-lg border border-emerald-200 bg-white p-2 text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-800 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-slate-700"
            aria-label="Toggle theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-emerald-200 bg-white p-2 text-emerald-700 xl:hidden dark:border-emerald-800 dark:bg-slate-800 dark:text-emerald-300"
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-emerald-100 bg-white dark:border-emerald-900 dark:bg-slate-950 xl:hidden">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-1 p-3 sm:grid-cols-3">
            {PAGES.map((p) => (
              <li key={p}>
                <button
                  onClick={() => { setPage(p); setOpen(false); }}
                  className={`w-full rounded-lg px-3 py-2 text-start text-sm font-medium transition-colors ${
                    page === p ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200" : "text-slate-600 hover:bg-emerald-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {(t.nav as any)[p]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
