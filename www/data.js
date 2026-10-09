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
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["plumber", "nal", "pipe", "leakage", "water leak", "tap", "toti", "tanki", "flush", "commode", "submersible"],
        options: [
          { id: "hm_pl_half", title: { en: "1-2 Hrs Quick Leak Fix", hi: "1-2 घंटे त्वरित लीकेज चेक व रिपेयर" }, basePrice: 249, planType: "ONE_TIME" },
          { id: "hm_pl_hd", title: { en: "Half-Day Plumbing (4-5 Hrs)", hi: "4-5 घंटे हाफ डे प्लंबिंग" }, basePrice: 449, planType: "HALF_DAY" },
          { id: "hm_pl_fd", title: { en: "Full-Day Plumbing Work (8 Hrs)", hi: "8 घंटे फुल डे प्लंबिंग कार्य" }, basePrice: 749, planType: "FULL_DAY" }
        ]
      },
      carp_trade: {
        title: { en: "Carpenter Woodwork & Locks", hi: "कारपेंटर - बढ़ई कार्य" },
        badge: { en: "CARPENTER", hi: "कारपेंटर" },
        rating: "4.8",
        reviews: "720+",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80",
        basePrice: 249,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["carpenter", "woodwork", "badhai", "furniture", "door", "darwaza", "lock", "tala", "bed", "almari", "plywood"],
        options: [
          { id: "hm_cp_half", title: { en: "1-2 Hrs Quick Lock / Hinge Fix", hi: "1-2 घंटे त्वरित लॉक / कब्जा रिपेयर" }, basePrice: 249, planType: "ONE_TIME" },
          { id: "hm_cp_hd", title: { en: "Half-Day Carpentry (4-5 Hrs)", hi: "4-5 घंटे हाफ डे बढ़ईगीरी" }, basePrice: 499, planType: "HALF_DAY" },
          { id: "hm_cp_fd", title: { en: "Full-Day Woodwork Duty (8 Hrs)", hi: "8 घंटे फुल डे वुडवर्क ड्यूटी" }, basePrice: 849, planType: "FULL_DAY" }
        ]
      },
      paint_trade: {
        title: { en: "Painter Services", hi: "पेंटर सेवाएँ" },
        badge: { en: "PAINTER", hi: "पेंटर" },
        rating: "4.8",
        reviews: "540+",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
        basePrice: 249,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["painter", "wall paint", "putty", "pop", "distemper", "whitewash", "safedi", "asian paints", "house painting"],
        options: [
          { id: "hm_pt_half", title: { en: "1-2 Hrs Inspection / Touch-up", hi: "1-2 घंटे टचअप / साइट मुआयना" }, basePrice: 249, planType: "ONE_TIME" },
          { id: "hm_pt_hd", title: { en: "Half-Day Painting Duty (4-5 Hrs)", hi: "4-5 घंटे हाफ डे पेंटिंग ड्यूटी" }, basePrice: 499, planType: "HALF_DAY" },
          { id: "hm_pt_fd", title: { en: "Full-Day Painting Duty (8 Hrs)", hi: "8 घंटे फुल डे पेंटिंग कार्य" }, basePrice: 799, planType: "FULL_DAY" }
        ]
      }
    }
  },

  // 4. APPLIANCE REPAIR
  home_appliances: {
    id: "home_appliances",
    title: { en: "Appliance Repair & Service", hi: "AC, फ्रिज व होम अप्लायंसेज" },
    badge: { en: "APPLIANCE", hi: "अप्लायंस" },
    rating: "4.8",
    reviews: "2.1k",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      ac_serv: {
        title: { en: "AC Repair & Jet Servicing", hi: "AC सर्विस व फॉल्ट रिपेयर" },
        badge: { en: "AC", hi: "AC" },
        rating: "4.9",
        reviews: "1.1k+",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
        basePrice: 449,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["ac", "air conditioner", "ac service", "jet service", "gas charge", "cooling", "ac repair", "split ac", "window ac"],
        options: [{ id: "ap_ac_chk", title: { en: "AC Checkup & Jet Servicing", hi: "AC चेकअप व जेट सर्विसिंग" }, basePrice: 449, planType: "ONE_TIME" }]
      },
      wm_serv: {
        title: { en: "Washing Machine Diagnostics", hi: "वाशिंग मशीन रिपेयर" },
        badge: { en: "WASHER", hi: "वाशिंग मशीन" },
        rating: "4.8",
        reviews: "690+",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
        basePrice: 349,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["washing machine", "washer", "dryer", "drum repair", "kapde dhone ki machine", "semi automatic", "fully automatic"],
        options: [{ id: "ap_wm_chk", title: { en: "Washing Machine Inspection", hi: "ड्रम, मोटर व स्पिनिंग फॉल्ट विजिट" }, basePrice: 349, planType: "ONE_TIME" }]
      },
      fridge_serv: {
        title: { en: "Refrigerator Cooling Repair", hi: "रेफ्रिजरेटर - फ्रिज रिपेयर" },
        badge: { en: "FRIDGE", hi: "फ्रिज" },
        rating: "4.7",
        reviews: "730+",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80",
        basePrice: 349,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["fridge", "refrigerator", "deep freezer", "cooling problem", "fridge gas", "thanda nahi kar raha"],
        options: [{ id: "ap_fr_chk", title: { en: "Fridge Diagnostics Visit", hi: "कूलिंग, गैस व रिले फॉल्ट विजिट" }, basePrice: 349, planType: "ONE_TIME" }]
      },
      ro_geyser_serv: {
        title: { en: "RO Purifier & Geyser Fix", hi: "RO प्यूरीफायर व गीजर रिपेयर" },
        badge: { en: "RO/GEYSER", hi: "RO/गीजर" },
        rating: "4.8",
        reviews: "560+",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
        basePrice: 349,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["ro", "water purifier", "aquaguard", "filter change", "geyser", "water heater", "pani garam"],
        options: [{ id: "ap_ro_chk", title: { en: "RO / Geyser Fault Visit", hi: "RO TDS चेक व वाटर हीटर फॉल्ट" }, basePrice: 349, planType: "ONE_TIME" }]
      },
      induction_serv: {
        title: { en: "Induction Cooktop Repair", hi: "इंडक्शन चूल्हा रिपेयर व फॉल्ट चेक" },
        badge: { en: "INDUCTION", hi: "इंडक्शन" },
        rating: "4.8",
        reviews: "420+",
        image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=600&q=80",
        basePrice: 299,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["induction", "chulha", "electric chulha", "induction cooktop", "prestige induction", "heating error"],
        options: [
          { id: "ap_ind_chk", title: { en: "Induction Diagnostic & Minor Fix", hi: "इंडक्शन जांच व माइनर रिपेयर" }, basePrice: 299, planType: "ONE_TIME" },
          { id: "ap_ind_full", title: { en: "Complete Induction Motherboard Repair", hi: "इंडक्शन मदरबोर्ड व कॉइल रिपेयर" }, basePrice: 499, planType: "ONE_TIME" }
        ]
      },
      microwave_serv: {
        title: { en: "Microwave Oven Repair", hi: "माइक्रोवेव ओवन रिपेयर (हीटिंग व फॉल्ट)" },
        badge: { en: "MICROWAVE", hi: "माइक्रोवेव" },
        rating: "4.8",
        reviews: "350+",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80",
        basePrice: 349,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["microwave", "oven", "otg", "microwave repair", "magnetron", "sparking", "food not heating"],
        options: [
          { id: "ap_mw_chk", title: { en: "Microwave Inspection & Fault Visit", hi: "माइक्रोवेव हीटिंग व मैग्नेट्रॉन जांच" }, basePrice: 349, planType: "ONE_TIME" },
          { id: "ap_mw_deep", title: { en: "Microwave Sparking / PCB Repair", hi: "स्पार्किंग, प्लेट मोटर व PCB बोर्ड रिपेयर" }, basePrice: 499, planType: "ONE_TIME" }
        ]
      },
      mixer_serv: {
        title: { en: "Mixer, Grinder & Juicer Fix", hi: "मिक्सर, ग्राइंडर व जूसर रिपेयर" },
        badge: { en: "MIXER", hi: "मिक्सर" },
        rating: "4.7",
        reviews: "290+",
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80",
        basePrice: 249,
        quantityType: "none",
        requiresPhoto: true,
        keywords: ["mixer", "grinder", "mixi", "juicer", "jar", "coupler", "blade", "motor jam"],
        options: [
          { id: "ap_mx_chk", title: { en: "Mixer Coupling & Blade Fix", hi: "कपलर, ब्लेड व स्विच रिपेयर विजिट" }, basePrice: 249, planType: "ONE_TIME" },
          { id: "ap_mx_motor", title: { en: "Mixer Motor Winding & Reset", hi: "मोटर वाइंडिंग, कार्बन व ओवरलोड रिपेयर" }, basePrice: 399, planType: "ONE_TIME" }
        ]
      }
    }
  },

  // 5. WOMEN SPECIAL
  women_special: {
    id: "women_special",
    title: { en: "Women Salon, Beauty & Boutique", hi: "महिला सैलून, ब्यूटी व बुटीक" },
    badge: { en: "100% FEMALE", hi: "100% महिला" },
    rating: "4.9",
    reviews: "3.4k",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      hair_care: {
        title: { en: "Hair Care, Spa & Colour", hi: "हेयर कट, स्पा व कलर" },
        badge: { en: "HAIR", hi: "हेयर" },
        rating: "4.9",
        reviews: "1.4k+",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        basePrice: 199,
        quantityType: "none",
        keywords: ["haircut", "ladies haircut", "hair spa", "hair colour", "step cut", "layer cut", "straight cut", "beauty parlour at home"],
        options: [
          { id: "ws_hc_1", title: { en: "Simple Hair Cut (Straight / U / V)", hi: "सिंपल हेयर कट (Straight / U / V Cut)" }, basePrice: 199, planType: "ONE_TIME" },
          { id: "ws_hc_2", title: { en: "Advance Hair Cut (Layer/Step/Feather)", hi: "एडवांस हेयर कट (Layer / Step / Feather)" }, basePrice: 349, planType: "ONE_TIME" },
          { id: "ws_hc_3", title: { en: "Hair Spa (Deep Conditioning/Basic)", hi: "हेयर स्पा (डीप कंडीशनिंग / Basic)" }, basePrice: 549, planType: "ONE_TIME" },
          { id: "ws_hc_4", title: { en: "L'Oreal Professional Hair Spa", hi: "लोरियल प्रोफेशनल हेयर स्पा" }, basePrice: 749, planType: "ONE_TIME" },
          { id: "ws_hc_5", title: { en: "Hair Mehndi Application (Customer Pack)", hi: "हेयर मेहंदी एप्लीकेशन (कस्टमर की मेहंदी)" }, basePrice: 249, planType: "ONE_TIME" },
          { id: "ws_hc_6", title: { en: "Hair Colour / Root Touch-up", hi: "हेयर कलर / रूट टच-अप" }, basePrice: 349, planType: "ONE_TIME" },
          { id: "ws_hc_7", title: { en: "Hair Styling / Blow Dry / Curls", hi: "हेयर स्टाइलिंग / ब्लो ड्राई / कर्ल्स" }, basePrice: 349, planType: "ONE_TIME" }
        ]
      },
      salon_care: {
        title: { en: "Waxing, Clean-up & Facial", hi: "वैक्सिंग, क्लीनअप व फेशियल" },
        badge: { en: "BEAUTY", hi: "ब्यूटी" },
        rating: "4.9",
        reviews: "1.8k+",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
        basePrice: 349,
        quantityType: "none",
        keywords: ["facial", "waxing", "wax", "honey wax", "rica wax", "cleanup", "bleach", "dtan", "gold facial", "o3 facial"],
        options: [
          { id: "ws_fc_1", title: { en: "Simple / Fruit Clean-up", hi: "सिंपल / फ्रूट क्लीन-अप" }, basePrice: 349, planType: "ONE_TIME" },
          { id: "ws_fc_2", title: { en: "Herbal / Fruit Facial", hi: "हर्बल / फ्रूट फेशियल" }, basePrice: 599, planType: "ONE_TIME" },
          { id: "ws_fc_3", title: { en: "Gold / Pearl Facial", hi: "गोल्ड / पर्ल फेशियल" }, basePrice: 849, planType: "ONE_TIME" },
          { id: "ws_fc_4", title: { en: "Diamond / Anti-Tan Facial", hi: "डायमंड / एंटी-टैन फेशियल" }, basePrice: 1199, planType: "ONE_TIME" },
          { id: "ws_fc_5", title: { en: "O3+ Bridal Glow Facial", hi: "O3+ ब्राइडल ग्लो फेशियल" }, basePrice: 1499, planType: "ONE_TIME" },
          { id: "ws_fc_6", title: { en: "Face D-Tan Pack (D-Tan)", hi: "फेस डी-टैन पैक (D-Tan)" }, basePrice: 299, planType: "ONE_TIME" },
          { id: "ws_fc_7", title: { en: "Face Bleach (Gold / Oxy)", hi: "फेस ब्लीच (Gold / Oxy)" }, basePrice: 220, planType: "ONE_TIME" },
          { id: "ws_wx_8", title: { en: "Full Arms + Full Legs Honey Wax", hi: "फुल आर्म्स + फुल लेग्स वैक्स (हनी वैक्स)" }, basePrice: 449, planType: "ONE_TIME" },
          { id: "ws_wx_9", title: { en: "Underarms Wax (Honey Wax)", hi: "अंडरआर्म्स वैक्स (हनी वैक्स)" }, basePrice: 89, planType: "ONE_TIME" },
          { id: "ws_wx_10", title: { en: "Full Body Wax (Normal)", hi: "फुल बॉडी वैक्स (नॉर्मल वैक्स)" }, basePrice: 1099, planType: "ONE_TIME" },
          { id: "ws_wx_11", title: { en: "Rica Wax (Full Arms + Legs)", hi: "रिका वैक्स (फुल आर्म्स + फुल लेग्स)" }, basePrice: 849, planType: "ONE_TIME" },
          { id: "ws_wx_12", title: { en: "Rica Underarms Wax", hi: "रिका अंडरआर्म्स वैक्स" }, basePrice: 130, planType: "ONE_TIME" }
        ]
      },
      nail_care: {
        title: { en: "Nail Art & Nail Care", hi: "नेल आर्ट व मैनीक्योर-पेडीक्योर" },
        badge: { en: "NAIL ART", hi: "नेल आर्ट" },
        rating: "4.8",
        reviews: "680+",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80",
        basePrice: 220,
        quantityType: "none",
        keywords: ["nail art", "manicure", "pedicure", "gel polish", "press on nails", "nail paint"],
        options: [
          { id: "ws_nl_1", title: { en: "Basic Nail Paint + Glitter / Simple Art", hi: "बेसिक नेल पेंट + ग्लिटर / सिंपल नेल आर्ट" }, basePrice: 220, planType: "ONE_TIME" },
          { id: "ws_nl_2", title: { en: "Gel Polish (Long Lasting)", hi: "जेल पॉलिश (लॉन्ग लास्टिंग)" }, basePrice: 549, planType: "ONE_TIME" },
          { id: "ws_nl_3", title: { en: "Trendy Nail Art (Stones / Chrome)", hi: "ट्रेंडी नेल आर्ट (Stones / Chrome / French)" }, basePrice: 499, planType: "ONE_TIME" },
          { id: "ws_nl_4", title: { en: "Press-on Nails (Fitting + Art)", hi: "प्रेस-ऑन नेल्स (फिटिंग + आर्ट)" }, basePrice: 649, planType: "ONE_TIME" },
          { id: "ws_nl_5", title: { en: "Deluxe Manicure + Pedicure Combo", hi: "डीलक्स मैनिक्योर + पेडीक्योर कॉम्बो" }, basePrice: 649, planType: "ONE_TIME" }
        ]
      },
      mehndi_care: {
        title: { en: "Mehndi Design Specialist", hi: "मेहंदी आर्टिस्ट व डिजाइन" },
        badge: { en: "MEHNDI", hi: "मेहंदी" },
        rating: "4.9",
        reviews: "1.1k+",
        image: "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?auto=format&fit=crop&w=600&q=80",
        basePrice: 149,
        quantityType: "none",
        keywords: ["mehndi", "mehendi", "bridal mehndi", "arabic mehndi", "party mehndi", "dulhan mehndi"],
        options: [
          { id: "ws_mh_1", title: { en: "Simple Arabic Bail (One Hand)", hi: "सिंपल अरेबिक बेल (एक हाथ, एक साइड)" }, basePrice: 149, planType: "ONE_TIME" },
          { id: "ws_mh_2", title: { en: "Arabic Mehndi (Both Hands Palm)", hi: "अरेबिक मेहंदी (दोनों हाथ, हथेली तक)" }, basePrice: 329, planType: "ONE_TIME" },
          { id: "ws_mh_3", title: { en: "Party Mehndi Design (Both Hands Wrist)", hi: "पार्टी मेहंदी डिजाइन (दोनों हाथ, कलाई तक)" }, basePrice: 649, planType: "ONE_TIME" },
          { id: "ws_mh_4", title: { en: "Festive Special (Both Hands to Elbow)", hi: "फेस्टिव स्पेशल (दोनों हाथ, कोहनी तक)" }, basePrice: 1099, planType: "ONE_TIME" },
          { id: "ws_mh_6", title: { en: "Bridal Mehndi (Full Bridal Hands & Feet)", hi: "ब्राइडल मेहंदी (पूरी दुल्हन मेहंदी - हाथ और पैर)" }, basePrice: 3899, planType: "ONE_TIME" }
        ]
      },
      makeup_care: {
        title: { en: "Makeup & Bridal Dressing", hi: "मेकअप व ब्राइडल ड्रेसिंग" },
        badge: { en: "MAKEUP", hi: "मेकअप" },
        rating: "4.9",
        reviews: "820+",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
        basePrice: 1299,
        quantityType: "none",
        keywords: ["makeup", "bridal makeup", "party makeup", "hd makeup", "saree draping", "threading"],
        options: [
          { id: "ws_mu_1", title: { en: "Simple Party Makeup (Hairstyle + Bindi)", hi: "सिंपल पार्टी मेकअप (हेयर स्टाइल + बिंदी सहित)" }, basePrice: 1299, planType: "ONE_TIME" },
          { id: "ws_mu_2", title: { en: "HD Party Makeup (Hairstyle + Draping)", hi: "एचडी (HD) पार्टी मेकअप (हेयर स्टाइल + ड्रेपिंग)" }, basePrice: 1799, planType: "ONE_TIME" },
          { id: "ws_mu_4", title: { en: "Bridal Makeup (Dress + Jewelry Setting)", hi: "ब्राइडल मेकअप (शादी का जोड़ा + ज्वेलरी सेटिंग)" }, basePrice: 6499, planType: "ONE_TIME" },
          { id: "ws_mu_5", title: { en: "Saree / Chunri Draping (Individual)", hi: "साड़ी / चुनरी ड्रेपिंग (अलग से)" }, basePrice: 220, planType: "ONE_TIME" },
          { id: "ws_mu_6", title: { en: "Threading (Eyebrow + Upper Lip with Service)", hi: "थ्रेडिंग (आईब्रो + अपर लिप - अन्य सर्विस के साथ)" }, basePrice: 40, planType: "ONE_TIME" }
        ]
      },
      boutique_care: {
        title: { en: "Home Tailoring & Fitting", hi: "होम टेलरिंग व बुटीक नाप" },
        badge: { en: "TAILORING", hi: "टेलरिंग" },
        rating: "4.8",
        reviews: "950+",
        image: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=600&q=80",
        basePrice: 349,
        quantityType: "none",
        keywords: ["tailor", "darzi", "boutique", "suit silai", "blouse", "salwar", "plazo", "anarkali", "fall pico"],
        options: [
          { id: "ws_tl_1", title: { en: "Simple Suit / Kurti Stitching (No Lining)", hi: "सिंपल सूट / कुर्ती सिलाई (बिना अस्तर)" }, basePrice: 349, planType: "ONE_TIME" },
          { id: "ws_tl_2", title: { en: "Suit Stitching with Lining (Astar)", hi: "अस्तर वाला सूट सिलाई" }, basePrice: 499, planType: "ONE_TIME" },
          { id: "ws_tl_3", title: { en: "Designer Suit (Anarkali / Naira / Patiala)", hi: "डिजाइनर सूट / अनारकली / नायरा कट / पटियाला" }, basePrice: 699, planType: "ONE_TIME" },
          { id: "ws_tl_4", title: { en: "Simple Blouse (Without Lining)", hi: "सिंपल ब्लाउज (बिना अस्तर)" }, basePrice: 269, planType: "ONE_TIME" },
          { id: "ws_tl_5", title: { en: "Blouse with Lining (Astar)", hi: "अस्तर वाला ब्लाउज" }, basePrice: 389, planType: "ONE_TIME" },
          { id: "ws_tl_6", title: { en: "Padded / Princess Cut / Designer Blouse", hi: "पैडेड / प्रिंसेस कट / डिजाइनर ब्लाउज" }, basePrice: 649, planType: "ONE_TIME" },
          { id: "ws_tl_8", title: { en: "Saree Fall + Pico", hi: "साड़ी फॉल + पीको" }, basePrice: 99, planType: "ONE_TIME" },
          { id: "ws_tl_9", title: { en: "Lehenga / Gown Fitting & Stitching", hi: "लहंगा / गाउन फिटिंग व सिलाई" }, basePrice: 1299, planType: "ONE_TIME" }
        ]
      }
    }
  },

  // 6. MEN'S SALON
  mens_salon: {
    id: "mens_salon",
    title: { en: "Men's Haircut & Grooming", hi: "पुरुष हेयरकट, शेविंग व चम्पी" },
    badge: { en: "MEN SALON", hi: "पुरुष सैलून" },
    rating: "4.8",
    reviews: "1.9k",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      m_cut_combo: {
        title: { en: "Haircut + Beard Styling Combo", hi: "हेयरकट + दाढ़ी शेविंग कॉम्बो" },
        badge: { en: "COMBO", hi: "कॉम्बो" },
        rating: "4.8",
        reviews: "950+",
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80",
        basePrice: 310,
        quantityType: "none",
        keywords: ["mens haircut", "shave", "beard trim", "dadhi", "bal katna", "barber", "nai"],
        options: [{ id: "ms_cut_cmb", title: { en: "Haircut + Beard Shave/Trim Combo", hi: "हेयर कट + दाढ़ी शेव/ट्रिम + आफ्टर शेव" }, basePrice: 310, planType: "ONE_TIME" }]
      },
      kids_cut: {
        title: { en: "Safe Kids Haircut at Home", hi: "बच्चों का सुरक्षित होम कट" },
        badge: { en: "KIDS", hi: "किड्स" },
        rating: "4.9",
        reviews: "620+",
        image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=600&q=80",
        basePrice: 220,
        quantityType: "none",
        keywords: ["kids haircut", "bacche ke baal", "chote bache ki cutting", "baby haircut"],
        options: [{ id: "ms_kid_cut", title: { en: "Kids Patient Haircut", hi: "किड्स स्पेशल होम कटिंग विजिट" }, basePrice: 220, planType: "ONE_TIME" }]
      },
      m_champi: {
        title: { en: "Relaxing Scalp Oil Champi", hi: "रिलैक्सिंग हेड ऑयल चम्पी" },
        badge: { en: "CHAMPI", hi: "चम्पी" },
        rating: "4.8",
        reviews: "470+",
        image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80",
        basePrice: 220,
        quantityType: "none",
        keywords: ["head massage", "champi", "sar ki malish", "scalp oil massage", "tel malish"],
        options: [{ id: "ms_oil_20m", title: { en: "20 Mins Head Champi Massage", hi: "20 मिनट हेड मसाज व स्कैल्प चम्पी" }, basePrice: 220, planType: "ONE_TIME" }]
      },
      m_facial_dtan: {
        title: { en: "Instant Face D-Tan & Cleanup", hi: "फेस डी-टैन व चारकोल क्लीनअप" },
        badge: { en: "D-TAN", hi: "डी-टैन" },
        rating: "4.8",
        reviews: "380+",
        image: "https://images.unsplash.com/photo-1512290900672-1f41b3156e5f?auto=format&fit=crop&w=600&q=80",
        basePrice: 359,
        quantityType: "none",
        keywords: ["mens cleanup", "mens facial", "dtan", "charcoal mask", "face scrub"],
        options: [{ id: "ms_dtn_fc", title: { en: "Face Scrub & D-Tan Cleanup", hi: "फेस स्क्रब + डी-टैन पैक" }, basePrice: 359, planType: "ONE_TIME" }]
      }
    }
  },

  // 7. HOME MAID, COOK & DOMESTIC HELPERS
  home_maid_cook: {
    id: "home_maid_cook",
    title: { en: "Home Maid, Cook & Helpers", hi: "काम वाली बाई, रसोइया व घरेलू हेल्पर" },
    badge: { en: "DOMESTIC", hi: "घरेलू" },
    rating: "4.8",
    reviews: "2.8k",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      cook_meal: {
        title: { en: "Home Cook - Fresh Daily Meals", hi: "घर पर खाना बनाने वाली (होम कुक)" },
        badge: { en: "COOK", hi: "रसोइया" },
        rating: "4.8",
        reviews: "1.1k+",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
        basePrice: 449,
        quantityType: "none",
        keywords: ["cook", "khana banane wali", "rasoiya", "roti banane wali", "chef at home", "monthly cook"],
        options: [
          { id: "mc_ck_2m_small", title: { en: "2-Times Daily Meals (2 to 4 Members)", hi: "2 समय भोजन - सुबह + शाम (2 से 4 सदस्य)" }, basePrice: 449, planType: "DAILY_TWICE" },
          { id: "mc_ck_2m_large", title: { en: "2-Times Daily Meals (Up to 6 Members)", hi: "2 समय भोजन - सुबह + शाम (5 से 6 सदस्य)" }, basePrice: 539, planType: "DAILY_TWICE" },
          { id: "mc_ck_m_small", title: { en: "30-Day Monthly Cook (2 to 4 Members)", hi: "30-दिन मासिक पास (2 से 4 सदस्य - सुबह + शाम)" }, basePrice: 5399, planType: "MONTHLY" },
          { id: "mc_ck_m_large", title: { en: "30-Day Monthly Cook (Up to 6 Members)", hi: "30-दिन मासिक पास (5 से 6 सदस्य - सुबह + शाम)" }, basePrice: 6749, planType: "MONTHLY" }
        ]
      },
      maid_mop_toilet: {
        title: { en: "Mopping & Toilet Deep Clean", hi: "झाड़ू, पोछा व टॉयलेट क्लीनिंग" },
        badge: { en: "CLEANING", hi: "सफाई" },
        rating: "4.8",
        reviews: "820+",
        image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80",
        basePrice: 269,
        quantityType: "none",
        keywords: ["maid", "pocha", "jhadu", "toilet cleaning", "bathroom safai", "kam wali bai", "deep cleaning"],
        options: [
          { id: "mc_mt_small", title: { en: "Mopping + Toilet Wash (2 to 4 Members)", hi: "झाड़ू, पोछा + टॉयलेट वॉश (2 से 4 सदस्य)" }, basePrice: 269, planType: "ONE_TIME" },
          { id: "mc_mt_large", title: { en: "Mopping + Toilet Wash (5 to 6 Members)", hi: "झाड़ू, पोछा + टॉयलेट वॉश (5 से 6 सदस्य)" }, basePrice: 359, planType: "ONE_TIME" },
          { id: "mc_mt_month", title: { en: "30-Day Monthly Deep Clean Pass (Daily)", hi: "30-दिन मासिक पास (झाड़ू, पोछा + टॉयलेट वॉश)" }, basePrice: 2879, planType: "MONTHLY" }
        ]
      },
      maid_daily_routine: {
        title: { en: "Mopping & Sink Utensils Wash", hi: "झाड़ू, पोछा + बर्तन मांजने वाली" },
        badge: { en: "MAID", hi: "काम वाली बाई" },
        rating: "4.8",
        reviews: "1.3k+",
        image: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=600&q=80",
        basePrice: 399,
        quantityType: "none",
        keywords: ["bartan", "utensils wash", "jhadu pocha bartan", "maid for bartan", "daily maid", "bai"],
        options: [
          { id: "mc_mr_small", title: { en: "Mopping + 2-Times Utensils (2 to 4 Members)", hi: "झाड़ू-पोछा + 2 समय बर्तन (2 से 4 सदस्य)" }, basePrice: 399, planType: "DAILY_TWICE" },
          { id: "mc_mr_large", title: { en: "Mopping + 2-Times Utensils (5 to 6 Members)", hi: "झाड़ू-पोछा + 2 समय बर्तन (5 से 6 सदस्य)" }, basePrice: 489, planType: "DAILY_TWICE" },
          { id: "mc_mr_month", title: { en: "30-Day Monthly Routine Pass (Daily)", hi: "30-दिन मासिक पास (झाड़ू-पोछा + रोजाना बर्तन)" }, basePrice: 3419, planType: "MONTHLY" }
        ]
      },
      maid_all_in_one: {
        title: { en: "All-in-One Home Helper (A to Z)", hi: "घर के A to Z सभी घरेलू काम" },
        badge: { en: "ALL WORK", hi: "A to Z काम" },
        rating: "4.9",
        reviews: "640+",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
        basePrice: 399,
        quantityType: "none",
        keywords: ["all in one maid", "full time maid", "live in maid", "24 hours maid", "domestic helper", "househelp"],
        options: [
          { id: "mc_ao_hd", title: { en: "Half-Day A to Z Helper (4 Hours Duty)", hi: "4-घंटे हाफ-डे A to Z काम (1 दिन ड्यूटी)" }, basePrice: 399, planType: "HALF_DAY" },
          { id: "mc_ao_fd", title: { en: "Full-Day A to Z Helper (8 Hours Duty)", hi: "8-घंटे फुल-डे A to Z काम (1 दिन ड्यूटी)" }, basePrice: 579, planType: "FULL_DAY" },
          { id: "mc_ao_12h_m", title: { en: "12-Hour 30-Day Monthly Pass (Day Shift)", hi: "12-घंटे 30-दिन मासिक पास (A to Z घरेलू काम)" }, basePrice: 9899, planType: "MONTHLY" },
          { id: "mc_ao_24h_m", title: { en: "24-Hour 30-Day Live-in Pass (Food by User)", hi: "24-घंटे 30-दिन लाइव-इन पास (भोजन ग्राहक का)" }, basePrice: 15299, planType: "MONTHLY" }
        ]
      },
      male_caretaker_errands: {
        title: { en: "Male Home Helper & Caretaker", hi: "लड़का - घर की देखरेख व घरेलू काम" },
        badge: { en: "CARETAKER", hi: "केयरटेकर" },
        rating: "4.8",
        reviews: "490+",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
        basePrice: 359,
        quantityType: "none",
        keywords: ["ladka helper", "boy for home", "errands", "saman lana", "male helper", "caretaker"],
        options: [
          { id: "mc_mc_hd", title: { en: "Half-Day Runner / Helper (4 Hours Duty)", hi: "4-घंटे हाफ-डे लड़का हेल्पर (भागदौड़ व सामान)" }, basePrice: 359, planType: "HALF_DAY" },
          { id: "mc_mc_fd", title: { en: "Full-Day Runner / Caretaker (8 Hours Duty)", hi: "8-घंटे फुल-डे लड़का हेल्पर (घरेलू देखभाल व काम)" }, basePrice: 489, planType: "FULL_DAY" },
          { id: "mc_mc_12h_m", title: { en: "12-Hour 30-Day Monthly Pass (Boy Caretaker)", hi: "12-घंटे 30-दिन मासिक पास (लड़का - घर की देखरेख)" }, basePrice: 8999, planType: "MONTHLY" },
          { id: "mc_mc_24h_m", title: { en: "24-Hour 30-Day Live-in Pass (Food by User)", hi: "24-घंटे 30-दिन लाइव-इन पास (भोजन ग्राहक का)" }, basePrice: 14999, planType: "MONTHLY" }
        ]
      }
    }
  },

  // 8. MASON & DAILY LABOUR WORKFORCE
  mason_labour: {
    id: "mason_labour",
    title: { en: "Skilled Mason & Daily Labour", hi: "राजमिस्त्री व दैनिक लेबर वर्कफोर्स" },
    badge: { en: "CONSTRUCTION", hi: "कंस्ट्रक्शन" },
    rating: "4.8",
    reviews: "1.9k",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      mason_team: {
        title: { en: "Skilled Mason (Chinai, Plaster & Tiles)", hi: "कुशल राजमिस्त्री (चिनाई, प्लास्टर व टाइल)" },
        badge: { en: "MASON", hi: "राजमिस्त्री" },
        rating: "4.8",
        reviews: "1.1k+",
        image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
        basePrice: 599,
        quantityType: "workers",
        workerLabel: { en: "Select Number of Masons (1 to 4)", hi: "कितने मिस्त्री चाहिए (1 से 4)" },
        requiresPhoto: true,
        keywords: ["rajmistri", "mistri", "mason", "chinai", "plaster", "tile lagana", "construction", "makan banana"],
        options: [
          { id: "ml_ms_1_hd", title: { en: "1 Mason - Half Day (4-5 Hours)", hi: "1 राजमिस्त्री - हाफ डे (4-5 घंटे)" }, basePrice: 599, planType: "HALF_DAY" },
          { id: "ml_ms_1_fd", title: { en: "1 Mason - Full Day (8 Hours)", hi: "1 राजमिस्त्री - फुल डे (8 घंटे)" }, basePrice: 949, planType: "FULL_DAY" },
          { id: "ml_ms_2_fd", title: { en: "2 Masons Team - Full Day (8 Hours)", hi: "2 राजमिस्त्री टीम - फुल डे (8 घंटे)" }, basePrice: 1849, planType: "FULL_DAY" },
          { id: "ml_ms_3_fd", title: { en: "3 Masons Team - Full Day (8 Hours)", hi: "3 राजमिस्त्री टीम - फुल डे (8 घंटे)" }, basePrice: 2749, planType: "FULL_DAY" },
          { id: "ml_ms_4_fd", title: { en: "4 Masons Team - Full Day (8 Hours)", hi: "4 राजमिस्त्री टीम - फुल डे (8 घंटे)" }, basePrice: 3599, planType: "FULL_DAY" }
        ]
      },
      labour_team: {
        title: { en: "Helper Labour (Shifting, Loading & Breaking)", hi: "दैनिक मजदूर (लोडिंग, तोड़-फोड़ व मसाला)" },
        badge: { en: "LABOUR", hi: "मजदूर" },
        rating: "4.7",
        reviews: "850+",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
        basePrice: 399,
        quantityType: "workers",
        workerLabel: { en: "Select Number of Labours (1 to 4)", hi: "कितने मजदूर चाहिए (1 से 4)" },
        requiresPhoto: true,
        keywords: ["labour", "mazdoor", "beldar", "shifting", "loading", "malba", "tod fod", "masala banana"],
        options: [
          { id: "ml_lb_1_hd", title: { en: "1 Labour - Half Day (4-5 Hours)", hi: "1 मजदूर - हाफ डे (4-5 घंटे)" }, basePrice: 399, planType: "HALF_DAY" },
          { id: "ml_lb_1_fd", title: { en: "1 Labour - Full Day (8 Hours)", hi: "1 मजदूर - फुल डे (8 घंटे)" }, basePrice: 649, planType: "FULL_DAY" },
          { id: "ml_lb_2_fd", title: { en: "2 Labours Team - Full Day (8 Hours)", hi: "2 मजदूर टीम - फुल डे (8 घंटे)" }, basePrice: 1249, planType: "FULL_DAY" },
          { id: "ml_lb_3_fd", title: { en: "3 Labours Team - Full Day (8 Hours)", hi: "3 मजदूर टीम - फुल डे (8 घंटे)" }, basePrice: 1849, planType: "FULL_DAY" },
          { id: "ml_lb_4_fd", title: { en: "4 Labours Team - Full Day (8 Hours)", hi: "4 मजदूर टीम - फुल डे (8 घंटे)" }, basePrice: 2399, planType: "FULL_DAY" }
        ]
      }
    }
  },

  // 9. HOME PHYSIOTHERAPY & CLINICAL REHAB
  home_physiotherapy: {
    id: "home_physiotherapy",
    title: { en: "Home Physiotherapy & Rehab", hi: "होम फिजियोथेरेपी व क्लिनिकल रिहैब" },
    badge: { en: "CLINICAL", hi: "क्लिनिकल" },
    rating: "4.9",
    reviews: "1.4k",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      ortho_physio: {
        title: { en: "Joint, Spine & Back Pain Physio", hi: "जोड़, कमर, गर्दन व स्पाइन दर्द फिजियो" },
        badge: { en: "ORTHO", hi: "आर्थो" },
        rating: "4.9",
        reviews: "650+",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        basePrice: 449,
        quantityType: "none",
        keywords: ["physiotherapy", "physiotherapist", "kamar dard", "back pain", "sciatica", "slip disc", "cervical", "ghutna dard"],
        options: [
          { id: "pt_ort_1", title: { en: "Single Therapy & Assessment (45-60 Mins)", hi: "1-विजिट फिजियोथेरेपी व असेसमेंट (45-60 मिनट)" }, basePrice: 449, planType: "ONE_TIME" },
          { id: "pt_ort_3d", title: { en: "3-Days Intensive Pain Relief Pack", hi: "3-दिन तीव्र दर्द-निवारण थेरेपी पैक" }, basePrice: 1199, planType: "COURSE" },
          { id: "pt_ort_7d", title: { en: "7-Days Complete Mobility Recovery", hi: "7-दिन सम्पूर्ण मोबिलिटी रिकवरी पैक" }, basePrice: 2699, planType: "WEEKLY" },
          { id: "pt_ort_15d", title: { en: "15-Days Chronic Pain Care Pack", hi: "15-दिन पुराना दर्द (गठिया/साइटिका) केयर पैक" }, basePrice: 5399, planType: "COURSE" },
          { id: "pt_ort_30d", title: { en: "30-Days Monthly Ortho Care Pass (Daily Visit)", hi: "30-दिन मासिक आर्थो फिजियो पास (नियमित विजिट)" }, basePrice: 9499, planType: "MONTHLY" }
        ]
      },
      neuro_physio: {
        title: { en: "Stroke, Paralysis & Neuro Rehab", hi: "ब्रेन स्ट्रोक, लकवा व न्यूरो रिहैब" },
        badge: { en: "NEURO", hi: "न्यूरो" },
        rating: "4.9",
        reviews: "420+",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
        basePrice: 549,
        quantityType: "none",
        keywords: ["stroke", "paralysis", "lakwa", "neuro rehab", "brain stroke", "facial palsy"],
        options: [
          { id: "pt_neu_1", title: { en: "Single Intensive Neuro Session (60 Mins)", hi: "1-घंटा गहन न्यूरो फिजियो सेशन (सिंगल विजिट)" }, basePrice: 549, planType: "ONE_TIME" },
          { id: "pt_neu_7d", title: { en: "7-Days Stroke Neuro Activation Pack", hi: "7-दिन स्ट्रोक नर्व एक्टिवेशन पैक" }, basePrice: 3499, planType: "WEEKLY" },
          { id: "pt_neu_15d", title: { en: "15-Days Motor Function Recovery Pack", hi: "15-दिन अंग संतुलन व गतिविधि रिकवरी पैक" }, basePrice: 6749, planType: "COURSE" },
          { id: "pt_neu_30d", title: { en: "30-Days Monthly Paralysis Rehab Pass", hi: "30-दिन मासिक पैरालिसिस व न्यूरो रिहैब पास" }, basePrice: 12499, planType: "MONTHLY" }
        ]
      },
      surgery_physio: {
        title: { en: "Post-Surgery Knee/Hip & Walk Recovery", hi: "ऑपरेशन व फ्रैक्चर बाद वॉक रिकवरी" },
        badge: { en: "SURGERY", hi: "सर्जरी" },
        rating: "4.8",
        reviews: "330+",
        image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
        basePrice: 499,
        quantityType: "none",
        keywords: ["post surgery", "knee replacement", "hip replacement", "fracture", "walking rehab", "gait training"],
        options: [
          { id: "pt_srg_1", title: { en: "Single Post-Surgery Gait Session", hi: "1-सेशन पोस्ट-सर्जरी वॉक व स्ट्रेंथ ट्रेनिंग" }, basePrice: 499, planType: "ONE_TIME" },
          { id: "pt_srg_7d", title: { en: "7-Days Knee/Hip Replacement Mobility", hi: "7-दिन घुटना/कूल्हा रिप्लेसमेंट मोबिलिटी पैक" }, basePrice: 3149, planType: "WEEKLY" },
          { id: "pt_srg_30d", title: { en: "30-Days Complete Post-Surgery Rehab", hi: "30-दिन सम्पूर्ण पोस्ट-सर्जरी रिहैब पास" }, basePrice: 10999, planType: "MONTHLY" }
        ]
      }
    }
  },

  // 10. HOME TUITION
  home_tuition: {
    id: "home_tuition",
    title: { en: "Home Tuition (Playgroup to 5th)", hi: "होम ट्यूटर (प्ले-ग्रुप से कक्षा 5)" },
    badge: { en: "TUTORS", hi: "ट्यूटर" },
    rating: "4.9",
    reviews: "1.3k",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    subCategories: {
      convent_cbse_tutor: {
        title: { en: "Convent & CBSE/ICSE English Medium", hi: "कॉन्वेंट व CBSE/ICSE इंग्लिश मीडियम ट्यूटर" },
        badge: { en: "ENGLISH MEDIUM", hi: "इंग्लिश मीडियम" },
        rating: "4.9",
        reviews: "580+",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
        basePrice: 199,
        quantityType: "students",
        workerLabel: { en: "Select Number of Children (1 to 10)", hi: "कितने बच्चे पढ़ाने हैं (1 से 10 तक)" },
        keywords: ["tuition", "home tutor", "cbse", "icse", "convent teacher", "english medium", "maths tutor", "padhane wale sir"],
        options: [
          { id: "tt_cbse_demo", title: { en: "3-Days Convent Trial Demo (Fluent English)", hi: "3-दिन कॉन्वेंट ट्रायल डेमो (फ्लूएंट इंग्लिश)" }, basePrice: 199, planType: "COURSE" },
          { id: "tt_cbse_12_m", title: { en: "Class 1 & 2 Monthly Pass (Mon-Sat, Convent)", hi: "कक्षा 1 व 2 मासिक पास (कॉन्वेंट ऑल सब्जेक्ट्स)" }, basePrice: 799, planType: "MONTHLY_TUITION" },
          { id: "tt_cbse_35_m", title: { en: "Class 3 to 5 Monthly Pass (Mon-Sat, Prep)", hi: "कक्षा 3 से 5 मासिक पास (मैथ्स, साइंस, ग्रामर)" }, basePrice: 899, planType: "MONTHLY_TUITION" }
        ]
      },
      state_board_tutor: {
        title: { en: "State Board & Bilingual Primary Tutor", hi: "स्टेट बोर्ड व सामान्य प्राइमरी होम ट्यूटर" },
        badge: { en: "PRIMARY", hi: "प्राइमरी" },
        rating: "4.8",
        reviews: "450+",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
        basePrice: 199,
        quantityType: "students",
        workerLabel: { en: "Select Number of Children (1 to 10)", hi: "कितने बच्चे पढ़ाने हैं (1 से 10 तक)" },
        keywords: ["state board", "up board", "primary tutor", "hindi medium", "homework teacher", "home tuition"],
        options: [
          { id: "tt_st_demo", title: { en: "3-Days Regular Trial Demo Classes (1 Hr)", hi: "3-दिन ट्रायल डेमो सेशन्स (डेली 1 घंटा)" }, basePrice: 199, planType: "COURSE" },
          { id: "tt_st_12_m", title: { en: "Class 1 & 2 Monthly Pass (Mon-Sat Regular)", hi: "कक्षा 1 व 2 मासिक पास (सोम-शनि होमवर्क)" }, basePrice: 799, planType: "MONTHLY_TUITION" },
          { id: "tt_st_35_m", title: { en: "Class 3 to 5 Monthly Pass (Mon-Sat Prep)", hi: "कक्षा 3 से 5 मासिक पास (सोम-शनि तैयारी)" }, basePrice: 899, planType: "MONTHLY_TUITION" }
        ]
      },
      kids_early_foundation: {
        title: { en: "Playgroup, Nursery & KG Early Foundation", hi: "प्ले-ग्रुप, नर्सरी व KG शुरुआती फाउंडेशन" },
        badge: { en: "KIDS", hi: "किड्स" },
        rating: "4.9",
        reviews: "320+",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
        basePrice: 199,
        quantityType: "students",
        workerLabel: { en: "Select Number of Children (1 to 10)", hi: "कितने बच्चे पढ़ाने हैं (1 से 10 तक)" },
        keywords: ["nursery", "kg", "playgroup", "phonics", "abcdc", "writing", "reading", "kindergarten"],
        options: [
          { id: "tt_kg_demo", title: { en: "3-Days Fun Phonics & Writing Demo Session", hi: "3-दिन फोनिक्स, राइटिंग व फन लर्निंग डेमो" }, basePrice: 199, planType: "COURSE" },
          { id: "tt_kg_month", title: { en: "30-Day Monthly Kids Pass (Mon-Sat, 1 Hr Daily)", hi: "30-दिन मासिक किड्स पास (अक्षर ज्ञान व रीडिंग)" }, basePrice: 699, planType: "MONTHLY_TUITION" }
        ]
      }
    }
  }
};

