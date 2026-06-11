export type Lang = "en" | "ta";

export type DepartmentInfo = {
  faqs: { q: string; a: string }[];
  nextSteps: string[];
};

type Entry = Record<Lang, DepartmentInfo>;

// Canonical keys are lowercase English department names.
const DATA: Record<string, Entry> = {
  cardiology: {
    en: {
      faqs: [
        { q: "What does Cardiology treat?", a: "Heart and blood vessel conditions like chest pain, palpitations, high blood pressure, and heart failure." },
        { q: "Do I need a referral?", a: "Walk-ins are accepted for urgent symptoms. For routine follow-up, a referral from General Medicine speeds things up." },
        { q: "What tests are common?", a: "ECG, echocardiogram, stress test, and blood work (lipids, troponin)." },
      ],
      nextSteps: [
        "Go to the Cardiology OPD on Floor 2, Wing B.",
        "Bring previous ECG / echo reports and your medication list.",
        "Avoid heavy meals and caffeine 2 hours before tests.",
        "If chest pain is severe or radiating, go to Emergency now.",
      ],
    },
    ta: {
      faqs: [
        { q: "Cardiology என்ன சிகிச்சை அளிக்கிறது?", a: "மார்பு வலி, படபடப்பு, உயர் இரத்த அழுத்தம், இதய செயலிழப்பு போன்ற இதய மற்றும் இரத்தக் குழாய் நோய்கள்." },
        { q: "பரிந்துரை தேவையா?", a: "அவசர அறிகுறிகளுக்கு நேரடியாக வரலாம். வழக்கமான பரிசோதனைக்கு General Medicine பரிந்துரை விரைவாக உதவும்." },
        { q: "என்ன பரிசோதனைகள் வழக்கம்?", a: "ECG, எக்கோ, ஸ்ட்ரெஸ் டெஸ்ட், ரத்தப் பரிசோதனை." },
      ],
      nextSteps: [
        "Cardiology OPD — 2வது தளம், B பிரிவுக்குச் செல்லுங்கள்.",
        "முந்தைய ECG / எக்கோ அறிக்கைகள் மற்றும் மருந்துப் பட்டியலைக் கொண்டு வாருங்கள்.",
        "பரிசோதனைக்கு 2 மணி நேரம் முன் கனமான உணவு / காபி தவிர்க்கவும்.",
        "மார்பு வலி கடுமையாக இருந்தால் உடனே Emergency-க்குச் செல்லுங்கள்.",
      ],
    },
  },
  orthopedics: {
    en: {
      faqs: [
        { q: "What does Orthopedics treat?", a: "Bones, joints, ligaments, muscles — fractures, back pain, sports injuries, arthritis." },
        { q: "Will I need an X-ray?", a: "Often yes. The OPD will guide you to Radiology on the ground floor." },
        { q: "How long is recovery?", a: "Depends on injury — sprains 1–3 weeks, fractures 4–8 weeks." },
      ],
      nextSteps: [
        "Go to the Orthopedics OPD on Floor 1, Wing A.",
        "Immobilize the injured area; avoid putting weight on it.",
        "Bring any prior X-rays or MRI scans.",
        "Apply ice for 15 minutes if there is swelling.",
      ],
    },
    ta: {
      faqs: [
        { q: "Orthopedics என்ன சிகிச்சை அளிக்கிறது?", a: "எலும்பு, மூட்டு, தசை — எலும்பு முறிவு, முதுகுவலி, விளையாட்டு காயங்கள், கீல்வாதம்." },
        { q: "எக்ஸ்-ரே தேவைப்படுமா?", a: "பெரும்பாலும் ஆம். OPD உங்களை தரைத்தளத்தில் உள்ள Radiology-க்கு வழிநடத்தும்." },
        { q: "குணமாக எவ்வளவு நேரம்?", a: "காயத்தைப் பொறுத்து — சுளுக்கு 1–3 வாரம், எலும்பு முறிவு 4–8 வாரம்." },
      ],
      nextSteps: [
        "Orthopedics OPD — 1வது தளம், A பிரிவுக்குச் செல்லுங்கள்.",
        "காயமான பகுதிக்கு எடை கொடுக்க வேண்டாம்.",
        "முந்தைய எக்ஸ்-ரே / MRI படங்களைக் கொண்டு வாருங்கள்.",
        "வீக்கம் இருந்தால் 15 நிமிடம் ஐஸ் வைக்கவும்.",
      ],
    },
  },
  ent: {
    en: {
      faqs: [
        { q: "What does ENT cover?", a: "Ear, Nose, and Throat conditions — hearing issues, sinusitis, tonsillitis, vertigo." },
        { q: "Is a hearing test available?", a: "Yes, audiometry is done in the ENT OPD itself." },
      ],
      nextSteps: [
        "Go to the ENT OPD on Floor 2, Wing C.",
        "Avoid inserting cotton buds into the ear before the visit.",
        "Note when symptoms started and any triggers.",
      ],
    },
    ta: {
      faqs: [
        { q: "ENT என்ன பார்க்கிறது?", a: "காது, மூக்கு, தொண்டை — கேட்கும் பிரச்சினைகள், சைனஸ், டான்சில், தலைச்சுற்றல்." },
        { q: "செவித்திறன் பரிசோதனை உள்ளதா?", a: "ஆம், ENT OPD-யிலேயே audiometry செய்யப்படும்." },
      ],
      nextSteps: [
        "ENT OPD — 2வது தளம், C பிரிவுக்குச் செல்லுங்கள்.",
        "வருகைக்கு முன் காதில் cotton bud பயன்படுத்த வேண்டாம்.",
        "அறிகுறிகள் எப்போது தொடங்கின என்பதைக் குறிக்கவும்.",
      ],
    },
  },
  "general medicine": {
    en: {
      faqs: [
        { q: "When should I choose General Medicine?", a: "For fever, fatigue, common infections, or when you are unsure which specialist to see." },
        { q: "Will they refer me?", a: "Yes — if a specialist is needed, they will refer you internally." },
      ],
      nextSteps: [
        "Go to the General OPD on the Ground Floor.",
        "Carry a list of current medications and known allergies.",
        "Note temperature readings and symptom timeline.",
      ],
    },
    ta: {
      faqs: [
        { q: "General Medicine-ஐ எப்போது தேர்வு செய்ய?", a: "காய்ச்சல், சோர்வு, பொதுவான தொற்று, அல்லது எந்த நிபுணரைப் பார்ப்பது என்று தெரியாதபோது." },
        { q: "அவர்கள் பரிந்துரை அளிப்பார்களா?", a: "ஆம் — தேவைப்பட்டால் நிபுணருக்கு உள்நாட்டில் பரிந்துரை வழங்குவார்கள்." },
      ],
      nextSteps: [
        "General OPD — தரைத்தளத்திற்குச் செல்லுங்கள்.",
        "தற்போதைய மருந்துகள் மற்றும் ஒவ்வாமை பட்டியலைக் கொண்டு வாருங்கள்.",
        "வெப்பநிலை மற்றும் அறிகுறிகள் காலவரிசையைக் குறிக்கவும்.",
      ],
    },
  },
  pediatrics: {
    en: {
      faqs: [
        { q: "What age range?", a: "Newborn through 16 years." },
        { q: "Can I bring vaccination records?", a: "Yes, please bring the immunization card on every visit." },
      ],
      nextSteps: [
        "Go to the Pediatrics OPD on Floor 1, Wing D.",
        "Bring the child's immunization card and growth chart.",
        "Note feeding, fever, and sleep patterns of the last 48 hours.",
      ],
    },
    ta: {
      faqs: [
        { q: "எந்த வயதுக்கு?", a: "பிறந்த குழந்தை முதல் 16 வயது வரை." },
        { q: "தடுப்பூசி அட்டை கொண்டு வரலாமா?", a: "ஆம், ஒவ்வொரு வருகையிலும் தடுப்பூசி அட்டையைக் கொண்டு வாருங்கள்." },
      ],
      nextSteps: [
        "Pediatrics OPD — 1வது தளம், D பிரிவுக்குச் செல்லுங்கள்.",
        "குழந்தையின் தடுப்பூசி அட்டை மற்றும் வளர்ச்சி விளக்கப்படம் கொண்டு வாருங்கள்.",
        "கடந்த 48 மணி நேர உணவு, காய்ச்சல், தூக்கம் குறிப்பிடவும்.",
      ],
    },
  },
  dermatology: {
    en: {
      faqs: [
        { q: "What does Dermatology treat?", a: "Skin, hair, and nail problems — rashes, acne, eczema, hair loss." },
        { q: "Should I stop my creams before the visit?", a: "Stop new creams 24 hours prior so the doctor can see the actual rash." },
      ],
      nextSteps: [
        "Go to the Dermatology OPD on Floor 3, Wing A.",
        "Take clear photos of the affected area in daylight.",
        "Bring a list of products applied recently.",
      ],
    },
    ta: {
      faqs: [
        { q: "Dermatology என்ன பார்க்கிறது?", a: "தோல், முடி, நகம் — தடிப்புகள், முகப்பரு, அரிப்பு, முடி உதிர்தல்." },
        { q: "க்ரீம் நிறுத்த வேண்டுமா?", a: "புதிய க்ரீம்களை 24 மணி நேரம் முன்னதாக நிறுத்தவும்." },
      ],
      nextSteps: [
        "Dermatology OPD — 3வது தளம், A பிரிவுக்குச் செல்லுங்கள்.",
        "பாதிக்கப்பட்ட பகுதியை பகல் வெளிச்சத்தில் புகைப்படம் எடுக்கவும்.",
        "சமீபத்தில் பயன்படுத்திய பொருட்களின் பட்டியலைக் கொண்டு வாருங்கள்.",
      ],
    },
  },
  neurology: {
    en: {
      faqs: [
        { q: "What does Neurology treat?", a: "Brain, spine, and nerve disorders — migraine, seizures, numbness, stroke recovery." },
        { q: "What tests might be needed?", a: "MRI, CT, EEG, or nerve conduction studies." },
      ],
      nextSteps: [
        "Go to the Neurology OPD on Floor 3, Wing B.",
        "Bring any prior brain scans (MRI/CT) on CD or print.",
        "Keep a headache / seizure diary for the last 2 weeks.",
        "If you have stroke signs (face droop, arm weakness, slurred speech), go to Emergency immediately.",
      ],
    },
    ta: {
      faqs: [
        { q: "Neurology என்ன பார்க்கிறது?", a: "மூளை, முதுகெலும்பு, நரம்பு — மைக்ரேன், வலிப்பு, மரத்துப்போதல், பக்கவாதம் மீட்பு." },
        { q: "என்ன பரிசோதனைகள்?", a: "MRI, CT, EEG, நரம்பு கடத்தல் ஆய்வு." },
      ],
      nextSteps: [
        "Neurology OPD — 3வது தளம், B பிரிவுக்குச் செல்லுங்கள்.",
        "முந்தைய மூளை ஸ்கேன்களை (MRI/CT) கொண்டு வாருங்கள்.",
        "கடந்த 2 வார தலைவலி / வலிப்பு குறிப்பேடு வைக்கவும்.",
        "பக்கவாத அறிகுறிகள் இருந்தால் உடனே Emergency-க்குச் செல்லுங்கள்.",
      ],
    },
  },
  gastroenterology: {
    en: {
      faqs: [
        { q: "What does Gastroenterology treat?", a: "Stomach, intestine, liver — acidity, ulcers, IBS, jaundice." },
        { q: "Do I need to fast?", a: "For endoscopy / ultrasound, fast 6–8 hours. Confirm at booking." },
      ],
      nextSteps: [
        "Go to the Gastro OPD on Floor 2, Wing A.",
        "Note food triggers and stool changes for the last week.",
        "Bring previous endoscopy or scan reports if any.",
      ],
    },
    ta: {
      faqs: [
        { q: "Gastroenterology என்ன பார்க்கிறது?", a: "வயிறு, குடல், கல்லீரல் — அமிலத்தன்மை, புண், IBS, மஞ்சள் காமாலை." },
        { q: "உணவு தவிர்க்க வேண்டுமா?", a: "எண்டோஸ்கோபி / அல்ட்ராசவுண்டுக்கு 6–8 மணி நேரம் உண்ணாமல் இருக்கவும்." },
      ],
      nextSteps: [
        "Gastro OPD — 2வது தளம், A பிரிவுக்குச் செல்லுங்கள்.",
        "கடந்த வாரத்தின் உணவு தூண்டுதல்கள், மலம் மாற்றங்களைக் குறிக்கவும்.",
        "முந்தைய எண்டோஸ்கோபி / ஸ்கேன் அறிக்கைகளைக் கொண்டு வாருங்கள்.",
      ],
    },
  },
  "obstetrics & gynecology": {
    en: {
      faqs: [
        { q: "What does OB-GYN cover?", a: "Pregnancy, menstrual issues, fertility, and women's health concerns." },
        { q: "Are appointments confidential?", a: "Yes. Private consultation rooms are used and records are confidential." },
      ],
      nextSteps: [
        "Go to the OB-GYN OPD on Floor 1, Wing C.",
        "Note last menstrual period and cycle length.",
        "Bring prior scan reports and pregnancy records if applicable.",
      ],
    },
    ta: {
      faqs: [
        { q: "OB-GYN என்ன பார்க்கிறது?", a: "கர்ப்பம், மாதவிடாய் பிரச்சினைகள், கருவுறுதல், பெண்கள் ஆரோக்கியம்." },
        { q: "ரகசியமாக இருக்குமா?", a: "ஆம். தனி ஆலோசனை அறைகள் மற்றும் ரகசிய பதிவுகள்." },
      ],
      nextSteps: [
        "OB-GYN OPD — 1வது தளம், C பிரிவுக்குச் செல்லுங்கள்.",
        "கடைசி மாதவிடாய் தேதி, சுழற்சி நீளம் குறிக்கவும்.",
        "முந்தைய ஸ்கேன் / கர்ப்ப பதிவுகளைக் கொண்டு வாருங்கள்.",
      ],
    },
  },
  emergency: {
    en: {
      faqs: [
        { q: "When is Emergency the right choice?", a: "Severe chest pain, stroke signs, heavy bleeding, breathing trouble, loss of consciousness, major injury." },
        { q: "Do I need to register first?", a: "No — go directly to triage. Registration happens after stabilization." },
      ],
      nextSteps: [
        "Go to the Emergency entrance at the Ground Floor — left wing.",
        "Do not drive yourself if symptoms are severe; call an ambulance.",
        "Bring an ID and list of medications if possible.",
        "Inform staff about allergies and existing conditions immediately.",
      ],
    },
    ta: {
      faqs: [
        { q: "Emergency எப்போது சரியான தேர்வு?", a: "கடுமையான மார்பு வலி, பக்கவாத அறிகுறி, அதிக இரத்தப்போக்கு, மூச்சுத்திணறல், மயக்கம், பெரும் காயம்." },
        { q: "முதலில் பதிவு செய்ய வேண்டுமா?", a: "வேண்டாம் — நேரடியாக triage-க்குச் செல்லுங்கள். பின்னர் பதிவு." },
      ],
      nextSteps: [
        "Emergency நுழைவாயில் — தரைத்தளம், இடது பிரிவு.",
        "கடுமையான அறிகுறிகள் இருந்தால் நீங்களே வாகனம் ஓட்ட வேண்டாம் — ஆம்புலன்ஸ் அழைக்கவும்.",
        "முடிந்தால் ID மற்றும் மருந்து பட்டியலைக் கொண்டு வாருங்கள்.",
        "ஒவ்வாமை / நோய்களை உடனே ஊழியர்களுக்குத் தெரிவிக்கவும்.",
      ],
    },
  },
};

