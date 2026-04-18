import { useState, useRef, useEffect } from "react";
import { useApp } from "../context";

// ─── Knowledge Base ───────────────────────────────────────────────────────────
type QA = { keywords: string[]; bn: string; en: string; ar: string };

const QA_DB: QA[] = [
  // ADMISSION
  {
    keywords: ["ভর্তি", "admission", "admit", "ভর্তি হতে", "ভর্তি করতে", "تسجيل", "قبول", "انتساب"],
    bn: "ভর্তির জন্য ০১৭১১-৯৬২৭৪০ নম্বরে কল করুন অথবা ওয়েবসাইটের ভর্তি পেইজ দেখুন। ভর্তি সারাবছর চলমান।",
    en: "To get admitted, call 01711-962740 or visit the Admission page on our website. Admissions are open throughout the year.",
    ar: "للتسجيل، اتصل على 01711-962740 أو تفضل بزيارة صفحة التسجيل على موقعنا. القبول متاح طوال العام.",
  },
  {
    keywords: ["ভর্তির যোগ্যতা", "admission requirement", "eligibility", "কত বছর", "age", "বয়স"],
    bn: "বিভাগভেদে ভর্তির বয়স ও যোগ্যতা ভিন্ন। নূরানী বিভাগে ৪+ বছর, হিফজে ৭+ বছর। বিস্তারিত জানতে ০১৭১১-৯৬২৭৪০ নম্বরে কল করুন।",
    en: "Age and eligibility vary by department. Noorani: 4+ years, Hifz: 7+ years. Call 01711-962740 for details.",
    ar: "تختلف شروط القبول حسب القسم. النوراني: 4+ سنوات، الحفظ: 7+ سنوات. اتصل على 01711-962740 للتفاصيل.",
  },
  {
    keywords: ["ভর্তি ফরম", "admission form", "form", "ফরম", "نموذج"],
    bn: "ভর্তি ফরম মাদ্রাসা অফিস থেকে সংগ্রহ করতে হবে অথবা ওয়েবসাইটের ভর্তি পেইজ থেকে পাওয়া যাবে।",
    en: "Admission forms are available at the madrasa office or on the Admission page of our website.",
    ar: "نماذج التسجيل متاحة في مكتب المدرسة أو على صفحة التسجيل في موقعنا.",
  },

  // FEES
  {
    keywords: ["ফি", "fee", "fees", "খরচ", "cost", "টাকা", "রসুম", "رسوم", "تكلفة", "مصاريف"],
    bn: "ফি বিভাগভেদে ভিন্ন। সঠিক তথ্যের জন্য অফিসে যোগাযোগ করুন: ০১৭১১-৯৬২৭৪০।",
    en: "Fees vary by department. For exact amounts, contact the office at 01711-962740.",
    ar: "الرسوم تختلف حسب القسم. للاستفسار، اتصل بالمكتب على 01711-962740.",
  },
  {
    keywords: ["বেতন", "monthly fee", "মাসিক", "মাসে কত", "monthly", "شهري"],
    bn: "মাসিক বেতন বিভাগ অনুযায়ী আলাদা। বিস্তারিত জানতে অফিসে যোগাযোগ করুন: ০১৭১১-৯৬২৭৪০।",
    en: "Monthly fees differ by department. Please contact the office at 01711-962740 for details.",
    ar: "الرسوم الشهرية تختلف حسب القسم. تواصل مع المكتب على 01711-962740.",
  },
  {
    keywords: ["বৃত্তি", "scholarship", "free", "বিনামূল্যে", "গরিব", "poor", "منحة", "مجاني"],
    bn: "মেধাবী ও অসচ্ছল শিক্ষার্থীদের জন্য বৃত্তি ও ছাড়ের ব্যবস্থা রয়েছে। বিস্তারিত জানতে অফিসে যোগাযোগ করুন।",
    en: "Scholarships and fee waivers are available for talented and underprivileged students. Contact the office for details.",
    ar: "تتوفر منح دراسية وإعفاءات للطلاب المتميزين والمحتاجين. تواصل مع المكتب للتفاصيل.",
  },

  // HIFZ
  {
    keywords: ["হিফজ", "hifz", "quran memorize", "কুরআন হিফজ", "حفظ", "حفظ القرآن"],
    bn: "আমাদের হিফজ প্রোগ্রামে আবাসিক ও অনাবাসিক উভয় সুবিধা রয়েছে। অভিজ্ঞ হাফেজ শিক্ষকদের তত্ত্বাবধানে শিক্ষার্থীরা ৩-৫ বছরে হিফজ সম্পন্ন করে।",
    en: "Our Hifz program offers both residential and non-residential options. Students complete Hifz in 3-5 years under experienced Hafez teachers.",
    ar: "يتوفر برنامج حفظ القرآن بنظامي الداخلية والخارجية. يتم الحفظ في 3-5 سنوات تحت إشراف معلمين متخصصين.",
  },
  {
    keywords: ["হিফজ আবাসিক", "residential hifz", "boarding", "হোস্টেল", "থাকা", "داخلي", "سكن"],
    bn: "আবাসিক হিফজ প্রোগ্রামে থাকা-খাওয়ার সুবিধা রয়েছে। নিরাপদ ও ইসলামিক পরিবেশে শিক্ষার্থীরা পূর্ণকালীন কুরআন হিফজ করে।",
    en: "The residential Hifz program includes accommodation and meals. Students memorize the Quran full-time in a safe Islamic environment.",
    ar: "يشمل برنامج الحفظ الداخلي السكن والطعام. يحفظ الطلاب القرآن بدوام كامل في بيئة إسلامية آمنة.",
  },

  // GIRLS SECTION
  {
    keywords: ["মেয়ে", "girls", "girl", "মহিলা", "women", "female", "পর্দা", "purdah", "بنات", "نساء", "حجاب"],
    bn: "মেয়েদের জন্য সম্পূর্ণ আলাদা ও নিরাপদ বিভাগ রয়েছে। মহিলা শিক্ষক, পর্দার ব্যবস্থা এবং আবাসিক সুবিধা আছে।",
    en: "We have a fully separate and secure girls section with female teachers, full purdah system, and residential facilities.",
    ar: "يوجد قسم بنات منفصل وآمن تمامًا مع مدرسات متخصصات ونظام حجاب كامل وسكن داخلي.",
  },
  {
    keywords: ["মেয়েদের হিফজ", "girls hifz", "female hifz", "حفظ بنات"],
    bn: "মেয়েদের জন্য আলাদা হিফজ বিভাগ রয়েছে। মহিলা হাফেজা শিক্ষকদের তত্ত্বাবধানে পর্দার সাথে হিফজ করার সুযোগ আছে।",
    en: "A separate Hifz section for girls is available with female Hafeza teachers in a full purdah environment.",
    ar: "يتوفر قسم حفظ مستقل للبنات مع معلمات حافظات في بيئة محتشمة.",
  },

  // DEPARTMENTS
  {
    keywords: ["বিভাগ", "department", "বিভাগসমূহ", "কোন কোন", "section", "قسم", "أقسام"],
    bn: "আমাদের বিভাগসমূহ: ১) নূরানী ও মক্তব ২) হিফজুল কুরআন ৩) কিতাব বিভাগ ৪) মেয়ে বিভাগ ৫) দাওরায়ে হাদিস ৬) নৈশ প্রোগ্রাম।",
    en: "Our departments: 1) Noorani & Maktab 2) Hifzul Quran 3) Kitab 4) Girls Section 5) Dawra-e-Hadith 6) Night Program.",
    ar: "أقسامنا: ١) النوراني والمكتب ٢) حفظ القرآن ٣) الكتب ٤) قسم البنات ٥) دورة الحديث ٦) البرنامج المسائي.",
  },
  {
    keywords: ["নূরানী", "noorani", "maktab", "মক্তব", "ছোট", "children", "kids", "نوراني", "مكتب"],
    bn: "নূরানী ও মক্তব বিভাগে ছোট শিশুদের (৪-১০ বছর) কুরআন শিক্ষা ও প্রাথমিক ইসলামিক শিক্ষা দেওয়া হয়।",
    en: "The Noorani & Maktab department teaches young children (4-10 years) Quran recitation and basic Islamic education.",
    ar: "يُعلَّم في قسم النوراني والمكتب الأطفال الصغار (4-10 سنوات) تلاوة القرآن والتعليم الإسلامي الأساسي.",
  },
  {
    keywords: ["কিতাব", "kitab", "islamic studies", "আলেম", "alim", "كتب", "علوم إسلامية"],
    bn: "কিতাব বিভাগে ইসলামের মূল বিষয়সমূহ — ফিকহ, হাদিস, তাফসীর, আকিদা ইত্যাদি পড়ানো হয়।",
    en: "The Kitab department covers core Islamic subjects — Fiqh, Hadith, Tafseer, Aqeedah, and more.",
    ar: "يغطي قسم الكتب المواد الإسلامية الأساسية — الفقه والحديث والتفسير والعقيدة وغيرها.",
  },
  {
    keywords: ["দাওরা", "dawra", "hadith", "হাদিস", "دورة الحديث", "تخصص"],
    bn: "দাওরায়ে হাদিস হলো সর্বোচ্চ ইসলামিক ডিগ্রি কোর্স। এটি সফলভাবে সম্পন্ন করলে আলেম হওয়ার সনদ পাওয়া যায়।",
    en: "Dawra-e-Hadith is the highest Islamic degree course. Graduates receive certification as an Alim (Islamic scholar).",
    ar: "دورة الحديث هي أعلى درجة إسلامية. يحصل الخريجون على شهادة عالم.",
  },
  {
    keywords: ["নৈশ", "night", "সন্ধ্যা", "evening", "মসজিদ", "مسائي", "ليلي"],
    bn: "নৈশ প্রোগ্রামে কর্মজীবী মানুষ ও স্কুল-কলেজের শিক্ষার্থীরা সন্ধ্যায় কুরআন ও ইসলামিক শিক্ষা গ্রহণ করতে পারেন।",
    en: "The Night Program allows working adults and school/college students to study Quran and Islamic education in the evenings.",
    ar: "يتيح البرنامج المسائي للموظفين وطلاب المدارس دراسة القرآن والتعليم الإسلامي مساءً.",
  },

  // TEACHERS
  {
    keywords: ["শিক্ষক", "teacher", "ustaz", "উস্তাদ", "staff", "faculty", "معلم", "أستاذ"],
    bn: "আমাদের ২১ জন অভিজ্ঞ ও যোগ্য শিক্ষক রয়েছেন। সকলেই স্বীকৃত ইসলামিক প্রতিষ্ঠান থেকে সনদপ্রাপ্ত।",
    en: "We have 21 experienced and qualified teachers, all certified from recognized Islamic institutions.",
    ar: "لدينا 21 معلمًا مؤهلًا وذا خبرة، جميعهم حاصلون على شهادات من مؤسسات إسلامية معترف بها.",
  },
  {
    keywords: ["মুহতামিম", "principal", "muhtamim", "প্রধান", "head", "مهتمم", "مدير"],
    bn: "আমাদের মুহতামিম একজন অভিজ্ঞ ইসলামিক স্কলার। তাঁর সাথে যোগাযোগ করতে অফিসে আসুন বা ০১৭১১-৯৬২৭৪০ নম্বরে কল করুন।",
    en: "Our Muhtamim is an experienced Islamic scholar. To contact him, visit the office or call 01711-962740.",
    ar: "مهتممنا عالم إسلامي ذو خبرة. للتواصل معه، تفضل بزيارة المكتب أو اتصل على 01711-962740.",
  },

  // CONTACT & ADDRESS
  {
    keywords: ["ঠিকানা", "address", "location", "কোথায়", "where", "عنوان", "موقع"],
    bn: "আমাদের ঠিকানা ও সম্পূর্ণ যোগাযোগ তথ্যের জন্য ওয়েবসাইটের যোগাযোগ পেইজ দেখুন অথবা ০১৭১১-৯৬২৭৪০ নম্বরে কল করুন।",
    en: "For our full address and contact details, visit the Contact page on our website or call 01711-962740.",
    ar: "للحصول على عنواننا الكامل ومعلومات الاتصال، تفضل بزيارة صفحة التواصل أو اتصل على 01711-962740.",
  },
  {
    keywords: ["ফোন", "phone", "number", "নম্বর", "call", "কল", "هاتف", "رقم"],
    bn: "আমাদের ফোন নম্বর: ০১৭১১-৯৬২৭৪০। অফিস সময়: শনি-বৃহস্পতি, সকাল ৯টা থেকে বিকাল ৫টা।",
    en: "Our phone number: 01711-962740. Office hours: Sat–Thu, 9 AM to 5 PM.",
    ar: "رقم هاتفنا: 01711-962740. ساعات العمل: السبت–الخميس، من 9 صباحًا حتى 5 مساءً.",
  },
  {
    keywords: ["whatsapp", "হোয়াটসঅ্যাপ", "واتساب", "মেসেজ", "message"],
    bn: "আমাদের WhatsApp নম্বর: ০১৭১১-৯৬২৭৪০। নিচের সবুজ বাটনে ক্লিক করে সরাসরি WhatsApp-এ যোগাযোগ করুন।",
    en: "Our WhatsApp: 01711-962740. Click the green button below to contact us directly on WhatsApp.",
    ar: "واتساب: 01711-962740. انقر على الزر الأخضر أدناه للتواصل عبر واتساب مباشرة.",
  },
  {
    keywords: ["ইমেইল", "email", "ই-মেইল", "بريد إلكتروني"],
    bn: "ইমেইলের জন্য ওয়েবসাইটের যোগাযোগ পেইজ দেখুন। দ্রুত যোগাযোগের জন্য ০১৭১১-৯৬২৭৪০ নম্বরে কল করুন।",
    en: "For email, check the Contact page on our website. For quick response, call 01711-962740.",
    ar: "للبريد الإلكتروني، تفضل بزيارة صفحة التواصل. للرد السريع، اتصل على 01711-962740.",
  },
  {
    keywords: ["অফিস সময়", "office hour", "opening time", "কখন খোলা", "ساعات العمل"],
    bn: "অফিস সময়: শনিবার থেকে বৃহস্পতিবার, সকাল ৯টা থেকে বিকাল ৫টা। শুক্রবার বন্ধ।",
    en: "Office hours: Saturday to Thursday, 9 AM to 5 PM. Closed on Fridays.",
    ar: "ساعات المكتب: السبت–الخميس، من 9 صباحًا إلى 5 مساءً. مغلق أيام الجمعة.",
  },

  // STATS
  {
    keywords: ["কতজন", "how many", "student", "শিক্ষার্থী", "ছাত্র", "طلاب", "عدد"],
    bn: "আমাদের বর্তমানে ৪০০+ শিক্ষার্থী রয়েছে। মোট ৮০০+ স্নাতক, ২১ জন শিক্ষক এবং ৪+ বছরের অভিজ্ঞতা।",
    en: "We currently have 400+ students, 800+ graduates, 21 teachers, and 4+ years of experience.",
    ar: "لدينا حاليًا 400+ طالب، و800+ خريج، و21 معلمًا، وخبرة تزيد على 4 سنوات.",
  },

  // PRAYER TIMES & ISLAMIC
  {
    keywords: ["নামাজ", "prayer", "salah", "salat", "ওয়াক্ত", "prayer time", "صلاة", "أوقات الصلاة"],
    bn: "ওয়েবসাইটের হোমপেইজে লাইভ নামাজের সময়সূচি দেখতে পাবেন। এটি আপনার লোকেশন অনুযায়ী স্বয়ংক্রিয়ভাবে আপডেট হয়।",
    en: "Live prayer times are shown on our homepage, automatically updated based on your location.",
    ar: "أوقات الصلاة الحية متاحة على الصفحة الرئيسية لموقعنا، وتُحدَّث تلقائيًا حسب موقعك.",
  },
  {
    keywords: ["কিবলা", "qibla", "direction", "দিক", "قبلة", "اتجاه"],
    bn: "ওয়েবসাইটে কিবলা নির্দেশক (Qibla Finder) রয়েছে। হোমপেইজের ইসলামিক উইজেট সেকশনে গিয়ে দেখুন।",
    en: "A Qibla direction finder is available on our website in the Islamic Widgets section on the homepage.",
    ar: "يتوفر محدد اتجاه القبلة على موقعنا في قسم الأدوات الإسلامية بالصفحة الرئيسية.",
  },
  {
    keywords: ["আয়াত", "ayah", "quran", "কুরআন", "daily", "آية", "قرآن"],
    bn: "প্রতিদিন একটি কুরআনের আয়াত আমাদের হোমপেইজে প্রদর্শিত হয়। বাংলা, ইংরেজি ও আরবিতে দেখা যায়।",
    en: "A Daily Ayah from the Quran is displayed on our homepage in Bengali, English, and Arabic.",
    ar: "تُعرض آية قرآنية يومية على صفحتنا الرئيسية باللغات البنغالية والإنجليزية والعربية.",
  },

  // ABOUT MADRASA
  {
    keywords: ["সম্পর্কে", "about", "কী", "what is", "মাদ্রাসা", "madrasa", "حول", "ما هي"],
    bn: "DARUL HUDA ACADEMY একটি ইসলামিক শিক্ষা প্রতিষ্ঠান যেখানে নূরানী থেকে দাওরায়ে হাদিস পর্যন্ত সকল স্তরের ইসলামিক শিক্ষা দেওয়া হয়।",
    en: "DARUL HUDA ACADEMY is an Islamic educational institution offering all levels of Islamic education from Noorani to Dawra-e-Hadith.",
    ar: "DARUL HUDA ACADEMY مؤسسة تعليمية إسلامية تقدم جميع مستويات التعليم الإسلامي من النوراني حتى دورة الحديث.",
  },
  {
    keywords: ["কতদিন", "how long", "duration", "সময়কাল", "মেয়াদ", "مدة"],
    bn: "কোর্সের মেয়াদ বিভাগভেদে ভিন্ন: হিফজ ৩-৫ বছর, কিতাব ৬-৮ বছর, দাওরা ১ বছর। বিস্তারিত জানতে কল করুন।",
    en: "Course duration varies: Hifz 3-5 years, Kitab 6-8 years, Dawra 1 year. Call for more details.",
    ar: "مدة الدراسة تختلف: الحفظ 3-5 سنوات، الكتب 6-8 سنوات، الدورة سنة واحدة.",
  },
  {
    keywords: ["সনদ", "certificate", "degree", "সার্টিফিকেট", "شهادة"],
    bn: "সকল বিভাগ থেকে উত্তীর্ণ শিক্ষার্থীদের সনদ প্রদান করা হয়। দাওরায়ে হাদিস সনদ সর্বোচ্চ ইসলামিক ডিগ্রি হিসেবে স্বীকৃত।",
    en: "Certificates are awarded to graduates of all departments. The Dawra-e-Hadith certificate is recognized as the highest Islamic degree.",
    ar: "تُمنح الشهادات لجميع خريجي الأقسام. شهادة دورة الحديث معترف بها كأعلى درجة إسلامية.",
  },
  {
    keywords: ["হোস্টেল", "hostel", "আবাসিক", "residential", "থাকা খাওয়া", "accommodation", "سكن", "داخلية"],
    bn: "আবাসিক শিক্ষার্থীদের জন্য হোস্টেল সুবিধা রয়েছে। নিরাপদ ও ইসলামিক পরিবেশে থাকা-খাওয়ার ব্যবস্থা আছে।",
    en: "Hostel facilities are available for residential students with a safe and Islamic environment including meals.",
    ar: "تتوفر مرافق سكن داخلي للطلاب في بيئة إسلامية آمنة مع توفير الطعام.",
  },
  {
    keywords: ["পরীক্ষা", "exam", "test", "result", "রেজাল্ট", "امتحان", "نتيجة"],
    bn: "নিয়মিত পরীক্ষা ও মূল্যায়নের মাধ্যমে শিক্ষার্থীদের অগ্রগতি পর্যবেক্ষণ করা হয়। বার্ষিক পরীক্ষার ফলাফল অভিভাবকদের জানানো হয়।",
    en: "Students are regularly assessed through tests and evaluations. Annual exam results are communicated to parents.",
    ar: "يُقيَّم الطلاب بانتظام من خلال الاختبارات. تُبلَّغ نتائج الامتحانات السنوية لأولياء الأمور.",
  },
  {
    keywords: ["অভিভাবক", "parent", "guardian", "বাবা মা", "والدين", "أولياء الأمور"],
    bn: "অভিভাবকরা যেকোনো সময় অফিসে এসে সন্তানের অগ্রগতি সম্পর্কে জানতে পারবেন। ০১৭১১-৯৬২৭৪০ নম্বরে যোগাযোগ করুন।",
    en: "Parents can visit the office anytime to inquire about their child's progress. Call 01711-962740.",
    ar: "يمكن لأولياء الأمور زيارة المكتب في أي وقت للاستفسار عن تقدم أبنائهم. اتصل على 01711-962740.",
  },
];

