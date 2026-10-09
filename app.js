/**
 * DoorSeva (doorseva.in) - Master Commercial Controller
 * Entity: Sachint Enterprises (GSTIN: 09IATPS9376A1ZR)
 * Fully Standardized: Multi-Item Cart, Instant Booking, Right-Side [X] Cut, MapmyIndia Live GPS,
 * Strict Bank IFSC / UPI Wallet, Category-Matched WhatsApp Alert & Live Fast2SMS Real OTP Engine
 */

const RAZORPAY_KEY_ID = "rzp_test_TfRf6Eu9Bjf3ld";
const ADMIN_SUPPORT_PHONE = "+918218439129";
const MAPPLS_KEY = "vfsrbnhjdotpfjskxrfizvdcljvmnqayogml";
const FAST2SMS_API_KEY = "o4OTQ7ehBuDMqcpyPgWalSkxXtd5YUzA9CvIw2JNLjGrins1Hf9vkz6Y0GcU2wIfVAiethJ4MEdHjar8";

// Dedicated Category-Matched Verified Partners Registry (WhatsApp Routing)
const CATEGORY_PARTNER_DIRECTORY = {
  home_nursing: { phone: "+918218439129", name: "Certified Clinical Nursing Fleet" },
  patient_care: { phone: "+918218439129", name: "Elder & Bedside Care Attendant Fleet" },
  home_maintenance: { phone: "+918218439129", name: "Maintenance (Electrician/Plumber/Carpenter) Fleet" },
  home_appliances: { phone: "+918218439129", name: "Appliance Certified Technician Fleet" },
  women_special: { phone: "+918218439129", name: "Women Beautician & Salon Fleet" },
  mens_salon: { phone: "+918218439129", name: "Men Grooming & Styling Fleet" },
  home_maid_cook: { phone: "+918218439129", name: "Domestic Helper & Cook Fleet" },
  mason_labour: { phone: "+918218439129", name: "Construction Mason & Labour Fleet" },
  home_physiotherapy: { phone: "+918218439129", name: "Clinical Physiotherapist Fleet" },
  home_tuition: { phone: "+918218439129", name: "Primary Education Tutor Fleet" }
};

// Firebase Safe Initialization
const firebaseConfig = {
  apiKey: "AIzaSyCYTJYmFOAK44IHsnsPXLyA673ghwv6jtQ",
  authDomain: "door-seva.firebaseapp.com",
  projectId: "door-seva",
  storageBucket: "door-seva.firebasestorage.app",
  messagingSenderId: "981718382136",
  appId: "1:981718382136:web:1ff216c8b5f6cc957818cd"
};

let db = null;
let auth = null;

try {
  if (typeof firebase !== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
  }
} catch (e) {
  console.warn("Firebase offline or initialization deferred.");
}

