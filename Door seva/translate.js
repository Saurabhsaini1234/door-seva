/**
 * DoorSeva (doorseva.in) - Master Translation Engine
 * Entity: Sachint Enterprises (GSTIN: 09IATPS9376A1ZR)
 */

window.DoorSevaI18n = {
  DEFAULT_LANGUAGE: "en",
  SUPPORTED_LANGUAGES: [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" }
  ],

  DICTIONARY: {
    // Top Tabs
    allServicesTab: { en: "All Services", hi: "सभी सेवाएं", bn: "সমস্ত পরিষেবা", pa: "ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ" },
    healthTab: { en: "Clinical Health", hi: "क्लीनिकल हेल्थ", bn: "ক্লিনিক্যাল স্বাস্থ্য", pa: "ਕਲੀਨਿਕਲ ਸਿਹਤ" },
    maintenanceTab: { en: "Maintenance", hi: "होम मेंटेनेंस", bn: "গৃহ রক্ষণাবেক্ষণ", pa: "ਘਰੇਲੂ ਮੁਰੰਮਤ" },
    womenTab: { en: "Women Special", hi: "महिला स्पेशल", bn: "মহিলা স্পেশাল", pa: "ਮਹਿਲਾ ਸਪੈਸ਼ਲ" },
    domesticTab: { en: "Home & Fleet", hi: "घरेलू व निर्माण", bn: "গৃহস্থালি ও শ্রম", pa: "ਘਰੇਲੂ ਅਤੇ ਨਿਰਮਾਣ" },

    // Location & Search
    detectingLandmark: { en: "Detecting Live Location...", hi: "लाइव स्थान खोज रहे हैं...", bn: "লাইভ অবস্থান খোঁজা হচ্ছে...", pa: "ਲਾਈਵ ਸਥਾਨ ਲੱਭ ਰਹੇ ਹਾਂ..." },
    fetchingAddress: { en: "Connecting to GPS Satellite...", hi: "जीपीएस से जुड़ रहे हैं...", bn: "GPS সংযোগ করা হচ্ছে...", pa: "GPS ਨਾਲ ਜੁੜ ਰਹੇ ਹਾਂ..." },
    autoGpsBtn: { en: "🎯 Auto GPS", hi: "🎯 ऑटो GPS", bn: "🎯 অটো GPS", pa: "🎯 ਆਟੋ GPS" },
    searchPlaceholder: { en: "Search for nurse, electrician, maid, salon...", hi: "नर्स, इलेक्ट्रीशियन, काम वाली बाई, सैलून खोजें...", bn: "নার্স, ইলেকট্রিশিয়ান খুঁজুন...", pa: "ਨਰਸ, ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ ਲੱਭੋ..." },

    // Cards & Actions
    viewServices: { en: "View Services", hi: "सेवाएं देखें", bn: "পরিষেবাগুলি দেখুন", pa: "ਸੇਵਾਵਾਂ ਦੇਖੋ" },
    exploreBtn: { en: "Explore Fleet →", hi: "सेवाएं देखें →", bn: "পরিষেবা দেখুন →", pa: "ਸੇਵਾਵਾਂ ਦੇਖੋ →" },
    backToCategories: { en: "Back to All Services", hi: "सभी सेवाओं पर वापस", bn: "সমস্ত পরিষেবায় ফিরে যান", pa: "ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਤੇ ਵਾਪਸ" },
    bookNow: { en: "Book Now", hi: "अभी बुक करें", bn: "এখন বুক করুন", pa: "ਹੁਣੇ ਬੁੱਕ ਕਰੋ" },
    back: { en: "← Back", hi: "← वापस", bn: "← ফিরে যান", pa: "← ਵਾਪਸ" },
    doorstepCertified: { en: "⚡ DoorStep Certified", hi: "⚡ डोरस्टेप प्रमाणित", bn: "⚡ ডোরস্টেপ প্রত্যয়িত", pa: "⚡ ਪ੍ਰਮਾਣਿਤ ਸੇਵਾ" },
    verifiedSectionTitle: { en: "All-India Verified Service Fleets", hi: "सत्यापित होम व हेल्थकेयर सेवाएं", bn: "যাচাইকৃত পরিষেবা", pa: "ਪ੍ਰਮਾਣਿਤ ਸੇਵਾਵਾਂ" },
    defaultCustomerName: { en: "DoorSeva Customer", hi: "डोरसेवा ग्राहक", bn: "ডোরসেবা গ্রাহক", pa: "ਡੋਰਸੇਵਾ ਗਾਹਕ" },

    // Checkout & Notice Strip
    totalPayable: { en: "Total Payable Amount:", hi: "कुल देय राशि:", bn: "মোট প্রদেয় অর্থ:", pa: "ਕੁੱਲ ਭੁਗਤਾਨ ਯੋਗ ਰਾਸ਼ੀ:" },
    selectSlotLabel: { en: "⚡ Select Plan / Duty Shift:", hi: "⚡ प्लान अथवा शिफ्ट स्लॉट चुनें:", bn: "⚡ প্ল্যান বা শিফট বাছুন:", pa: "⚡ ਯੋਜਨਾ ਜਾਂ ਸ਼ਿਫਟ ਚੁਣੋ:" },
    custNameLabel: { en: "Customer Full Name", hi: "ग्राहक का पूरा नाम", bn: "গ্রাহকের পুরো নাম", pa: "ਗਾਹਕ ਦਾ ਪੂਰਾ ਨਾਮ" },
    custPhoneLabel: { en: "Mobile Number", hi: "मोबाइल नंबर", bn: "মোবাইল নম্বর", pa: "ਮੋਬਾਈਲ ਨੰਬਰ" },
    custAddressLabel: { en: "Delivery Address & Landmark", hi: "सेवा वितरण पता व लैंडमार्क", bn: "ঠিকনা ও ল্যান্ডমার্ক", pa: "ਡਿਲੀਵਰੀ ਪਤਾ" },

    // 4-LINE MANDATORY DISCLAIMER
    noticeLine1: { 
      en: "1. Pay cash strictly AFTER the work is 100% completed; never give advance cash.", 
      hi: "1. कार्य 100% पूरा होने के बाद ही पार्टनर को नकद दें; कोई एडवांस नकद न दें।",
      bn: "1. কাজ সম্পূর্ণ হওয়ার পরেই নগদ দিন; কোনো অগ্রিম নগদ দেবেন না।",
      pa: "1. ਕੰਮ ਪੂਰਾ ਹੋਣ ਤੋਂ ਬਾਅਦ ਹੀ ਨਕਦ ਦਿਓ; ਕੋਈ ਪੇਸ਼ਗੀ ਨਕਦ ਨਾ ਦਿਓ।"
    },
    noticeLine2: { 
      en: "2. If you give cash advance, the app holds zero liability for refunds or cancellations.", 
      hi: "2. यदि आप एडवांस नकद देते हैं, तो रिफंड या कैंसिलेशन की जिम्मेदारी ऐप की नहीं होगी।",
      bn: "2. অগ্রিম নগদ দিলে রিফান্ড বা বাতিলের দায়িত্ব অ্যাপ বহন করবে না।",
      pa: "2. ਜੇਕਰ ਤੁਸੀਂ ਐਡਵਾਂਸ ਨਕਦ ਦਿੰਦੇ ਹੋ, ਤਾਂ ਰਿਫੰਡ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ ਤੁਹਾਡੀ ਹੋਵੇਗੀ।"
    },
    noticeLine3: { 
      en: "3. DoorSeva guarantees 100% safe refunds and escrow protection on ONLINE payments.", 
      hi: "3. डोरसेवा केवल ऑनलाइन भुगतान पर 100% सुरक्षित रिफंड व एस्क्रो गारंटी देता है।",
      bn: "3. ডোরসেবা শুধুমাত্র অনলাইন পেমেন্টে ১০০% সুরক্ষিত রিফান্ড প্রদান করে।",
      pa: "3. ਡੋਰਸੇਵਾ ਸਿਰਫ਼ ਆਨਲਾਈਨ ਭੁਗਤਾਨ ਤੇ ਹੀ ਸੁਰੱਖਿਅਤ ਰਿਫੰਡ ਦਿੰਦਾ ਹੈ।"
    },
    noticeLine4: { 
      en: "4. For seamless safety, emergency cancellation & wallet cashback, always pay online.", 
      hi: "4. सुरक्षित सेवा, आसान कैंसिलेशन व वॉलेट रिफंड के लिए हमेशा ऑनलाइन माध्यम चुनें।",
      bn: "4. নিরাপদ সেবা ও সহজ রিফান্ডের জন্য সর্বদা অনলাইন পেমেন্ট ব্যবহার করুন।",
      pa: "4. ਸੁਰੱਖਿਅਤ ਸੇਵਾ ਅਤੇ ਵਾਲਿਟ ਰਿਫੰਡ ਲਈ ਹਮੇਸ਼ਾ ਆਨਲਾਈਨ ਭੁਗਤਾਨ ਚੁਣੋ।"
    },

    requirementLabel: { en: "Describe Your Requirement (Optional)", hi: "अपनी जरूरत या समस्या का विवरण लिखें (वैकल्पिक)" },
    requirementPlaceholder: { en: "e.g., Injection name / Leaking pipe / Switch problem / Any special request...", hi: "जैसे: इंजेक्शन का नाम / कौन सा पाइप लीक है / क्या समस्या है..." },
    uploadDocLabel: { en: "Upload Doctor Prescription or Photo (Optional)", hi: "डॉक्टर का पर्चा अथवा समस्या की फोटो अपलोड करें (वैकल्पिक)" },
    uploadDocBtn: { en: "Upload Document / Photo", hi: "दस्तावेज़ / फ़ोटो अपलोड करें" },
    uploadDocSub: { en: "Tap to select photo (JPG, PNG up to 5MB)", hi: "फोटो चुनने के लिए यहाँ क्लिक करें (JPG, PNG)" },

    cashPayment: { en: "Cash on Delivery (Pay upon completion)", hi: "कैश ऑन डिलीवरी (कार्य पूरा होने पर ही दें)" },
    onlinePayment: { en: "Online Payment (100% Safe Escrow & Auto Refund)", hi: "ऑनलाइन भुगतान (100% सुरक्षित व तत्काल रिफंड)" },
    confirmAndBook: { en: "Confirm & Book Dispatch", hi: "पुष्टि करें व सेवा बुक करें" },

    // Order Success & Invoice
    orderConfirmed: { en: "Booking Confirmed & Dispatched!", hi: "बुकिंग सफलतापूर्वक दर्ज हो गई!" },
    orderRef: { en: "Order Reference", hi: "ऑर्डर संदर्भ संख्या" },
    secretPinTitle: { en: "Your 4-Digit Escrow PIN", hi: "आपका 4-अंकीय गुप्त सुरक्षा पिन" },
    secretPinSub: { en: "*Share this PIN with the professional strictly AFTER satisfactory work completion", hi: "*यह गुप्त पिन केवल कार्य संतोषजनक पूर्ण होने के बाद ही बताएं" },
    viewTaxInvoice: { en: "📄 View & Download Digital GST Bill", hi: "📄 डिजिटल जीएसटी बिल देखें व डाउनलोड करें" },
    returnHome: { en: "Return to Home Services", hi: "मुख्य पृष्ठ पर लौटें" },

    // Drawer Menu
    drawerSec1: { en: "Orders & Wallet", hi: "ऑर्डर व वॉलेट" },
    menuBookings: { en: "My Bookings", hi: "मेरी बुकिंग्स" },
    menuBookingsSub: { en: "Active orders, invoice & secret PIN", hi: "सक्रिय ऑर्डर, जीएसटी बिल व पिन" },
    menuWallet: { en: "DoorSeva Wallet", hi: "डोरसेवा वॉलेट" },
    drawerSec2: { en: "Fleet Partnership", hi: "पार्टनरशिप व रोजगार" },
    menuPartner: { en: "Become a DoorSeva Partner", hi: "डोरसेवा पार्टनर बनें (85% Net Share)" },
    menuPartnerSub: { en: "Join as Nurse, Electrician, Plumber or Mason", hi: "नर्स, इलेक्ट्रीशियन, प्लंबर या मिस्त्री के रूप में जुड़ें" },
    drawerSec3: { en: "Helpdesk & Policies", hi: "सहायता व नीतियां" },
    menuSupport: { en: "Help & Support Desk", hi: "हेल्प व सपोर्ट डेस्क" },
    menuSupportSub: { en: "24x7 WhatsApp Chat & Phone Support", hi: "24x7 व्हाट्सएप चैट व हेल्पलाइन" },
    menuTerms: { en: "Terms & Conditions", hi: "नियम व शर्तें" },
    menuPrivacy: { en: "Privacy Policy", hi: "गोपनीयता नीति" },
    menuProfile: { en: "Edit Profile & Photo", hi: "प्रोफाइल व नाम बदलें" },
    menuLogout: { en: "Log Out", hi: "लॉग आउट करें" },
    menuDelete: { en: "Delete Account & Data", hi: "खाता व डेटा हटाएं" },
    menuDeleteSub: { en: "Google Play Compliance Request", hi: "गूगल प्ले नीति अनुपालन अनुरोध" }
  },

  getTranslation: function(key, langCode) {
    if (!key) return "";
    const lang = langCode || this.DEFAULT_LANGUAGE;
    if (typeof key === "object") {
      return key[lang] || key["en"] || key["hi"] || Object.values(key)[0] || "";
    }
    if (this.DICTIONARY[key]) {
      return this.DICTIONARY[key][lang] || this.DICTIONARY[key]["en"] || this.DICTIONARY[key]["hi"] || key;
    }
    return key;
  }
};