// ─── Language Detection ───────────────────────────────────────────────────────
function detectLang(text: string): "bn" | "en" | "ar" {
  const bnPattern = /[\u0980-\u09FF]/;
  const arPattern = /[\u0600-\u06FF]/;
  if (bnPattern.test(text)) return "bn";
  if (arPattern.test(text)) return "ar";
  return "en";
}

// ─── Smart Answer Engine ──────────────────────────────────────────────────────
function getAnswer(input: string): string {
  const lang = detectLang(input);
  const lower = input.toLowerCase();

  // Score each QA entry
  let bestScore = 0;
  let bestMatch: QA | null = null;

  for (const qa of QA_DB) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.length; // longer keyword = higher score
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch[lang];
  }

  // Fallback
  const fallbacks = {
    bn: "আপনার প্রশ্নের জন্য ধন্যবাদ। বিস্তারিত তথ্যের জন্য অনুগ্রহ করে ০১৭১১-৯৬২৭৪০ নম্বরে কল করুন বা WhatsApp করুন।",
    en: "Thank you for your question. For more details, please call or WhatsApp us at 01711-962740.",
    ar: "شكرًا على سؤالك. للمزيد من التفاصيل، يرجى الاتصال أو مراسلتنا عبر واتساب على 01711-962740.",
  };
  return fallbacks[lang];
}