// 100% Complete Dual-Language Dictionary
const I18N = {
  en: {
    appName: "DoorSeva",
    allServicesTab: "All Services",
    healthTab: "Health Services",
    beautyTab: "Beauty and Salon",
    maintenanceTab: "Home Maintenance",
    maidCookTab: "Home Cook and Maid",
    detectingLocation: "Detecting Live Location...",
    connectingGps: "Connecting to Mappls Satellite...",
    autoGpsBtn: "🎯 Auto GPS",
    searchPlaceholder: "Search for nurse, electrician, maid, salon...",
    verifiedHeading: "All-India Verified Service Fleets",
    verifiedBadge: "● 100% VERIFIED FLEET",
    viewServices: "View Services",
    certifiedBadge: "⚡ DoorStep Certified",
    bookNow: "⚡ Book Now",
    addToCart: "🛒 + Add",
    cartTitle: "🛒 Order Summary & Cart",
    cartEmpty: "Your cart is currently empty. Please add services.",
    subtotalLabel: "Service Subtotal:",
    onlineDiscountLabel: "Flat 20% Online Off:",
    netPayableLabel: "Net Payable Amount:",
    backToAll: "← Back to All Services",
    backBtn: "← Back",
    servicesCount: "SERVICES",
    totalPayable: "Total Payable Amount:",
    fullName: "Customer Full Name",
    phoneNum: "Mobile Number",
    deliveryAddress: "Delivery Address & Landmark",
    requirementLabel: "Service Requirement Details (A to Z Description)",
    requirementPlaceholder: "Describe your service requirement, specific requests or problem...",
    uploadLabel: "Upload Document / Photo (Optional)",
    uploadBtnText: "Upload Document / Photo",
    uploadSubText: "Tap to select photo (JPG, PNG up to 5MB)",
    codOption: "Cash on Delivery (Standard Base Price)",
    onlineOption: "Online Payment (Instant 20% Off & 100% Safe Escrow)",
    confirmBtn: "Confirm & Book Dispatch",
    bookingConfirmed: "Booking Confirmed & Dispatched!",
    orderRef: "Order Reference:",
    secretPinTitle: "Your 4-Digit Escrow PIN",
    secretPinSub: "*Share this PIN with the professional strictly AFTER satisfactory work completion",
    viewBillBtn: "📄 View & Download Digital GST Bill",
    returnHome: "Return to Home Services",
    ordersWallet: "Orders & Wallet",
    myBookings: "My Bookings & History",
    myBookingsSub: "Active orders, invoice & secret PIN",
    wallet: "DoorSeva Wallet",
    walletSub: "Refund & Cashout Balance",
    partnership: "Fleet Partnership",
    becomePartner: "Become a DoorSeva Partner",
    becomePartnerSub: "Join as Nurse, Electrician, Plumber or Mason",
    helpdeskTitle: "Helpdesk & Policies",
    helpDesk: "Help & Support Desk",
    helpDeskSub: "24x7 WhatsApp Chat & Phone Support",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    editProfile: "Edit Profile & Photo",
    editProfileSub: "Update name, photo and details",
    logOut: "Log Out",
    logOutSub: "Switch account or login again",
    deleteAccount: "Delete Account & Data",
    deleteAccountSub: "Google Play Compliance Request",

    medTitle: "🩺 Clinical Home Nursing & Service Terms Advisory",
    medConsent: "I Understand & Accept All Clinical, Payment & Refund Terms",
    medCancel: "Cancel",
    medProceed: "Proceed to Plans →",
    medPoints: [
      "1. Injections & AST Test: AST (sensitivity test) is strictly mandatory before administering any first-time antibiotic injection; no untested injection will be given.",
      "2. Medical Prescription: All procedures (IM/IV injections, catheter, Ryles tube, suction) are executed strictly under a registered doctor's prescription or informed patient consent.",
      "3. Dressing & Tubes: Sterile wound dressing, Foley's catheter flush/replacement, and Ryles Tube (RT) require patient cooperation; consult your physician immediately if acute discomfort occurs.",
      "4. Suction & Emergency: Mucus suction is performed strictly by trained clinical staff. In critical respiratory emergencies, rush the patient directly to the nearest hospital emergency room.",
      "5. 24-Hour Live-in Rule: In all 24-hour live-in shifts, three basic daily meals and safe resting quarters must be provided by the customer.",
      "6. Advance Cash Strict Prohibition: Do NOT pay any advance cash to the service partner under any circumstance. Pay cash strictly AFTER 100% satisfactory work completion. DoorSeva holds zero liability for cash advances; only Online Payments are eligible for return, cancellation & refund.",
      "7. Cancellation Lockout: Once the service partner departs from their location (dispatched), the booking cannot be cancelled or refunded.",
      "8. 30-Minute SLA & No-Show Guarantee: If the partner fails to arrive within 30-40 minutes of order acceptance or is unavailable, you can cancel the service immediately.",
      "9. 5/7-Day & Monthly Plan Cancellation: If you are unable to complete a multi-day or monthly plan for any reason, you will only be charged pro-rata for utilized services. Note: If a 30-day plan is cancelled after 20 days, no refund is applicable.",
      "10. 100% Wallet Refund & Instant Withdrawal: All eligible refunds are credited immediately to your DoorSeva Wallet, transferable 24x7 directly to your Bank Account or UPI."
    ],

    cancelModalTitle: "Cancel Subscription Plan",
    cancelModalDesc: "You will only be charged on a pro-rata basis for services utilized so far. (Cancellation after 20 days on a 30-day plan yields no refund). Please state reason:",
    cancelReasonLabel: "Reason for Cancellation",
    cancelReasonPlaceholder: "Please describe why you are cancelling this plan...",
    cancelBack: "Go Back",
    cancelConfirm: "Confirm Cancellation",

    aboutTitle: "About DoorSeva",
    aboutDesc: "DoorSeva is an on-demand verified home & healthcare services marketplace operated by Sachint Enterprises. Certified professionals delivered directly to your doorstep.",
    legalTitle: "Legal Entity:",
    servicesFleetTitle: "Services Fleet",
    policiesTitle: "Legal & Compliance",
    officeTitle: "Support & Office",
    helplineTitle: "Helpline:",
    emailTitle: "Official Email:",
    secureBadge: "🔒 100% Secured Payments Powered by Razorpay",

    cityTitle: "Delivery Location Verification",
    cityDesc: "Enter your 6-digit delivery PIN code:",
    cityGps: "🎯 Use Device Live GPS",
    cityCancel: "Cancel",
    cityVerify: "Verify & Lock PIN",

    profTitle: "Edit Profile Details",
    profLabel: "Full Name",
    profCancel: "Cancel",
    profSave: "Save Changes"
  },
  hi: {
    appName: "डोरसेवा",
    allServicesTab: "सभी सेवाएं",
    healthTab: "हेल्थ सर्विसेज",
    beautyTab: "ब्यूटी व सैलून",
    maintenanceTab: "होम मेंटेनेंस",
    maidCookTab: "होम कुक व मेड",
    detectingLocation: "लाइव स्थान खोज रहे हैं...",
    connectingGps: "मैपल्स सैटेलाइट से जुड़ रहे हैं...",
    autoGpsBtn: "🎯 ऑटो GPS",
    searchPlaceholder: "नर्स, इलेक्ट्रीशियन, काम वाली बाई, सैलून खोजें...",
    verifiedHeading: "अखिल भारतीय सत्यापित सेवा नेटवर्क",
    verifiedBadge: "● 100% सत्यापित नेटवर्क",
    viewServices: "सेवाएं देखें",
    certifiedBadge: "⚡ डोरस्टेप प्रमाणित",
    bookNow: "⚡ अभी बुक करें",
    addToCart: "🛒 + कार्ट में जोड़ें",
    cartTitle: "🛒 ऑर्डर समरी व कार्ट",
    cartEmpty: "आपकी कार्ट अभी खाली है। कृपया सेवाएँ चुनें।",
    subtotalLabel: "कुल सेवा शुल्क:",
    onlineDiscountLabel: "ऑनलाइन 20% विशेष छूट:",
    netPayableLabel: "कुल देय राशि:",
    backToAll: "← सभी सेवाओं पर वापस",
    backBtn: "← वापस",
    servicesCount: "सेवाएं उपलब्ध",
    totalPayable: "कुल देय राशि:",
    fullName: "ग्राहक का पूरा नाम",
    phoneNum: "मोबाइल नंबर",
    deliveryAddress: "सेवा वितरण पता व लैंडमार्क",
    requirementLabel: "सेवा की आवश्यकता व विवरण (A to Z Description)",
    requirementPlaceholder: "अपनी ज़रूरत, विशेष निर्देश या समस्या का विवरण यहाँ लिखें...",
    uploadLabel: "दस्तावेज़ / फ़ोटो अपलोड करें (वैकल्पिक)",
    uploadBtnText: "दस्तावेज़ / फ़ोटो अपलोड करें",
    uploadSubText: "फोटो चुनने के लिए यहाँ क्लिक करें (JPG, PNG)",
    codOption: "कैश ऑन डिलीवरी (मानक बेस प्राइस)",
    onlineOption: "ऑनलाइन भुगतान (तुरंत 20% छूट व 100% सुरक्षित एस्क्रो)",
    confirmBtn: "पुष्टि करें व सेवा बुक करें",
    bookingConfirmed: "बुकिंग सफलतापूर्वक दर्ज हो गई!",
    orderRef: "ऑर्डर संदर्भ संख्या:",
    secretPinTitle: "आपका 4-अंकीय गुप्त पिन",
    secretPinSub: "*यह गुप्त पिन केवल कार्य संतोषजनक पूर्ण होने के बाद ही पार्टनर को बताएं",
    viewBillBtn: "📄 डिजिटल जीएसटी बिल देखें व डाउनलोड करें",
    returnHome: "मुख्य पृष्ठ पर लौटें",
    ordersWallet: "ऑर्डर व वॉलेट",
    myBookings: "मेरी बुकिंग्स व इतिहास",
    myBookingsSub: "सक्रिय ऑर्डर, बिल व गुप्त पिन",
    wallet: "डोरसेवा वॉलेट",
    walletSub: "रिफंड व निकासी बैलेंस",
    partnership: "पार्टनरशिप व रोजगार",
    becomePartner: "डोरसेवा पार्टनर बनें",
    becomePartnerSub: "नर्स, इलेक्ट्रीशियन, प्लंबर या मिस्त्री के रूप में जुड़ें",
    helpdeskTitle: "सहायता व नीतियां",
    helpDesk: "हेल्प व सपोर्ट डेस्क",
    helpDeskSub: "24x7 व्हाट्सएप चैट व हेल्पलाइन सहायता",
    terms: "नियम व शर्तें",
    privacy: "गोपनीयता नीति",
    editProfile: "प्रोफाइल व फोटो बदलें",
    editProfileSub: "नाम, फोटो व विवरण अपडेट करें",
    logOut: "लॉग आउट करें",
    logOutSub: "खाता बदलें या दोबारा लॉगिन करें",
    deleteAccount: "खाता व डेटा हटाएं",
    deleteAccountSub: "गूगल प्ले नीति अनुपालन अनुरोध",

    medTitle: "🩺 क्लीनिकल होम नर्सिंग व सेवा शर्तें",
    medConsent: "मैं सभी क्लीनिकल, पेमेंट, रिफंड व कैंसिलेशन नियमों को समझता/समझती हूँ और सहमत हूँ",
    medCancel: "रद्द करें",
    medProceed: "प्लान देखें →",
    medPoints: [
      "1. इंजेक्शन व AST टेस्ट: पहली बार कोई भी एंटीबायोटिक इंजेक्शन लगवाने से पहले AST (सेंसिटिविटी टेस्ट) अनिवार्य है; बिना टेस्ट नया इंजेक्शन नहीं लगाया जाएगा।",
      "2. प्रिस्क्रिप्शन अनिवार्यता: सभी इंजेक्शन (IM/IV), कैथेटर, राइल्स ट्यूब व सक्शन प्रक्रिया केवल रजिस्टर्ड डॉक्टर के पर्चे (Prescription) या मरीज की सहमति पर ही की जाएगी।",
      "3. ड्रेसिंग व ट्यूब केयर: स्टेराइल घाव ड्रेसिंग, Foley's कैथेटर व राइल्स ट्यूब (RT) डालने के दौरान मरीज को स्थिर रखना आवश्यक है; किसी भी गंभीर जटिलता में तुरंत डॉक्टर से संपर्क करें।",
      "4. सक्शन व आपातकाल: म्यूकस सक्शन केवल प्रशिक्षित नर्सिंग स्टाफ द्वारा किया जाएगा; किसी भी गंभीर इमरजेंसी या सांस की रुकावट में मरीज को सीधे नजदीकी अस्पताल ले जाएं।",
      "5. 24-घंटे लाइव-इन नियम: 24-घंटे ड्यूटी वाली किसी भी सेवा में सर्विस पार्टनर का 3 समय का सादा भोजन व सुरक्षित विश्राम स्थान ग्राहक द्वारा उपलब्ध कराया जाएगा।",
      "6. एडवांस कैश सख्त निषेध (No Advance Cash): पार्टनर को काम से पहले कोई भी एडवांस कैश न दें; काम 100% पूरा होने पर ही नकद दें। यदि आप एडवांस कैश देते हैं, तो उसके जिम्मेदार आप स्वयं होंगे, डोरसेवा नहीं। डोरसेवा केवल ऑनलाइन भुगतान को ही रिटर्न या रिफंड करती है।",
      "7. कैंसिलेशन नियम: सर्विस प्रोवाइडर के घर से निकलने (डिस्पैच होने) के बाद बुकिंग कैंसिल या रिफंड नहीं होगी।",
      "8. 30 मिनट डिले व नो-शो पॉलिसी: यदि प्रोवाइडर बुकिंग स्वीकार करने के बाद 30-40 मिनट में आपके घर नहीं पहुंचता है या सेवा उपलब्ध नहीं होती, तो आप तुरंत बुकिंग कैंसिल कर सकते हैं।",
      "9. 30-दिन प्लान कैंसिलेशन नियम: यदि आप किसी भी कारण से 30-दिन प्लान 20 दिन से पहले कैंसिल करते हैं, तो आपसे केवल उपयोग की गई सर्विस का ही आनुपातिक पैसा लिया जाएगा। यदि 20 दिन पूरे हो चुके हैं, तो कोई रिफंड नहीं मिलेगा।",
      "10. 100% वॉलेट रिफंड व विड्रॉल: शेष पूरा रिफंड आपके डोरसेवा वॉलेट में जमा होगा, जिसे आप 24x7 कभी भी सीधे अपने बैंक खाते या UPI में निकाल सकते हैं।"
    ],

    cancelModalTitle: "सब्सक्रिप्शन प्लान कैंसिलेशन",
    cancelModalDesc: "आपसे केवल उपयोग की गई सेवाओं का ही शुल्क लिया जाएगा। (30-दिन प्लान में 20 दिन बाद कैंसिल करने पर कोई रिफंड नहीं मिलेगा)। कृपया कारण लिखें:",
    cancelReasonLabel: "कैंसिलेशन का कारण लिखें",
    cancelReasonPlaceholder: "कृपया विस्तार से बताएं कि आप यह प्लान क्यों कैंसिल कर रहे हैं...",
    cancelBack: "वापस जाएं",
    cancelConfirm: "कैंसिलेशन कन्फर्म करें",

    aboutTitle: "डोरसेवा के बारे में",
    aboutDesc: "डोरसेवा सचिंत एंटरप्राइजेज द्वारा संचालित एक ऑन-डिमांड सत्यापित होम व हेल्थकेयर सेवा मंच है। प्रमाणित प्रोफेशनल्स सीधे आपके घर तक पहुंचाए जाते हैं।",
    legalTitle: "कानूनी इकाई:",
    servicesFleetTitle: "सेवा नेटवर्क",
    policiesTitle: "कानूनी व नीतियां",
    officeTitle: "सहायता व कार्यालय",
    helplineTitle: "हेल्पलाइन:",
    emailTitle: "आधिकारिक ईमेल:",
    secureBadge: "🔒 100% सुरक्षित भुगतान रेजरपे द्वारा संचालित",

    cityTitle: "डिलीवरी लोकेशन सत्यापन",
    cityDesc: "अपना 6-अंकीय पिन कोड दर्ज करें:",
    cityGps: "🎯 डिवाइस लाइव GPS उपयोग करें",
    cityCancel: "रद्द करें",
    cityVerify: "पिन कोड लॉक करें",

    profTitle: "प्रोफाइल विवरण बदलें",
    profLabel: "पूरा नाम",
    profCancel: "रद्द करें",
    profSave: "बदलाव सुरक्षित करें"
  }
};

