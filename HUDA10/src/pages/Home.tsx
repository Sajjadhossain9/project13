import { useApp } from "../context";
import logoImg from "../assets/logo.png";
import Counter from "../components/Counter";
import Qibla from "../components/Qibla";
import PrayerTimes from "../components/PrayerTimes";
import DailyAyah from "../components/DailyAyah";

export default function Home() {
  const { t, setPage } = useApp();

  return (
    <div className="islamic-pattern">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6 animate-fade-up">
              <span className="inline-block rounded-full border border-emerald-300 bg-emerald-100/70 px-4 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                ✦ {t.hero.badge}
              </span>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                {t.hero.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setPage("admission")} className="rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                  ✦ {t.cta.admit}
                </button>
                <button onClick={() => setPage("about")} className="rounded-2xl border-2 border-emerald-700 bg-white px-6 py-3 font-bold text-emerald-800 transition-all hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700">
                  {t.cta.learnMore}
                </button>
                <a href="tel:01711962740" className="rounded-2xl bg-emerald-800 px-6 py-3 font-bold text-white shadow-lg hover:scale-105">📞 {t.cta.callNow}</a>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-tr from-emerald-400/30 via-amber-400/30 to-emerald-400/30 blur-2xl" />
             <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-full bg-white shadow-2xl sm:h-96 sm:w-96 overflow-hidden p-4">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto -mt-8 max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-emerald-200/60 bg-white p-6 shadow-2xl md:grid-cols-4 dark:border-emerald-800/50 dark:bg-slate-900">
          {[
            { n: 400, label: t.stats.students, icon: "👨‍🎓" },
            { n: 800, label: t.stats.graduates, icon: "🎓" },
            { n: 21, label: t.stats.teachers, icon: "👨‍🏫" },
            { n: 4, label: t.stats.years, icon: "📅" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl">{s.icon}</div>
              <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 sm:text-4xl">
                <Counter end={s.n} />
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.aboutTitle}</h2>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">{t.sections.aboutText}</p>
            <button onClick={() => setPage("about")} className="mt-6 rounded-xl border-2 border-emerald-700 px-5 py-2 font-semibold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-slate-800">{t.cta.learnMore}</button>
          </div>
          <div className="rounded-3xl border-2 border-amber-300/50 bg-gradient-to-br from-amber-50 to-emerald-50 p-8 shadow-xl dark:border-amber-700/40 dark:from-slate-800 dark:to-slate-900">
            <div className="text-5xl">📜</div>
            <h3 className="mt-3 text-xl font-bold text-emerald-900 dark:text-emerald-200">{t.sections.muhtamimTitle}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">"{t.contact.muhtamimName}"</p>
            <p className="mt-4 text-sm italic text-slate-700 dark:text-slate-200">"{t.tagline}"</p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-gradient-to-b from-emerald-50/50 to-white py-16 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.whyTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.map((w, i) => (
              <div key={i} className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-emerald-900/40 dark:bg-slate-900">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-2xl text-white shadow-md group-hover:scale-110">
                  {["🎓","🤲","🏠","🛡️","📚","💰"][i]}
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{w}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.departmentsTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(["d1","d2","d3","d4","d5","d6"] as const).map((k, i) => (
            <div key={k} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white shadow-xl transition-all hover:scale-[1.03] hover:shadow-2xl">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/20 blur-xl" />
              <div className="text-4xl">{["🧒","📖","📕","👧","🌙","📚"][i]}</div>
              <h3 className="mt-3 text-xl font-bold">{(t.depts as any)[k]}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* GIRLS SAFETY */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-pink-50 via-amber-50 to-emerald-50 p-8 shadow-xl dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="text-sm font-bold uppercase text-pink-600">🌸 Girls Section</span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{t.sections.girlsTitle}</h2>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{t.sections.girlsText}</p>
              <button onClick={() => setPage("girls")} className="mt-5 rounded-xl bg-pink-600 px-5 py-2 font-bold text-white hover:bg-pink-700">{t.cta.learnMore}</button>
            </div>
            <div className="flex items-center justify-center text-9xl">🌷</div>
          </div>
        </div>
      </section>

      {/* ISLAMIC WIDGETS */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.widgetsTitle}</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <PrayerTimes />
          <Qibla />
          <DailyAyah />
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 p-10 text-center text-white shadow-2xl sm:p-16">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize:'60px 60px'}}/>
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">{t.sections.admissionCTA}</h2>
          <button onClick={() => setPage("admission")} className="relative mt-6 rounded-2xl bg-amber-500 px-8 py-3 font-bold text-white shadow-xl hover:scale-105 hover:bg-amber-600">{t.cta.admit} →</button>
        </div>
      </section>

      {/* GALLERY preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.galleryTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-200 to-amber-200 shadow-md transition-all hover:scale-105 dark:from-emerald-900 dark:to-amber-900">
              <div className="flex h-full items-center justify-center text-5xl opacity-60">{["🕌","📚","🤲","🎓","🌙","📖","✦","🌷"][i]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.sections.faqTitle}</h2>
        <div className="space-y-3">
          {t.faq.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm transition-all open:shadow-lg dark:border-emerald-900/40 dark:bg-slate-900">
              <summary className="cursor-pointer list-none font-semibold text-emerald-800 dark:text-emerald-300">
                <span className="me-2">❓</span>{f.q}
                <span className="float-end transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}