// ─── Component ────────────────────────────────────────────────────────────────
type Msg = { role: "bot" | "user"; text: string };

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="white" className={className}>
    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.83.74 5.49 2.04 7.8L.5 31.5l7.93-2.08A15.45 15.45 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.2 13.2 0 01-6.73-1.84l-.48-.29-4.71 1.24 1.26-4.6-.31-.5A13.25 13.25 0 1116 28.8zm7.27-9.93c-.4-.2-2.36-1.16-2.72-1.3-.37-.13-.63-.2-.9.2-.26.39-1.02 1.3-1.25 1.56-.23.27-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.98-1.18-1.05-1.98-2.35-2.21-2.75-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.69.2-.23.26-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68h-.76c-.27 0-.7.1-1.06.5-.37.4-1.4 1.37-1.4 3.33 0 1.97 1.43 3.87 1.63 4.14.2.26 2.82 4.3 6.83 6.03.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.36-.97 2.7-1.9.33-.94.33-1.74.23-1.9-.1-.17-.36-.27-.76-.47z" />
  </svg>
);

const SUGGESTIONS = [
  { label: "ভর্তি তথ্য 📋", text: "ভর্তির জন্য কী করতে হবে?" },
  { label: "Admission Info 📋", text: "How do I get admitted?" },
  { label: "হিফজ প্রোগ্রাম 📖", text: "হিফজ প্রোগ্রাম সম্পর্কে জানতে চাই" },
  { label: "Girls Section 🌸", text: "Tell me about the girls section" },
  { label: "ফি কত? 💰", text: "মাসিক ফি কত?" },
  { label: "বিভাগগুলো 🏫", text: "কোন কোন বিভাগ আছে?" },
  { label: "Contact 📞", text: "What is the contact number?" },
  { label: "نظام الحفظ 📖", text: "ما هو نظام حفظ القرآن؟" },
];

