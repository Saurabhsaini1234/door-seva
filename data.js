/**
 * DoorSeva (doorseva.in) - Master Commercial Data Engine
 * Entity: Sachint Enterprises (GSTIN: 09IATPS9376A1ZR)
 * Fully Standardized: 100% Pure Dual-Language (English + Hindi)
 * Enhanced: All-India Dynamic Tiers, 100% Unique Cloud 3D Visuals & Final Survey Pricing
 */

const CITY_TIER_CONFIG = {
  TIERS: {
    tier_1: { name: "Tier 1: Metros (+40%)", multiplier: 1.40, zone: "Metro Rate (+40%)" },
    tier_2: { name: "Tier 2: Major Capitals (+30%)", multiplier: 1.30, zone: "City Rate (+30%)" },
    tier_3: { name: "Tier 3: District Centers (+20%)", multiplier: 1.20, zone: "District Rate (+20%)" },
    tier_4: { name: "Tier 4: Towns & Baseline", multiplier: 1.00, zone: "Standard Rate" }
  },
  LOGISTICS: {
    FREE_RADIUS_KM: 5.0,
    PER_KM_EXTRA_CHARGE: 20.0
  },
  FINANCIALS: {
    PARTNER_SHARE_PERCENT: 85.0,
    PARTNER_MAIN_WALLET_PERCENT: 80.0,
    PARTNER_HEALTH_EMERGENCY_PERCENT: 5.0,
    PLATFORM_COMMISSION_PERCENT: 15.0,
    GST_PERCENT_ON_COMMISSION: 18.0,
    ONLINE_DISCOUNT_PERCENT: 20.0
  }
};

function detectLocationTier(locationStr) {
  if (!locationStr) return { tierKey: "tier_4", ...CITY_TIER_CONFIG.TIERS.tier_4 };
  const lower = locationStr.toLowerCase();
  const pinMatch = lower.match(/\b\d{6}\b/);
  const pin = pinMatch ? pinMatch[0] : "";

  // Tier 1: Metros (+40%)
  const isMetroPin = pin && (
    pin.startsWith("110") || pin.startsWith("121") || pin.startsWith("122") ||
    pin.startsWith("201") || pin.startsWith("400") || pin.startsWith("411") ||
    pin.startsWith("560") || pin.startsWith("500") || pin.startsWith("600") ||
    pin.startsWith("700")
  );

  const isMetroKeyword = lower.includes("delhi") || lower.includes("mumbai") || lower.includes("bengaluru") ||
                         lower.includes("bangalore") || lower.includes("noida") || lower.includes("gurugram") ||
                         lower.includes("pune") || lower.includes("ghaziabad") || lower.includes("hyderabad") ||
                         lower.includes("chennai") || lower.includes("kolkata");

  if (isMetroPin || isMetroKeyword) return { tierKey: "tier_1", ...CITY_TIER_CONFIG.TIERS.tier_1 };

  // Tier 2: State Capitals & Major Commercial Hubs (+30%)
  const isTier2Pin = pin && (
    pin.startsWith("226") || pin.startsWith("248") || pin.startsWith("302") ||
    pin.startsWith("160") || pin.startsWith("208") || pin.startsWith("800") ||
    pin.startsWith("781") || pin.startsWith("462")
  );

  const isTier2Keyword = lower.includes("lucknow") || lower.includes("dehradun") || lower.includes("jaipur") ||
                         lower.includes("chandigarh") || lower.includes("kanpur") || lower.includes("patna") ||
                         lower.includes("guwahati") || lower.includes("agra") || lower.includes("bhopal") || lower.includes("indore");

  if (isTier2Pin || isTier2Keyword) return { tierKey: "tier_2", ...CITY_TIER_CONFIG.TIERS.tier_2 };

  // Tier 3: District Headquarter Centers (+20%)
  const isTier3Pin = pin && (
    pin.startsWith("246701") || pin.startsWith("244001") || pin.startsWith("25000") ||
    pin.startsWith("24300")  || pin.startsWith("20200")  || pin.startsWith("24700")
  );

  const isTier3Keyword = lower.includes("bijnor") || lower.includes("moradabad") || lower.includes("meerut") ||
                         lower.includes("bareilly") || lower.includes("aligarh") || lower.includes("saharanpur");

  const isLocalTown = lower.includes("nagina") || lower.includes("najibabad") || lower.includes("dhampur") || 
                      lower.includes("kiratpur") || lower.includes("chandpur") || pin === "246762" || pin === "246763";

  if ((isTier3Pin || isTier3Keyword) && !isLocalTown) return { tierKey: "tier_3", ...CITY_TIER_CONFIG.TIERS.tier_3 };

  // Tier 4: Towns, Tehsils & Rural Baseline (1.00x)
  return { tierKey: "tier_4", ...CITY_TIER_CONFIG.TIERS.tier_4 };
}