const ALIASES: Record<string, string> = {
  "ob-gyn": "obstetrics & gynecology",
  "obgyn": "obstetrics & gynecology",
  "obstetrics and gynecology": "obstetrics & gynecology",
  "gynecology": "obstetrics & gynecology",
  "obstetrics": "obstetrics & gynecology",
  "gastro": "gastroenterology",
  "ear, nose and throat": "ent",
  "ear nose and throat": "ent",
};

// Tamil → English department keys.
const TA_KEYS: { match: RegExp; key: string }[] = [
  { match: /இதய/, key: "cardiology" },
  { match: /எலும்பு|மூட்டு/, key: "orthopedics" },
  { match: /காது|மூக்கு|தொண்டை/, key: "ent" },
  { match: /பொது\s*மருத்துவ/, key: "general medicine" },
  { match: /குழந்தை/, key: "pediatrics" },
  { match: /தோல்|சரும/, key: "dermatology" },
  { match: /நரம்பு|மூளை/, key: "neurology" },
  { match: /வயிறு|இரைப்பை|குடல்/, key: "gastroenterology" },
  { match: /மகப்பேறு|பெண்கள்|கர்ப்ப/, key: "obstetrics & gynecology" },
  { match: /அவசர/, key: "emergency" },
];

export function extractDepartment(text: string): string | null {
  if (!text) return null;
  // Try labelled patterns first.
  const labelRe = /(?:Suggested Department|பரிந்துரைக்கப்பட்ட\s*துறை)\s*[:：]\s*\**\s*([^\n*]+?)\s*\**\s*(?:\n|$)/i;
  const m = text.match(labelRe);
  let candidate = m?.[1]?.trim() ?? "";

  if (candidate) {
    const k = normalizeKey(candidate);
    if (k) return k;
  }

  // Fallback: scan for any known English department name in the text.
  const lower = text.toLowerCase();
  for (const key of Object.keys(DATA)) {
    if (lower.includes(key)) return key;
  }
  for (const [alias, key] of Object.entries(ALIASES)) {
    if (lower.includes(alias)) return key;
  }
  // Tamil heuristics.
  for (const { match, key } of TA_KEYS) {
    if (match.test(text)) return key;
  }
  return null;
}

function normalizeKey(raw: string): string | null {
  const cleaned = raw.toLowerCase().replace(/[.*_`]/g, "").trim();
  if (DATA[cleaned]) return cleaned;
  if (ALIASES[cleaned]) return ALIASES[cleaned];
  for (const key of Object.keys(DATA)) {
    if (cleaned.includes(key)) return key;
  }
  for (const [alias, key] of Object.entries(ALIASES)) {
    if (cleaned.includes(alias)) return key;
  }
  for (const { match, key } of TA_KEYS) {
    if (match.test(raw)) return key;
  }
  return null;
}

export function getDepartmentInfo(key: string, lang: Lang): DepartmentInfo | null {
  const entry = DATA[key];
  if (!entry) return null;
  return entry[lang];
}

export function getDepartmentLabel(key: string): string {
  return key.replace(/\b\w/g, (c) => c.toUpperCase());
}