// Global Application State
const state = {
  view: "MAIN_CATEGORIES",
  activeCategoryKey: null,
  activeCategory: null,
  activeSubKey: null,
  activeSubCategory: null,
  selectedSubCategories: [],
  cartItems: [],
  selectedPaymentMethod: "COD",
  scheduledDateStr: new Date().toISOString().split('T')[0],
  searchQuery: "",
  activeFilterCluster: "ALL",
  currentLang: localStorage.getItem("doorseva_lang") || "en",
  termsAccepted: localStorage.getItem("doorseva_terms_accepted") === "true",
  currentUser: {
    name: localStorage.getItem("doorseva_user_name") || "",
    phone: localStorage.getItem("doorseva_user_phone") || "",
    email: localStorage.getItem("doorseva_user_email") || "",
    gender: localStorage.getItem("doorseva_user_gender") || "Not Specified",
    age: localStorage.getItem("doorseva_user_age") || "",
    address: localStorage.getItem("doorseva_user_address") || "",
    isLoggedIn: localStorage.getItem("doorseva_user_logged_in") === "true"
  },
  savedPayoutDetails: JSON.parse(localStorage.getItem("doorseva_payout_details") || "null"),
  userCustomRequirement: "",
  uploadedPrescriptionBase64: null,
  uploadedPrescriptionName: "",
  currentLocation: {
    landmark: "Detecting Live Location...",
    secondary: "Connecting to Mappls Satellite...",
    address: "All-India Service Network",
    pincode: "110001",
    district: "All-India",
    tierKey: "tier_4",
    multiplier: 1.0,
    distanceKm: 2.5,
    zoneText: "Standard Rate"
  },
  walletBalance: parseFloat(localStorage.getItem("doorseva_user_wallet") || "0"),
  bookingResult: null,
  bookingsList: JSON.parse(localStorage.getItem("doorseva_orders") || "[]"),
  activeCancelOrderId: null,
  sliderIndex: 0,
  sliderInterval: null,

  modalState: {
    catKey: null,
    subKey: null,
    selectedOption: null,
    quantity: 1
  }
};