export default function Floating() {
  const { t } = useApp();
  const [chatOpen, setChatOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: t.chat.welcome },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    // Simulate thinking delay for natural feel
    setTimeout(() => {
      const reply = getAnswer(text);
      setMsgs((m) => [...m, { role: "bot", text: reply }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  const showSuggestions = msgs.length <= 1;

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/8801711962740"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 shadow-2xl transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-green-400/60" />
        <span className="relative">
          <WhatsAppIcon className="h-7 w-7" />
        </span>
      </a>

      {/* Chat Trigger */}
      <button
        onClick={() => setChatOpen((x) => !x)}
        aria-label="AI Chat"
        className="fixed bottom-24 end-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-xl transition-transform hover:scale-110"
      >
        🙋‍♂️
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-40 end-5 z-40 flex h-[500px] w-[320px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-2xl dark:border-emerald-800 dark:bg-slate-900">

          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-700 to-emerald-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">🤖</div>
              <div>
                <div className="text-sm font-bold">{t.chat.title}</div>
                <div className="flex items-center gap-1 text-xs text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                  Artificial Inteligence
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white text-lg">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "bot"
                    ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
                    : "ms-auto bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100"
                }`}
              >
                {m.text}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="max-w-[88%] rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-900/40">
                <span className="flex gap-1 items-center">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0.3s" }} />
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Suggestions */}
          {showSuggestions && (
            <div className="flex flex-wrap gap-1 border-t border-emerald-100 px-3 py-2 dark:border-emerald-900">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => sendMessage(s.text)}
                  className="rounded-full border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex border-t border-emerald-100 dark:border-emerald-900">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={t.chat.placeholder}
              className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="bg-emerald-700 px-4 text-white disabled:opacity-40 hover:bg-emerald-800"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}