const HERO_SLIDES_CONFIG = [
  {
    catKey: "home_nursing",
    tag: { en: "VERIFIED CLINICAL", hi: "सत्यापित क्लीनिकल" },
    title: { en: "Clinical Home Nursing & Care", hi: "क्लीनिकल होम नर्सिंग व केयर" },
    sub: { en: "Certified Staff with Sterile Kits & Procedure Gear", hi: "स्टेराइल किट व प्रमाणित स्टाफ सीधे आपके घर पर" },
    bgGradient: "linear-gradient(135deg, #1E3A8A 0%, #0284C7 100%)",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    catKey: "home_maintenance",
    tag: { en: "DOORSTEP EXPERTS", hi: "डोरस्टेप एक्सपर्ट्स" },
    title: { en: "Electrician, Plumber & Carpenter", hi: "इलेक्ट्रीशियन, प्लंबर व बढ़ई" },
    sub: { en: "Doorstep Minor Fixes, Half-Day & Full-Day Shifts", hi: "घर पर त्वरित रिपेयर, हाफ-डे व फुल-डे शिफ्ट" },
    bgGradient: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
    img: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80"
  },
  {
    catKey: "home_appliances",
    tag: { en: "APPLIANCE REPAIR", hi: "अप्लायंस रिपेयर" },
    title: { en: "AC, Fridge & Washing Machine Repair", hi: "AC, फ्रिज व वाशिंग मशीन रिपेयर" },
    sub: { en: "Transparent Diagnostics & Same-Day Repair", hi: "सटीक जांच व उसी दिन संपूर्ण रिपेयर सेवा" },
    bgGradient: "linear-gradient(135deg, #4338CA 0%, #6366F1 100%)",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    catKey: "women_special",
    tag: { en: "100% FEMALE FLEET", hi: "100% महिला स्टाफ" },
    title: { en: "Women Salon, Beauty & Boutique", hi: "महिला सैलून, ब्यूटी व बुटीक" },
    sub: { en: "Certified Female Beauticians at Your Doorstep", hi: "सत्यापित महिला ब्यूटीशियन आपके घर पर" },
    bgGradient: "linear-gradient(135deg, #9D174D 0%, #DB2777 100%)",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
  }
];

// 5 Main Navigation Clusters
const MAIN_CLUSTERS_CONFIG = [
  {
    id: "ALL",
    title: { en: "All Services", hi: "सभी सेवाएं" },
    icon: "✨",
    categoryKeys: [
      "home_nursing", 
      "patient_care", 
      "home_physiotherapy",
      "women_special", 
      "mens_salon", 
      "home_maintenance", 
      "mason_labour", 
      "home_maid_cook",
      "home_appliances", 
      "home_tuition"
    ]
  },
  {
    id: "cluster_health",
    title: { en: "Health Services", hi: "हेल्थ सर्विसेज" },
    icon: "🩺",
    categoryKeys: [
      "home_nursing", 
      "patient_care", 
      "home_physiotherapy"
    ]
  },
  {
    id: "cluster_beauty",
    title: { en: "Beauty and Salon", hi: "ब्यूटी व सैलून" },
    icon: "💄",
    categoryKeys: [
      "women_special", 
      "mens_salon"
    ]
  },
  {
    id: "cluster_maintenance",
    title: { en: "Home Maintenance", hi: "होम मेंटेनेंस" },
    icon: "🔧",
    categoryKeys: [
      "home_maintenance", 
      "mason_labour"
    ]
  },
  {
    id: "cluster_maid_cook",
    title: { en: "Home Cook and Maid", hi: "होम कुक व मेड" },
    icon: "🍳",
    categoryKeys: [
      "home_maid_cook"
    ]
  }
];