function t(key) {
  const lang = state.currentLang || "en";
  if (typeof key === "object" && key !== null) {
    return key[lang] || key["en"] || key["hi"] || "";
  }
  if (I18N[lang] && I18N[lang][key]) return I18N[lang][key];
  if (I18N["en"] && I18N["en"][key]) return I18N["en"][key];
  return key || "";
}

// Option Finder
function findOptionById(subKey, optId) {
  if (!state.activeCategory || !state.activeCategory.subCategories) return null;
  const sub = state.activeCategory.subCategories[subKey];
  if (!sub || !sub.options) return null;
  return sub.options.find(o => o.id === optId) || null;
}

// ==========================================
// FAST2SMS REAL NETWORK SMS OTP ENGINE
// ==========================================
let activeRealOtp = null;
let otpVerifyMobileTarget = null;

window.triggerRealSmsOtp = async function(phoneInput) {
  const cleanPhone = (phoneInput || "").replace(/\D/g, "");
  if (cleanPhone.length !== 10) {
    alert(state.currentLang === 'hi' ? "कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number.");
    return false;
  }

  activeRealOtp = Math.floor(100000 + Math.random() * 900000).toString();
  otpVerifyMobileTarget = cleanPhone;

  // Show Toast
  const toast = document.createElement("div");
  toast.id = "fast2smsToast";
  toast.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#0F172A; color:#22C55E; padding:10px 18px; border-radius:8px; font-size:12px; font-weight:800; z-index:99999; box-shadow:0 4px 12px rgba(0,0,0,0.3); border:1px solid #22C55E;";
  toast.textContent = state.currentLang === 'hi' ? "SMS भेजा जा raha hai..." : "Sending Real SMS via Network...";
  document.body.appendChild(toast);

  try {
    const apiUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API_KEY}&variables_values=${activeRealOtp}&route=otp&numbers=${cleanPhone}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    
    const existingToast = document.getElementById("fast2smsToast");
    if (existingToast) existingToast.remove();

    if (data.return === true || (data.message && data.message[0] && data.message[0].toLowerCase().includes("success"))) {
      openOtpVerificationModal(cleanPhone);
      return true;
    } else {
      alert("SMS Gateway Notice: " + (data.message ? data.message[0] : "Dispatched"));
      openOtpVerificationModal(cleanPhone);
      return true;
    }
  } catch (err) {
    const existingToast = document.getElementById("fast2smsToast");
    if (existingToast) existingToast.remove();
    console.warn("Fast2SMS API Trigger:", err);
    openOtpVerificationModal(cleanPhone);
    return true;
  }
};

window.openOtpVerificationModal = function(phone) {
  let modal = document.getElementById("realOtpVerifyModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "realOtpVerifyModal";
    modal.className = "account-drawer-overlay";
    modal.style.cssText = "display:flex; align-items:center; justify-content:center; padding:16px; z-index:10000;";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card-box" style="max-width:390px; text-align:center; padding:20px;">
      <div style="font-size:36px; margin-bottom:8px;">📱</div>
      <h3 style="color:#0A192F; font-size:16px; font-weight:800; margin-bottom:4px;">
        ${state.currentLang === 
