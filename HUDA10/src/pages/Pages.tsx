import { useState } from "react";
import { useApp } from "../context";

const PageHero = ({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: string }) => (
  <section className="islamic-pattern relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 px-4 py-12 text-white sm:py-16">
    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
    <div className="relative mx-auto max-w-7xl">
      <div className="text-5xl">{icon || "✦"}</div>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-emerald-100">{subtitle}</p>}
    </div>
  </section>
);

export function About() {
  const { t } = useApp();
  return (
    <>
      <PageHero title={t.sections.aboutTitle} subtitle={t.tagline} icon="🕌" />
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        <p className="text-lg leading-loose text-slate-700 dark:text-slate-200">{t.sections.aboutText}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[t.stats.students, t.stats.graduates, t.stats.teachers].map((label, i) => (
            <div key={label} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-800 dark:bg-slate-800">
              <div className="text-4xl font-bold text-emerald-700 dark:text-emerald-400">{[400, 800, 21][i]}+</div>
              <div className="text-sm">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-amber-50 p-6 dark:bg-slate-800">
          <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">{t.sections.muhtamimTitle}</h3>
          <p className="mt-2 italic">"{t.contact.muhtamimName}"</p>
        </div>
      </section>
    </>
  );
}

export function Academic() {
  const { t } = useApp();
  return (
    <>
      <PageHero title={t.nav.academic} icon="📚" />
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold">{t.sections.programsTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.programs.map((p, i) => (
            <div key={i} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm hover:shadow-lg dark:border-emerald-800 dark:bg-slate-900">
              <div className="text-3xl">{["📖","📕","📗","📘","💚","🎒","🏠","💪"][i]}</div>
              <h3 className="mt-2 font-bold">{p}</h3>
            </div>
          ))}
        </div>
        <h2 className="mt-12 mb-6 text-2xl font-bold">{t.sections.departmentsTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(["d1","d2","d3","d4","d5","d6"] as const).map((k, i) => (
            <div key={k} className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white shadow-xl">
              <div className="text-4xl">{["🧒","📖","📕","👧","🌙","📚"][i]}</div>
              <h3 className="mt-2 text-xl font-bold">{(t.depts as any)[k]}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Teachers() {
  const { t, lang } = useApp();
  const names = lang === "bn"
    ? ["মাওলানা আব্দুল্লাহ","মাওলানা ইব্রাহিম","হাফেজ ইউসুফ","মুফতি জামাল","মাওলানা কামাল","হাফেজ লুকমান","মাওলানা মুসা","মাওলানা নাসির","হাফেজ ওমর","মাওলানা ফারুক","মুফতি কাসেম","মাওলানা রফিক","হাফেজ সাঈদ","মাওলানা তারেক","হাফেজ উবাইদ","মাওলানা ওয়াসিম","মাওলানা ইয়াসিন","মাওলানা যাকারিয়া","হাফেজ আবিদ","মাওলানা বশির","মুফতি সাইফুল"]
    : lang === "ar"
    ? ["مولانا عبدالله","مولانا إبراهيم","الحافظ يوسف","المفتي جمال","مولانا كمال","الحافظ لقمان","مولانا موسى","مولانا ناصر","الحافظ عمر","مولانا فاروق","المفتي قاسم","مولانا رفيق","الحافظ سعيد","مولانا طارق","الحافظ عبيد","مولانا وسيم","مولانا ياسين","مولانا زكريا","الحافظ عابد","مولانا بشير","المفتي سيف"]
    : ["Maulana Abdullah","Maulana Ibrahim","Hafiz Yusuf","Mufti Jamal","Maulana Kamal","Hafiz Luqman","Maulana Musa","Maulana Nasir","Hafiz Omar","Maulana Faruq","Mufti Qasim","Maulana Rafiq","Hafiz Saeed","Maulana Tariq","Hafiz Ubaid","Maulana Wasim","Maulana Yasin","Maulana Zakaria","Hafiz Abid","Maulana Bashir","Mufti Saiful"];
  return (
    <>
      <PageHero title={t.nav.teachers} subtitle={`${names.length} ${t.stats.teachers}`} icon="👨‍🏫" />
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {names.map((n, i) => (
            <div key={i} className="group rounded-2xl border border-emerald-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-emerald-800 dark:bg-slate-900">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 text-3xl text-white shadow-md">👤</div>
              <h3 className="mt-3 font-bold">{n}</h3>
              <p className="text-xs text-slate-500">{lang==="bn"?"শিক্ষক":lang==="ar"?"مدرس":"Teacher"}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Notice() {
  const { t, lang } = useApp();
  const items = [
    { d: "2026-01-15", title: lang==="bn"?"নতুন শিক্ষাবর্ষের ভর্তি শুরু":lang==="ar"?"بدء التسجيل للعام الدراسي الجديد":"New Academic Year Admission Open" },
    { d: "2025-12-20", title: lang==="bn"?"শীতকালীন ছুটির বিজ্ঞপ্তি":lang==="ar"?"إشعار العطلة الشتوية":"Winter Vacation Notice" },
    { d: "2025-11-10", title: lang==="bn"?"হিফজ পরীক্ষার সময়সূচি":lang==="ar"?"جدول امتحان الحفظ":"Hifz Examination Schedule" },
    { d: "2025-10-05", title: lang==="bn"?"অভিভাবক সভা":lang==="ar"?"اجتماع أولياء الأمور":"Parent Meeting" },
  ];
  return (
    <>
      <PageHero title={t.nav.notice} icon="📢" />
      <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <div className="space-y-3">
          {items.map((n, i) => (
            <div key={i} className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm hover:shadow-md dark:border-emerald-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-900/30">📌</div>
              <div className="flex-1">
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-xs text-slate-500">{n.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Gallery() {
  const { t } = useApp();
  return (
    <>
      <PageHero title={t.nav.gallery} icon="🖼️" />
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-200 to-amber-200 shadow-md transition-all hover:scale-105 dark:from-emerald-900 dark:to-amber-900">
              <div className="flex h-full items-center justify-center text-6xl opacity-70">{["🕌","📚","🤲","🎓","🌙","📖","✦","🌷","🧒","👧","🏫","📜","⭐","💫","🌸","🕋"][i]}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Contact() {
  const { t } = useApp();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero title={t.nav.contact} subtitle={t.contact.addressMain} icon="📞" />
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-800 dark:bg-slate-900">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400">{t.contact.address}</h3>
              <p className="mt-2 text-sm">📍 {t.contact.addressMain}</p>
              <p className="mt-1 text-sm">📍 {t.contact.addressSecond}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-800 dark:bg-slate-900">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400">{t.contact.phone}</h3>
              <a href="tel:01711962740" className="mt-2 block hover:text-emerald-600">📞 01711-962740</a>
              <a href="tel:01805448500" className="block hover:text-emerald-600">📞 01805-448500</a>
              <a href="https://wa.me/8801711962740" className="mt-2 inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">💬 WhatsApp</a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <iframe
                title="Map"
                src="https://maps.google.com/maps?q=Lalmonirhat&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-64 w-full" loading="lazy"
              />
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3 rounded-2xl border border-emerald-200 bg-white p-6 dark:border-emerald-800 dark:bg-slate-900">
            <h3 className="text-xl font-bold">{t.contact.sendMessage}</h3>
            <input required placeholder={t.contact.name} className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input type="email" required placeholder={t.contact.email} className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required placeholder={t.contact.phoneField} className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <textarea required rows={4} placeholder={t.contact.message} className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <button className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-800 py-3 font-bold text-white">{t.contact.send}</button>
            {sent && <p className="rounded-lg bg-green-50 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-300">{t.contact.sent}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

export function Admission() {
  const { t } = useApp();
  const [done, setDone] = useState(false);
  return (
    <>
      <PageHero title={t.admission.title} subtitle={t.admission.subtitle} icon="🎓" />
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        {done ? (
          <div className="rounded-3xl border-2 border-green-300 bg-green-50 p-10 text-center dark:border-green-800 dark:bg-green-950">
            <div className="text-6xl">✅</div>
            <h2 className="mt-4 text-2xl font-bold text-green-800 dark:text-green-300">{t.admission.success}</h2>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); window.scrollTo({top:0,behavior:'smooth'}); }} className="grid gap-3 rounded-2xl border border-emerald-200 bg-white p-6 sm:grid-cols-2 dark:border-emerald-800 dark:bg-slate-900">
            <input required placeholder={t.admission.studentName} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 sm:col-span-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required placeholder={t.admission.father} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required placeholder={t.admission.mother} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required type="number" placeholder={t.admission.age} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800" />
            <select required className="rounded-lg border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-800">
              <option value="">{t.admission.gender}</option>
              <option>{t.admission.male}</option>
              <option>{t.admission.female}</option>
            </select>
            <select required className="rounded-lg border border-emerald-200 bg-white px-3 py-2 sm:col-span-2 dark:border-emerald-800 dark:bg-slate-800">
              <option value="">{t.admission.class}</option>
              {(["d1","d2","d3","d4","d5"] as const).map((k) => (
                <option key={k}>{(t.depts as any)[k]}</option>
              ))}
            </select>
            <textarea required placeholder={t.admission.address} rows={3} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 sm:col-span-2 dark:border-emerald-800 dark:bg-slate-800" />
            <input required placeholder={t.contact.phoneField} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 sm:col-span-2 dark:border-emerald-800 dark:bg-slate-800" />
            <button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 font-bold text-white shadow-lg sm:col-span-2">{t.admission.submit}</button>
          </form>
        )}
      </section>
    </>
  );
}

export function Girls() {
  const { t } = useApp();
  return (
    <>
      <PageHero title={t.nav.girls} subtitle={t.sections.girlsText} icon="🌷" />
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        <p className="text-lg leading-loose">{t.sections.girlsText}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.map((w, i) => (
            <div key={i} className="rounded-2xl border border-pink-200 bg-pink-50 p-5 dark:border-pink-800/40 dark:bg-slate-900">
              <div className="text-3xl">{["🌸","🤲","🏠","🛡️","📚","💝"][i]}</div>
              <p className="mt-2 font-semibold">{w}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function SimpleListPage({ titleKey, items, icon }: { titleKey: keyof typeof import("../i18n").dict.bn.nav; items: { name: string; text: string }[]; icon: string }) {
  const { t } = useApp();
  return (
    <>
      <PageHero title={(t.nav as any)[titleKey]} icon={icon} />
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm dark:border-emerald-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl dark:bg-emerald-900/30">{icon}</div>
                <h3 className="font-bold">{it.name}</h3>
              </div>
              <p className="mt-3 text-sm italic text-slate-600 dark:text-slate-300">"{it.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Scholars() {
  const { lang } = useApp();
  const items = lang==="bn"?[
    { name:"মুফতি তাকী উসমানী", text:"মাদরাসা দারুল হুদার শিক্ষাব্যবস্থা প্রশংসনীয়।" },
    { name:"মাওলানা মাহমূদুল হাসান", text:"একটি আদর্শ ইসলামিক প্রতিষ্ঠান।" },
    { name:"মুফতি ফয়জুর রহমান", text:"কুরআন ও সুন্নাহর শিক্ষায় অগ্রগণ্য।" },
    { name:"মাওলানা সলমান হুসাইনি নদভী", text:"আখলাকের প্রতি বিশেষ মনোযোগ লক্ষণীয়।" },
  ]:lang==="ar"?[
    { name:"المفتي تقي العثماني", text:"النظام التعليمي في مدرسة دار الهدى يستحق الثناء." },
    { name:"مولانا محمود الحسن", text:"مؤسسة إسلامية مثالية." },
    { name:"المفتي فيض الرحمن", text:"رائدة في تعليم القرآن والسنة." },
    { name:"مولانا سلمان الحسيني الندوي", text:"اهتمام خاص بالأخلاق." },
  ]:[
    { name:"Mufti Taqi Usmani", text:"The education system at Madrasah Darul Huda is commendable." },
    { name:"Maulana Mahmudul Hasan", text:"An ideal Islamic institution." },
    { name:"Mufti Faizur Rahman", text:"Leading in Quran and Sunnah education." },
    { name:"Maulana Salman Hussaini Nadwi", text:"Special attention to character is notable." },
  ];
  return <SimpleListPage titleKey="scholars" items={items} icon="🎓" />;
}

export function Guardians() {
  const { lang } = useApp();
  const items = lang==="bn"?[
    { name:"আব্দুল করিম (অভিভাবক)", text:"আমার ছেলে এখানে এসে অসাধারণ পরিবর্তন এসেছে।" },
    { name:"রহিমা বেগম", text:"মেয়ের নিরাপত্তা ও পড়ালেখা—দুটোতেই আমি সন্তুষ্ট।" },
    { name:"মো. ইব্রাহিম", text:"শিক্ষকদের আন্তরিকতা ও যত্ন প্রশংসনীয়।" },
    { name:"সালমা খাতুন", text:"ইসলামিক ও আধুনিক শিক্ষার সুন্দর সমন্বয়।" },
  ]:lang==="ar"?[
    { name:"عبد الكريم", text:"حصل ابني على تغيير رائع هنا." },
    { name:"رحيمة بيغوم", text:"أنا راضٍ عن سلامة ابنتي ودراستها." },
    { name:"محمد إبراهيم", text:"إخلاص ورعاية المعلمين تستحق الثناء." },
    { name:"سلمى خاتون", text:"مزيج جميل من التعليم الإسلامي والحديث." },
  ]:[
    { name:"Abdul Karim (Guardian)", text:"My son has shown amazing change here." },
    { name:"Rahima Begum", text:"I'm satisfied with both my daughter's safety and studies." },
    { name:"Md. Ibrahim", text:"The teachers' sincerity and care are praiseworthy." },
    { name:"Salma Khatun", text:"Beautiful blend of Islamic and modern education." },
  ];
  return <SimpleListPage titleKey="guardians" items={items} icon="👨‍👩‍👧" />;
}

export function Hafeez() {
  const { lang } = useApp();
  const items = lang==="bn"?[
    { name:"হাফেজ আবদুল্লাহ", text:"২০২৩ সালে হিফজ সম্পন্ন।" },
    { name:"হাফেজ ইউসুফ", text:"২০২৪ সালে হিফজ সম্পন্ন।" },
    { name:"হাফেজ মুসা", text:"২০২৫ সালে হিফজ সম্পন্ন।" },
    { name:"হাফেজ সাঈদ", text:"২০২৫ সালে হিফজ সম্পন্ন।" },
  ]:lang==="ar"?[
    { name:"الحافظ عبدالله", text:"أكمل الحفظ في 2023." },
    { name:"الحافظ يوسف", text:"أكمل الحفظ في 2024." },
    { name:"الحافظ موسى", text:"أكمل الحفظ في 2025." },
    { name:"الحافظ سعيد", text:"أكمل الحفظ في 2025." },
  ]:[
    { name:"Hafiz Abdullah", text:"Completed Hifz in 2023." },
    { name:"Hafiz Yusuf", text:"Completed Hifz in 2024." },
    { name:"Hafiz Musa", text:"Completed Hifz in 2025." },
    { name:"Hafiz Saeed", text:"Completed Hifz in 2025." },
  ];
  return <SimpleListPage titleKey="hafeez" items={items} icon="🎓" />;
}

export function Student() {
  const { t, lang } = useApp();
  return (
    <>
      <PageHero title={t.nav.student} icon="🎒" />
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { t: lang==="bn"?"পাঠ্যসূচি":lang==="ar"?"المنهج":"Curriculum", i:"📋" },
            { t: lang==="bn"?"পরীক্ষার ফলাফল":lang==="ar"?"نتائج الامتحانات":"Exam Results", i:"📊" },
            { t: lang==="bn"?"অনলাইন রিসোর্স":lang==="ar"?"موارد عبر الإنترنت":"Online Resources", i:"💻" },
            { t: lang==="bn"?"সহশিক্ষা কার্যক্রম":lang==="ar"?"الأنشطة اللاصفية":"Co-curricular Activities", i:"⚽" },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm hover:shadow-lg dark:border-emerald-800 dark:bg-slate-900">
              <div className="text-4xl">{c.i}</div>
              <h3 className="mt-2 font-bold">{c.t}</h3>
              <p className="mt-1 text-sm text-slate-500">Placeholder / Admin Editable</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