function calculateDynamicPricing(basePrice, multiplier = 1.0, distanceKm = 0.0) {
  let adjustedFare = Math.round(basePrice * multiplier);

  // Logistics Extra Travel Fee (Beyond 5 KM: ₹20 per KM)
  let extraTravelFee = 0;
  if (distanceKm > CITY_TIER_CONFIG.LOGISTICS.FREE_RADIUS_KM) {
    const extraKm = distanceKm - CITY_TIER_CONFIG.LOGISTICS.FREE_RADIUS_KM;
    extraTravelFee = Math.round(extraKm * CITY_TIER_CONFIG.LOGISTICS.PER_KM_EXTRA_CHARGE);
  }

  const standardCodPrice = adjustedFare + extraTravelFee;
  const onlineDiscount = Math.round((standardCodPrice * CITY_TIER_CONFIG.FINANCIALS.ONLINE_DISCOUNT_PERCENT) / 100);
  const onlineDiscountedPrice = standardCodPrice - onlineDiscount;

  // Partner Split & Platform Margin Breakdown
  const partnerPayout = Number(((standardCodPrice * CITY_TIER_CONFIG.FINANCIALS.PARTNER_SHARE_PERCENT) / 100).toFixed(2));
  const partnerMainWallet = Number(((standardCodPrice * CITY_TIER_CONFIG.FINANCIALS.PARTNER_MAIN_WALLET_PERCENT) / 100).toFixed(2));
  const partnerHealthWallet = Number(((standardCodPrice * CITY_TIER_CONFIG.FINANCIALS.PARTNER_HEALTH_EMERGENCY_PERCENT) / 100).toFixed(2));
  
  const platformFeeGross = Number((standardCodPrice - partnerPayout).toFixed(2));
  const gstOnCommission = Number(((platformFeeGross * CITY_TIER_CONFIG.FINANCIALS.GST_PERCENT_ON_COMMISSION) / 118).toFixed(2));
  const platformNetFee = Number((platformFeeGross - gstOnCommission).toFixed(2));

  return {
    standardCodPrice,
    onlineDiscount,
    onlineDiscountedPrice,
    extraTravelFee,
    partnerPayout,
    partnerMainWallet,
    partnerHealthWallet,
    platformFeeGross,
    platformNetFee,
    gstOnCommission
  };
}

if (typeof window !== "undefined") {
  window.CITY_TIER_CONFIG = CITY_TIER_CONFIG;
  window.detectLocationTier = detectLocationTier;
  window.HERO_SLIDES_CONFIG = HERO_SLIDES_CONFIG;
  window.MAIN_CLUSTERS_CONFIG = MAIN_CLUSTERS_CONFIG;
  window.MASTER_CATALOG_DATA = MASTER_CATALOG_DATA;
  window.calculateDynamicPricing = calculateDynamicPricing;
}