const MASTER_CATALOG_DATA = {
  // 1. CLINICAL HOME NURSING
  home_nursing: {
    id: "home_nursing",
    title: { en: "Clinical Home Nursing", hi: "डॉक्टर-प्रिस्क्राइब्ड होम नर्सिंग" },
    badge: { en: "CLINICAL", hi: "क्लीनिकल" },
    rating: "4.9",
    reviews: "1.8k",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    requiresPrescription: true,
    subCategories: {
      nursing_injections: {
        title: { en: "IM / IV Injections", hi: "आईएम / आईवी इंजेक्शन" },
        badge: { en: "INJECTIONS", hi: "इंजेक्शन" },
        rating: "4.9",
        reviews: "950+",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
        basePrice: 249,
        quantityType: "none",
        requiresPrescription: true,
        keywords: [
          "injection", "im injection", "iv injection", "drip", "bottle", "glucose", "saline", "injecsan", 
          "injaction", "teeka", "suie", "sui", "nurse", "compounder", "ghr pr injection", "antibiotic", 
          "intravenous", "intramuscular", "cannula", "vein", "drip lagana", "iv drip at home", "clinic"
        ],
        options: [
          { id: "n_inj_1", title: { en: "Single IM / IV Injection Visit", hi: "सिंगल IM / IV इंजेक्शन विजिट" }, basePrice: 249, planType: "ONE_TIME" },
          { id: "n_inj_bd", title: { en: "Morning + Evening Injections (Twice Daily)", hi: "सुबह + शाम इंजेक्शन (दिन में 2 बार)" }, basePrice: 389, planType: "DAILY_TWICE" },
          { id: "n_inj_5d", title: { en: "5-Day Antibiotic Course Pack", hi: "5-दिन एंटीबायोटिक कोर्स पैक" }, basePrice: 1439, planType: "COURSE" },
          { id: "n_inj_month", title: { en: "30-Day Monthly Regular Pass", hi: "30-दिन मासिक रेगुलर पास" }, basePrice: 3149, planType: "MONTHLY" }
        ]
      },
      nursing_dressing: {
        title: { en: "Sterile Wound Dressing", hi: "घाव व टांके स्टेराइल ड्रेसिंग" },
        badge: { en: "DRESSING", hi: "ड्रेसिंग" },
        rating: "4.8",
        reviews: "620+",
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80",
        basePrice: 269,
        quantityType: "none",
        requiresPrescription: true,
        keywords: [
          "dressing", "wound", "ghav", "ghao", "tanke", "stitches", "bandage", "patti", "dresing", 
          "sterile dressing", "burn wound", "diabetic foot", "bed sore", "surgical dressing", "patti bandhna"
        ],
        options: [
          { id: "n_dr_1", title: { en: "Sterile Wound Dressing Visit", hi: "घाव व टांकों की स्टेराइल ड्रेसिंग विजिट" }, basePrice: 269, planType: "ONE_TIME" },
          { id: "n_dr_week", title: { en: "7-Day Weekly Pack (3 Visits)", hi: "7-दिन वीकली पैक (सप्ताह में 3 विजिट्स)" }, basePrice: 759, planType: "WEEKLY" },
          { id: "n_dr_alt_m", title: { en: "30-Day Alternate Dressing Pass (15 Visits)", hi: "30-दिन अल्टरनेट ड्रेसिंग पास (15 विजिट्स)" }, basePrice: 3599, planType: "MONTHLY" },
          { id: "n_dr_reg_m", title: { en: "30-Day Regular Dressing Pass (20 Visits)", hi: "30-दिन रेगुलर ड्रेसिंग पास (20 विजिट्स)" }, basePrice: 4679, planType: "MONTHLY" }
        ]
      },
      nursing_suction_tubes: {
        title: { en: "Suction & Catheter Care", hi: "सक्शन, कैथेटर व ट्यूब केयर" },
        badge: { en: "PROCEDURE", hi: "प्रोसीजर" },
        rating: "4.9",
        reviews: "410+",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        basePrice: 269,
        quantityType: "none",
        requiresPrescription: true,
        keywords: [
          "suction", "catheter", "urine pipe", "peshab ki nali", "ryles tube", "rt tube", "feeding pipe", 
          "phlegm", "balgam", "mucus", "suction machine", "catheter change", "tracheostomy"
        ],
        options: [
          { id: "n_st_suc_1", title: { en: "Single Mucus Suction Visit", hi: "सिंगल म्यूकस सक्शन विजिट" }, basePrice: 269, planType: "ONE_TIME" },
          { id: "n_st_suc_bd", title: { en: "Twice Daily Suction (Morning + Evening)", hi: "ट्वाइस डेली सक्शन (दिन में 2 बार)" }, basePrice: 489, planType: "DAILY_TWICE" },
          { id: "n_st_suc_month", title: { en: "30-Day Monthly Suction Pass", hi: "30-दिन मासिक सक्शन पास" }, basePrice: 4949, planType: "MONTHLY" },
          { id: "n_st_cath", title: { en: "Urinary Catheter Replacement (Sterile Kit)", hi: "यूरिनरी कैथेटर बदलना (स्टेराइल किट सहित)" }, basePrice: 449, planType: "ONE_TIME" },
          { id: "n_st_rt", title: { en: "Ryles Tube (RT Feeding Pipe Insertion)", hi: "राइल्स ट्यूब (RT फीडिंग पाइप डालना)" }, basePrice: 449, planType: "ONE_TIME" }
        ]
      },
      nursing_all_in_one: {
        title: { en: "Complete Nursing Pass", hi: "सम्पूर्ण नर्सिंग केयर पास" },
        badge: { en: "NURSING PASS", hi: "नर्सिंग पास" },
        rating: "5.0",
        reviews: "320+",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
        basePrice: 399,
        quantityType: "none",
        requiresPrescription: true,
        keywords: [
          "complete nursing", "full nursing", "vip nurse", "sister", "staff nurse", "icu nurse", 
          "bp check", "sugar check", "vitals", "oxygen check", "hospital at home"
        ],
        options: [
          { id: "n_aio_1", title: { en: "1-Day Complete Nursing (Twice Daily Visit)", hi: "1-दिन सम्पूर्ण नर्सिंग (सुबह + शाम विजिट)" }, basePrice: 399, planType: "ONE_TIME" },
          { id: "n_aio_7d", title: { en: "7-Days Complete Nursing Pass (Twice Daily)", hi: "7-दिन सम्पूर्ण नर्सिंग पास (प्रतिदिन 2 विजिट्स)" }, basePrice: 2249, planType: "WEEKLY" },
          { id: "n_aio_month", title: { en: "30-Days Regular Procedure Pass (Daily Visit)", hi: "30-दिन नियमित नर्सिंग पास (दैनिक प्रोसीजर विजिट)" }, basePrice: 6749, planType: "MONTHLY" },
          { id: "n_aio_8h_m", title: { en: "30-Days 8-Hours Day Duty (Home Stay Care)", hi: "30-दिन 8-घंटे डे ड्यूटी (घर पर रहकर केयर)" }, basePrice: 9499, planType: "MONTHLY" },
          { id: "n_aio_24h_m", title: { en: "30-Days 24-Hours Live-in Duty (Food by User)", hi: "30-दिन 24-घंटे लाइव-इन ड्यूटी (भोजन ग्राहक का)" }, basePrice: 16999, planType: "MONTHLY" }
        ]
      }
    }
  },

  // 2. PATIENT & ELDER CARE
  patient_care: {
    id: "patient_care",
    title: { en: "Elder & Bedside Care", hi: "पेशेंट व एल्डर केयर अटेंडेंट" },
    badge: { en: "ATTENDANT", hi: "अटेंडेंट" },
    rating: "4.8",
    reviews: "1.4k",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      normal_patient: {
        title: { en: "Normal Elder Routine Care", hi: "नॉर्मल एल्डर केयर विजिट" },
        badge: { en: "ELDER CARE", hi: "एल्डर केयर" },
        rating: "4.8",
        reviews: "820+",
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
        basePrice: 249,
        quantityType: "none",
        keywords: ["elder care", "bujurg", "dadaji", "nanaji", "old age care", "patient attendant", "caregiver", "sahayak", "senior citizen"],
        options: [
          { id: "pc_norm_half", title: { en: "1-2 Hrs Quick Care Visit", hi: "1-2 घंटे त्वरित केयर विजिट" }, basePrice: 249, planType: "ONE_TIME" },
          { id: "pc_norm_twins", title: { en: "Twice Daily Visit (Morning + Evening)", hi: "दिन में 2 बार केयर विजिट (सुबह + शाम)" }, basePrice: 359, planType: "DAILY_TWICE" },
          { id: "pc_norm_8h", title: { en: "8-Hour Day Shift Duty (Single Day)", hi: "8-घंटे डे शिफ्ट ड्यूटी (सिंगल डे)" }, basePrice: 399, planType: "ONE_TIME" },
          { id: "pc_norm_8h_w", title: { en: "8-Hour Weekly Pass (7 Days)", hi: "8-घंटे वीकली सब्सक्रिप्शन (7 दिन)" }, basePrice: 2599, planType: "WEEKLY" },
          { id: "pc_norm_8h_m", title: { en: "8-Hour Monthly Pass (30 Days)", hi: "8-घंटे मासिक पास (30 दिन)" }, basePrice: 8999, planType: "MONTHLY" },
          { id: "pc_norm_12h_m", title: { en: "12-Hour Monthly Pass (30 Days)", hi: "12-घंटे मासिक पास (30 दिन)" }, basePrice: 10799, planType: "MONTHLY" },
          { id: "pc_norm_24h_m", title: { en: "24-Hour Live-in Pass (30 Days, Food by User)", hi: "24-घंटे लाइव-इन मासिक पास (भोजन ग्राहक का)" }, basePrice: 17999, planType: "MONTHLY" }
        ]
      },
      bedside_patient: {
        title: { en: "Bedside Patient Care", hi: "बेडसाइड पेशेंट केयर" },
        badge: { en: "BEDSIDE", hi: "बेडसाइड" },
        rating: "4.9",
        reviews: "610+",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80",
        basePrice: 269,
        quantityType: "none",
        keywords: ["bedside", "bedridden", "diaper change", "sponge bath", "bed patient", "nahlana", "poshana", "paralysis care"],
        options: [
          { id: "pc_bed_half", title: { en: "Sponge & Diaper Visit (1-2 Hrs)", hi: "स्पंज बाथ व डायपर चेंज विजिट (1-2 घंटे)" }, basePrice: 269, planType: "ONE_TIME" },
          { id: "pc_bed_twins", title: { en: "Twice Daily Bedside Visit", hi: "दिन में 2 बार बेडसाइड विजिट (सुबह + शाम)" }, basePrice: 449, planType: "DAILY_TWICE" },
          { id: "pc_bed_8h", title: { en: "8-Hour Bedside Care Shift", hi: "8-घंटे बेडसाइड केयर ड्यूटी" }, basePrice: 449, planType: "ONE_TIME" },
          { id: "pc_bed_8h_m", title: { en: "8-Hour Monthly Bedside Pass (30 Days)", hi: "8-घंटे मासिक बेडसाइड पास (30 दिन)" }, basePrice: 9899, planType: "MONTHLY" },
          { id: "pc_bed_12h_m", title: { en: "12-Hour Monthly Bedside Pass (30 Days)", hi: "12-घंटे मासिक बेडसाइड पास (30 दिन)" }, basePrice: 11699, planType: "MONTHLY" },
          { id: "pc_bed_24h_m", title: { en: "24-Hour Live-in Pass (30 Days, Food by User)", hi: "24-घंटे लाइव-इन मासिक पास (भोजन ग्राहक का)" }, basePrice: 19799, planType: "MONTHLY" }
        ]
      },
      mother_baby: {
        title: { en: "Mother & Baby Japa Care", hi: "मदर व न्यूबॉर्न जापा केयर" },
        badge: { en: "BABY CARE", hi: "बेबी केयर" },
        rating: "4.9",
        reviews: "480+",
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80",
        basePrice: 349,
        quantityType: "none",
        keywords: ["japa", "japa maid", "newborn baby", "chota baccha", "baby massage", "bachhe ki malish", "mummy ki malish", "nanny", "dai"],
        options: [
          { id: "pc_mb_2h", title: { en: "Infant Massage & Bath (1-2 Hrs)", hi: "शिशु मालिश व स्नान विजिट (1-2 घंटे)" }, basePrice: 349, planType: "ONE_TIME" },
          { id: "pc_mb_8h", title: { en: "8-Hour Day Care Shift (1 Day)", hi: "8-घंटे मदर-बेबी डे केयर (1 दिन)" }, basePrice: 599, planType: "ONE_TIME" },
          { id: "pc_mb_7d_8h", title: { en: "7-Days Pass (8 Hours Daily Shift)", hi: "7-दिन वीकली पास (प्रतिदिन 8 घंटे ड्यूटी)" }, basePrice: 3999, planType: "WEEKLY" },
          { id: "pc_mb_12h_30d", title: { en: "12-Hour 30 Days Monthly Pass", hi: "12-घंटे 30-दिन मासिक पास (मदर-बेबी केयर)" }, basePrice: 13999, planType: "MONTHLY" },
          { id: "pc_mb_24h_30d", title: { en: "24-Hour 30 Days Live-in Pass (Food by User)", hi: "24-घंटे 30-दिन लाइव-इन जापा पास (भोजन ग्राहक का)" }, basePrice: 16499, planType: "MONTHLY" }
        ]
      }
    }
  },

  // 3. HOME MAINTENANCE
  home_maintenance: {
    id: "home_maintenance",
    title: { en: "Electrician, Plumber & Carpentry", hi: "इलेक्ट्रीशियन, प्लंबर व बढ़ई" },
    badge: { en: "TRADES", hi: "मेंटेनेंस" },
    rating: "4.8",
    reviews: "3.2k",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      elec_trade: {
        title: { en: "Electrician Repair & Fix", hi: "इलेक्ट्रीशियन सेवाएँ" },
        badge: { en: "ELECTRICIAN", hi: "इलेक्ट्रीशियन" },
        rating: "4.8",
        reviews: "1.4k+",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
        basePrice: 249,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["electrician", "bijli", "wiring", "fan", "pankha", "switch", "socket", "mcb", "fuse", "inverter", "light", "cooler"],
        options: [
          { id: "hm_el_half", title: { en: "1-2 Hrs Quick Fix / Inspection", hi: "1-2 घंटे त्वरित कार्य / फॉल्ट चेक" }, basePrice: 249, planType: "ONE_TIME" },
          { id: "hm_el_hd", title: { en: "Half-Day Duty (4-5 Hrs)", hi: "4-5 घंटे हाफ डे ड्यूटी" }, basePrice: 449, planType: "HALF_DAY" },
          { id: "hm_el_fd", title: { en: "Full-Day Duty (8 Hrs)", hi: "8 घंटे फुल डे ड्यूटी" }, basePrice: 749, planType: "FULL_DAY" }
        ]
      },
      plumb_trade: {
        title: { en: "Plumber Pipe & Tap Repair", hi: "प्लंबर सेवाएँ" },
        badge: { en: "PLUMBER", hi: "प्लंबर" },
        rating: "4.7",
        reviews: "980+",
        image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
        basePrice: 249,
  
