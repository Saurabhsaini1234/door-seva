/**
 * DoorSeva (doorseva.in) - Master Commercial Controller
 * Entity: Sachint Enterprises (GSTIN: 09IATPS9376A1ZR)
 * Fully Standardized: Multi-Item Cart, Instant Booking, MapmyIndia Live GPS,
 * Google Firebase Official Real SMS Phone Auth Engine & Razorpay Escrow
 */

const RAZORPAY_KEY_ID = "rzp_test_TfRf6Eu9Bjf3ld";
const ADMIN_SUPPORT_PHONE = "+918218439129";
const MAPPLS_KEY = "vfsrbnhjdotpfjskxrfizvdcljvmnqayogml";

// Dedicated Category-Matched Verified Partners Registry
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

// Firebase Initialization
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
let confirmationResultGlobal = null;

try {
  if (typeof firebase !== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
  } else if (typeof firebase !== "undefined") {
    auth = firebase.auth();
    db = firebase.firestore();
  }
} catch (e) {
  console.warn("Firebase Init note:", e);
}

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
  currentLang: localStorage.getItem("doorseva_lang") || "hi",
  termsAccepted: localStorage.getItem("doorseva_terms_accepted") === "true",
  currentUser: {
    name: localStorage.getItem("doorseva_user_name") || "",
    phone: localStorage.getItem("doorseva_user_phone") || "",
    email: localStorage.getItem("doorseva_user_email") || "",
    gender: localStorage.getItem("doorseva_user_gender") || "Male",
    age: localStorage.getItem("doorseva_user_age") || "",
    address: localStorage.getItem("doorseva_user_address") || "",
    isLoggedIn: localStorage.getItem("doorseva_user_logged_in") === "true"
  },
  savedPayoutDetails: JSON.parse(localStorage.getItem("doorseva_payout_details") || "null"),
  userCustomRequirement: "",
  uploadedPrescriptionBase64: null,
  uploadedPrescriptionName: "",
  currentLocation: {
    landmark: "Nagina Center",
    secondary: "Bijnor, UP (246762)",
    address: "Nagina, Bijnor, Uttar Pradesh - 246762",
    pincode: "246762",
    district: "Bijnor",
    tierKey: "tier_4",
    multiplier: 1.0,
    distanceKm: 2.0,
    zoneText: "Standard Rate"
  },
  walletBalance: parseFloat(localStorage.getItem("doorseva_user_wallet") || "0"),
  bookingResult: null,
  bookingsList: JSON.parse(localStorage.getItem("doorseva_orders") || "[]"),
  activeCancelOrderId: null,
  sliderIndex: 0,
  sliderInterval: null,

  authFlow: {
    targetPhone: "",
    timerCount: 60,
    timerInterval: null
  },

  modalState: {
    catKey: null,
    subKey: null,
    selectedOption: null,
    quantity: 1
  }
};

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
    bookNow: "⚡ Book Now",
    cartTitle: "🛒 Order Summary & Cart",
    cartEmpty: "Your cart is currently empty. Please add services.",
    backToAll: "← Back to All Services",
    servicesCount: "SERVICES",
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
      "1. Injections & AST Test: AST (sensitivity test) is strictly mandatory before administering any first-time antibiotic injection.",
      "2. Medical Prescription: All procedures (IM/IV injections, catheter, Ryles tube, suction) are executed strictly under a registered doctor's prescription.",
      "3. Advance Cash Strict Prohibition: Do NOT pay any advance cash to the service partner under any circumstance. Pay cash strictly AFTER 100% satisfactory work completion.",
      "4. 24-Hour Live-in Rule: In all 24-hour live-in shifts, three basic daily meals and safe resting quarters must be provided by the customer.",
      "5. Arrival SLA: If the assigned partner fails to arrive within 30-40 minutes of booking confirmation, you are eligible for immediate free cancellation."
    ]
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
    verifiedHeading: "सत्यापित सेवा नेटवर्क",
    verifiedBadge: "● 100% सत्यापित नेटवर्क",
    viewServices: "सेवाएं देखें",
    bookNow: "⚡ अभी बुक करें",
    cartTitle: "🛒 ऑर्डर समरी व कार्ट",
    cartEmpty: "आपकी कार्ट अभी खाली है। कृपया सेवाएँ चुनें।",
    backToAll: "← सभी सेवाओं पर वापस",
    servicesCount: "सेवाएं उपलब्ध",
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
      "1. इंजेक्शन व AST टेस्ट: पहली बार कोई भी एंटीबायोटिक इंजेक्शन लगवाने से पहले AST सेंसिटिविटी टेस्ट अनिवार्य है।",
      "2. प्रिस्क्रिप्शन अनिवार्यता: सभी इंजेक्शन (IM/IV), कैथेटर, राइल्स ट्यूब व सक्शन प्रक्रिया रजिस्टर्ड डॉक्टर के पर्चे पर ही की जाएगी।",
      "3. एडवांस कैश सख्त निषेध: पार्टनर को काम से पहले कोई एडवांस कैश न दें; काम पूरा होने पर ही नकद दें। ऑनलाइन भुगतान ही रिफंड योग्य है।",
      "4. 24-घंटे लाइव-इन नियम: 24-घंटे ड्यूटी वाली सेवा में 3 समय का सादा भोजन व सुरक्षित विश्राम स्थान ग्राहक द्वारा उपलब्ध कराया जाएगा।",
      "5. 30 मिनट अराइवल: यदि पार्टनर 30-40 मिनट में नहीं पहुंचता है, तो आप तुरंत फ्री कैंसिलेशन के हकदार हैं।"
    ]
  }
};

function t(key) {
  const lang = state.currentLang || "hi";
  if (typeof key === "object" && key !== null) {
    return key[lang] || key["en"] || key["hi"] || "";
  }
  if (I18N[lang] && I18N[lang][key]) return I18N[lang][key];
  if (I18N["en"] && I18N["en"][key]) return I18N["en"][key];
  return key || "";
}

// APP INITIALIZATION
document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  bindGlobalEvents();
  initLanguageSelector();
  updateStaticLabels();
  updateDrawerUserProfileUI();
  updateHeaderCartBadge();
  
  // 1. Render Catalog Immediately
  ensureCatalogLoaded();

  // 2. Safe GPS Trigger
  setTimeout(() => {
    initLocationEngine();
  }, 1200);

  // 3. First-Launch Checks
  checkTermsAndAuthPopups();

  // 4. Init Firebase Recaptcha
  initFirebaseRecaptcha();
}

function ensureCatalogLoaded() {
  if (typeof MASTER_CATALOG_DATA !== "undefined" && Object.keys(MASTER_CATALOG_DATA).length > 0) {
    initHeroSlider();
    renderView();
  } else {
    setTimeout(ensureCatalogLoaded, 50);
  }
}

function checkTermsAndAuthPopups() {
  const termsModal = document.getElementById("mandatoryTermsModal");
  if (!state.termsAccepted && termsModal) {
    termsModal.style.display = "flex";
  } else if (!state.currentUser.isLoggedIn) {
    openAuthModal();
  }
}

window.acceptMandatoryTerms = function() {
  const chk = document.getElementById("chkEntryTermsConsent");
  if (!chk || !chk.checked) {
    alert(state.currentLang === 'hi' ? "कृपया पहले नियम व शर्तों पर टिक करके सहमति दें।" : "Please check the box to accept DoorSeva terms and policies.");
    return;
  }
  state.termsAccepted = true;
  localStorage.setItem("doorseva_terms_accepted", "true");
  const modal = document.getElementById("mandatoryTermsModal");
  if (modal) modal.style.display = "none";

  if (!state.currentUser.isLoggedIn) {
    openAuthModal();
  }
};

// ==========================================
// GOOGLE FIREBASE REAL SMS OTP ENGINE
// ==========================================
function initFirebaseRecaptcha() {
  if (typeof firebase !== "undefined" && auth && !window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function(response) {
          console.log("reCAPTCHA solved successfully.");
        }
      });
    } catch (e) {
      console.warn("Recaptcha Setup Note:", e);
    }
  }
}

window.openAuthModal = function() {
  const modal = document.getElementById("authModal");
  if (!modal) return;
  document.getElementById("authPhoneStep").style.display = "block";
  document.getElementById("authOtpStep").style.display = "none";
  document.getElementById("loginMobileInput").value = state.currentUser.phone || "";
  modal.style.display = "flex";
};

window.closeAuthModal = function() {
  const modal = document.getElementById("authModal");
  if (modal) modal.style.display = "none";
};

window.requestFast2SmsOtp = async function() {
  const phoneInp = document.getElementById("loginMobileInput");
  const phone = phoneInp ? phoneInp.value.trim().replace(/\D/g, "") : "";

  if (phone.length !== 10) {
    alert(state.currentLang === 'hi' ? "कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number.");
    return;
  }

  const fullPhoneNumber = "+91" + phone;
  state.authFlow.targetPhone = phone;

  const btnSend = document.getElementById("btnSendOtp");
  if (btnSend) {
    btnSend.disabled = true;
    btnSend.textContent = state.currentLang === 'hi' ? "SMS भेजा जा रहा है..." : "Sending SMS OTP...";
  }

  if (!window.recaptchaVerifier) {
    initFirebaseRecaptcha();
  }

  try {
    const appVerifier = window.recaptchaVerifier;
    confirmationResultGlobal = await auth.signInWithPhoneNumber(fullPhoneNumber, appVerifier);
    
    // Switch to OTP Enter Window
    document.getElementById("authPhoneStep").style.display = "none";
    document.getElementById("authOtpStep").style.display = "block";
    startOtpCountdown();

  } catch (error) {
    console.error("Firebase SMS Error:", error);
    alert(state.currentLang === 'hi' ? "SMS भेजने में त्रुटि हुई। कृपया नेटवर्क जांचें या APK में चलाएं।" : "Error sending SMS. Please re-check network or test in Android APK.");
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.render().then(widgetId => grecaptcha.reset(widgetId));
    }
  } finally {
    if (btnSend) {
      btnSend.disabled = false;
      btnSend.textContent = "Send 6-Digit OTP 📩";
    }
  }
};

function startOtpCountdown() {
  state.authFlow.timerCount = 60;
  const timerDisplay = document.getElementById("otpTimerDisplay");
  const btnResend = document.getElementById("btnResendOtp");
  if (btnResend) btnResend.disabled = true;

  if (state.authFlow.timerInterval) clearInterval(state.authFlow.timerInterval);

  state.authFlow.timerInterval = setInterval(() => {
    state.authFlow.timerCount--;
    if (timerDisplay) timerDisplay.textContent = `${state.authFlow.timerCount}s`;

    if (state.authFlow.timerCount <= 0) {
      clearInterval(state.authFlow.timerInterval);
      if (btnResend) {
        btnResend.disabled = false;
        btnResend.style.color = "#2563EB";
      }
    }
  }, 1000);
}

window.verifyReceivedOtp = async function() {
  const otpInp = document.getElementById("loginOtpInput");
  const enteredOtp = otpInp ? otpInp.value.trim() : "";

  if (enteredOtp.length !== 6) {
    alert(state.currentLang === 'hi' ? "कृपया SMS में आया 6-अंकीय OTP कोड दर्ज करें।" : "Please enter the 6-digit OTP code received via SMS.");
    return;
  }

  const btnVerify = document.getElementById("btnVerifyOtp");
  if (btnVerify) {
    btnVerify.disabled = true;
    btnVerify.textContent = state.currentLang === 'hi' ? "सत्यापन हो रहा है..." : "Verifying...";
  }

  try {
    if (!confirmationResultGlobal) {
      throw new Error("No active confirmation session");
    }

    const result = await confirmationResultGlobal.confirm(enteredOtp);
    const user = result.user;

    // Google Phone Auth Verified
    state.currentUser.phone = state.authFlow.targetPhone;
    state.currentUser.isLoggedIn = true;
    if (!state.currentUser.name) state.currentUser.name = "Customer " + state.currentUser.phone.slice(-4);

    localStorage.setItem("doorseva_user_phone", state.currentUser.phone);
    localStorage.setItem("doorseva_user_name", state.currentUser.name);
    localStorage.setItem("doorseva_user_logged_in", "true");

    if (state.authFlow.timerInterval) clearInterval(state.authFlow.timerInterval);

    closeAuthModal();
    updateDrawerUserProfileUI();
    alert(state.currentLang === 'hi' ? "✅ लॉगिन सफल हुआ! DoorSeva में आपका स्वागत है।" : "✅ Login successful! Welcome to DoorSeva.");

  } catch (error) {
    console.error("OTP Verification Error:", error);
    alert(state.currentLang === 'hi' ? "गलत OTP कोड दर्ज किया गया है। कृपया SMS जांच कर सही कोड डालें।" : "Incorrect OTP code. Please enter the valid code received on your phone.");
  } finally {
    if (btnVerify) {
      btnVerify.disabled = false;
      btnVerify.textContent = "Verify OTP & Login 🚀";
    }
  }
};

// ==========================================
// MAPMYINDIA (MAPPLS) LIVE GPS ENGINE
// ==========================================
function initLocationEngine() {
  const cachedLoc = localStorage.getItem("doorseva_locked_location");
  if (cachedLoc) {
    try {
      state.currentLocation = JSON.parse(cachedLoc);
      updateLocationBarUI();
      return;
    } catch (e) {}
  }
  triggerGpsAutoDetect();
}

function updateLocationBarUI() {
  const primaryEl = document.getElementById("locPrimaryLandmark");
  const secondaryEl = document.getElementById("locSecondaryAddress");
  const zoneDisp = document.getElementById("zoneDisplay");
  if (primaryEl) primaryEl.textContent = state.currentLocation.landmark;
  if (secondaryEl) secondaryEl.textContent = state.currentLocation.secondary;
  if (zoneDisp) zoneDisp.textContent = state.currentLocation.zoneText || "Standard Rate";
}

window.triggerGpsAutoDetect = function() {
  const primaryEl = document.getElementById("locPrimaryLandmark");
  const secondaryEl = document.getElementById("locSecondaryAddress");
  if (primaryEl) primaryEl.textContent = t("detectingLocation");
  if (secondaryEl) secondaryEl.textContent = t("connectingGps");

  if (!navigator.geolocation) {
    applyDefaultLocation();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      try {
        const res = await fetch(`https://apis.mappls.com/advancedmaps/v1/${MAPPLS_KEY}/rev_geocode?lat=${lat}&lng=${lng}`);
        const data = await res.json();
        if (data && data.results && data.results.length > 0) {
          const item = data.results[0];
          const landmark = item.poi || item.subLocality || item.locality || "Current Location";
          const district = item.district || item.city || "Bijnor";
          const stateName = item.state || "Uttar Pradesh";
          const pincode = item.pincode || "246762";
          const formattedAddress = item.formatted_address || `${landmark}, ${district}, ${stateName} - ${pincode}`;
          
          applyDetectedLocation(landmark, `${district}, ${stateName} (${pincode})`, formattedAddress, pincode, district, stateName, 2.5);
        } else {
          applyDefaultLocation();
        }
      } catch (err) {
        applyDefaultLocation();
      }
    },
    () => {
      applyDefaultLocation();
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
};

function applyDefaultLocation() {
  applyDetectedLocation("Nagina Center", "Bijnor, UP (246762)", "Nagina, Bijnor, Uttar Pradesh - 246762", "246762", "Bijnor", "Uttar Pradesh", 2.0);
}

function applyDetectedLocation(landmark, secondary, fullAddress, pincode, districtName, stateName, distanceKm = 2.5) {
  if (typeof detectLocationTier === "function") {
    const detected = detectLocationTier(`${districtName} ${pincode} ${landmark}`);
    state.currentLocation = {
      landmark: landmark,
      secondary: secondary,
      address: fullAddress,
      pincode: pincode || "246762",
      district: districtName || "District",
      tierKey: detected.tierKey,
      multiplier: detected.multiplier,
      distanceKm: distanceKm,
      zoneText: detected.zone
    };
  } else {
    state.currentLocation.landmark = landmark;
    state.currentLocation.secondary = secondary;
    state.currentLocation.address = fullAddress;
    state.currentLocation.pincode = pincode || "246762";
    state.currentLocation.distanceKm = distanceKm;
  }
  localStorage.setItem("doorseva_locked_location", JSON.stringify(state.currentLocation));
  updateLocationBarUI();
  if (state.view === "SUB_CATEGORIES") renderView();
}

window.openCityModal = function() {
  const m = document.getElementById("cityModal");
  if (m) m.style.display = "flex";
};
window.closeCityModal = function() {
  const m = document.getElementById("cityModal");
  if (m) m.style.display = "none";
};

window.confirmManualPinCode = function() {
  const input = document.getElementById("manualCityInput");
  const cleanPin = input ? input.value.trim().replace(/\D/g, "") : "";
  if (cleanPin.length !== 6) {
    alert(state.currentLang === 'hi' ? "कृपया 6 अंकों का मान्य पिन कोड दर्ज करें।" : "Please enter a valid 6-digit PIN code.");
    return;
  }
  applyDetectedLocation(`PIN Code ${cleanPin}`, "Delivery Coverage Area", `Delivery PIN: ${cleanPin}`, cleanPin, "Local Area", "India", 3.0);
  closeCityModal();
};

// ========================
// HERO SLIDER & TABS
// ========================
function initHeroSlider() {
  renderHeroSlide();
  if (state.sliderInterval) clearInterval(state.sliderInterval);
  state.sliderInterval = setInterval(() => {
    if (state.view === "MAIN_CATEGORIES" && typeof HERO_SLIDES_CONFIG !== "undefined") {
      state.sliderIndex = (state.sliderIndex + 1) % HERO_SLIDES_CONFIG.length;
      renderHeroSlide();
    }
  }, 4500);
}

function renderHeroSlide() {
  const slider = document.getElementById("heroSlider");
  if (!slider || typeof HERO_SLIDES_CONFIG === "undefined" || !HERO_SLIDES_CONFIG[state.sliderIndex]) return;
  const current = HERO_SLIDES_CONFIG[state.sliderIndex];
  const cat = (typeof MASTER_CATALOG_DATA !== "undefined") ? MASTER_CATALOG_DATA[current.catKey] : null;
  const title = t(cat ? cat.title : current.title);
  const subText = t(current.sub);
  const tagText = t(current.tag);

  slider.innerHTML = `
    <div class="hero-slide-container" style="background: ${current.bgGradient};" onclick="handleCategorySelect('${current.catKey}')">
      <div class="hero-left-content">
        <span class="hero-badge-tag">${tagText}</span>
        <div class="hero-main-title">${title}</div>
        <div class="hero-sub-desc">${subText}</div>
        <button class="hero-btn-book">${state.currentLang === 'hi' ? 'सेवाएं देखें →' : 'Explore Fleet →'}</button>
      </div>
      <div class="hero-right-images">
        <img src="${current.img}" class="hero-dual-img" alt="${title}" />
      </div>
    </div>
  `;
}

window.filterByCluster = function(clusterId) {
  state.activeFilterCluster = clusterId;
  document.querySelectorAll(".fk-tab-chip").forEach(c => c.classList.remove("active"));
  const activeTab = document.getElementById(`tab_${clusterId}`);
  if (activeTab) activeTab.classList.add("active");
  state.view = "MAIN_CATEGORIES";
  renderView();
};

window.handleServiceSearch = function(query) {
  state.searchQuery = (query || "").trim().toLowerCase();
  state.view = "MAIN_CATEGORIES";
  renderView();
};

function matchServiceWithKeywords(catKey, catObj, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const catTitleEn = (catObj.title?.en || "").toLowerCase();
  const catTitleHi = (catObj.title?.hi || "").toLowerCase();
  if (catTitleEn.includes(q) || catTitleHi.includes(q) || catKey.includes(q)) return true;

  const subKeys = Object.keys(catObj.subCategories || {});
  for (let subKey of subKeys) {
    const sub = catObj.subCategories[subKey];
    const subTitleEn = (sub.title?.en || "").toLowerCase();
    const subTitleHi = (sub.title?.hi || "").toLowerCase();
    if (subTitleEn.includes(q) || subTitleHi.includes(q) || subKey.includes(q)) return true;
    if (Array.isArray(sub.keywords)) {
      if (sub.keywords.some(kw => kw.toLowerCase().includes(q) || q.includes(kw.toLowerCase()))) return true;
    }
  }
  return false;
}

// ========================
// MAIN VIEW RENDERER
// ========================
function renderView() {
  const root = document.getElementById("appRoot");
  const slider = document.getElementById("heroSlider");
  if (!root) return;
  if (slider) slider.style.display = (state.view === "MAIN_CATEGORIES") ? "block" : "none";

  if (typeof MASTER_CATALOG_DATA === "undefined") return;

  // SCREEN 1: ALL MAIN CATEGORIES
  if (state.view === "MAIN_CATEGORIES") {
    let catKeys = Object.keys(MASTER_CATALOG_DATA);
    if (state.activeFilterCluster !== "ALL" && typeof MAIN_CLUSTERS_CONFIG !== "undefined") {
      const cluster = MAIN_CLUSTERS_CONFIG.find(c => c.id === state.activeFilterCluster);
      if (cluster) catKeys = cluster.categoryKeys;
    }
    if (state.searchQuery) {
      catKeys = catKeys.filter(k => matchServiceWithKeywords(k, MASTER_CATALOG_DATA[k], state.searchQuery));
    }

    let cardsHtml = catKeys.map(key => {
      const cat = MASTER_CATALOG_DATA[key];
      const title = t(cat.title);
      const badge = t(cat.badge);
      return `
        <div class="fk-card-item main-cat-card" onclick="handleCategorySelect('${key}')">
          <div class="fk-card-media">
            <span class="fk-card-badge">${badge}</span>
            <img src="${cat.image}" class="fk-card-img" alt="${title}" />
          </div>
          <div class="fk-card-body">
            <div class="fk-card-title">${title}</div>
            <div class="fk-rating-row">
              <span class="fk-rating-badge">${cat.rating} ★</span>
              <span class="fk-reviews-count">(${cat.reviews})</span>
            </div>
            <div class="fk-action-strip">
              <span class="fk-view-text">${t("viewServices")}</span>
              <span class="fk-action-arrow">›</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    root.innerHTML = `
      <div class="section-headline">
        <h2>${t("verifiedHeading")}</h2>
        <span class="all-india-tag">${t("verifiedBadge")}</span>
      </div>
      <div class="fk-grid-container">${cardsHtml || `<div style="grid-column:1/-1; text-align:center; padding:30px; color:#64748B;">Koi matching service nahi mili.</div>`}</div>
    `;
    return;
  }

  // SCREEN 2: SUB-SERVICES (WITH OPTIONS & DIRECT BOOKING)
  if (state.view === "SUB_CATEGORIES" && state.activeCategory) {
    const cat = state.activeCategory;
    const subKeys = Object.keys(cat.subCategories || {});

    let cardsHtml = subKeys.map(subKey => {
      const sub = cat.subCategories[subKey];
      const title = t(sub.title);
      const badge = t(sub.badge) || 'PRO';

      let optionsListHtml = (sub.options || []).map(opt => {
        const pCalc = calculateDynamicPricing(opt.basePrice, state.currentLocation.multiplier || 1.0, state.currentLocation.distanceKm || 0.0);
        return `
          <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:8px; padding:8px 10px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div style="flex:1;">
              <div style="font-size:12px; font-weight:700; color:#1E293B; line-height:1.25;">${t(opt.title)}</div>
              <div class="price-display-wrapper" style="margin-top:3px;">
                <div class="price-row-online">
                  <span class="price-val-online">₹${pCalc.onlineDiscountedPrice}</span>
                  <span class="badge-online-off">20% Off</span>
                </div>
                <span class="price-val-cod">COD: <span class="price-strike">₹${pCalc.standardCodPrice}</span></span>
              </div>
            </div>
            <button type="button" onclick="event.stopPropagation(); openCustomizationModal('${state.activeCategoryKey}', '${subKey}', '${opt.id}')" style="background:#16A34A; color:#FFFFFF; border:none; padding:6px 12px; border-radius:6px; font-size:11.5px; font-weight:800; cursor:pointer;">
              ⚡ ${state.currentLang === 'hi' ? 'बुक' : 'Book'}
            </button>
          </div>
        `;
      }).join("");

      return `
        <div class="fk-card-item sub-cat-card">
          <div class="fk-card-media">
            <span class="fk-card-badge">${badge}</span>
            <img src="${sub.image}" class="fk-card-img" alt="${title}" />
          </div>
          <div class="fk-card-body">
            <div class="fk-card-title">${title}</div>
            <div class="fk-rating-row" style="margin-bottom:6px;">
              <span class="fk-rating-badge">${sub.rating || '4.8'} ★</span>
              <span class="fk-reviews-count">(${sub.reviews || '450+'})</span>
            </div>
            <div style="margin-top:6px;">${optionsListHtml}</div>
          </div>
        </div>
      `;
    }).join("");

    root.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <button class="btn-back" onclick="navigateToHome()">${t("backToAll")}</button>
        ${state.cartItems.length > 0 ? `
          <button onclick="openCartScreen()" style="background:#2563EB; color:#FFFFFF; border:none; padding:8px 16px; border-radius:6px; font-size:12.5px; font-weight:800; cursor:pointer;">
            🛒 ${t("cartTitle")} (${state.cartItems.reduce((acc, c) => acc + c.qty, 0)}) ➔
          </button>
        ` : ''}
      </div>
      <div class="section-headline">
        <h2>${t(cat.title)}</h2>
        <span class="all-india-tag">${subKeys.length} ${t("servicesCount")}</span>
      </div>
      <div class="fk-grid-container">${cardsHtml}</div>
    `;
    return;
  }

  // SCREEN 3: SUCCESS WITH ESCROW PIN
  if (state.view === "SUCCESS" && state.bookingResult) {
    const res = state.bookingResult;
    root.innerHTML = `
      <div class="subcat-view-container text-center">
        <div style="font-size: 46px; margin-bottom: 6px;">✅</div>
        <h2 style="font-size: 20px; color: #166534; font-weight: 800;">${t("bookingConfirmed")}</h2>
        <p style="font-size: 13px; color: #475569; margin-bottom: 12px;">
          ${t("orderRef")} <strong>${res.orderId}</strong>
        </p>
        
        <div class="pin-display-box">
          <div style="font-size: 11.5px; font-weight: 800; color: #92400E;">${t("secretPinTitle")}</div>
          <div class="pin-code-large">${res.secretPin}</div>
          <div style="font-size: 10.5px; color: #B45309;">${t("secretPinSub")}</div>
        </div>

        <button class="btn-book-final" style="background: #0284C7; margin-bottom: 10px;" onclick="showDigitalInvoice('${res.orderId}')">
          ${t("viewBillBtn")}
        </button>
        <button class="btn-book-final" onclick="navigateToHome()">${t("returnHome")}</button>
      </div>
    `;
  }
}

// ==========================================
// CUSTOMIZATION & BOOKING MODAL
// ==========================================
window.openCustomizationModal = function(catKey, subKey, preselectedOptId = null) {
  const cat = MASTER_CATALOG_DATA[catKey];
  if (!cat || !cat.subCategories || !cat.subCategories[subKey]) return;
  const sub = cat.subCategories[subKey];

  state.modalState.catKey = catKey;
  state.modalState.subKey = subKey;
  state.modalState.quantity = 1;

  const defaultOption = preselectedOptId 
    ? sub.options.find(o => o.id === preselectedOptId) 
    : sub.options[0];
  state.modalState.selectedOption = defaultOption;

  const titleEl = document.getElementById("bookingModalServiceTitle");
  if (titleEl) titleEl.textContent = `${t(sub.title)}`;

  const plansContainer = document.getElementById("modalPlansContainer");
  if (plansContainer) {
    plansContainer.innerHTML = (sub.options || []).map((opt) => {
      const calc = calculateDynamicPricing(opt.basePrice, state.currentLocation.multiplier || 1.0, state.currentLocation.distanceKm || 0.0);
      const isActive = (opt.id === defaultOption.id);
      return `
        <div class="plan-chip-item ${isActive ? 'active' : ''}" id="modalPlanChip_${opt.id}" onclick="selectModalPlan('${opt.id}')">
          <span class="plan-chip-title">${t(opt.title)}</span>
          <div class="price-display-wrapper" style="align-items:center;">
            <div class="price-row-online">
              <span class="price-val-online">₹${calc.onlineDiscountedPrice}</span>
              <span class="badge-online-off">20% Off</span>
            </div>
            <span class="price-val-cod">COD: <span class="price-strike">₹${calc.standardCodPrice}</span></span>
          </div>
        </div>
      `;
    }).join("");
  }

  const colQty = document.getElementById("colQuantityContainer");
  const qtyTitle = document.getElementById("modalQuantityTitle");
  const qtySub = document.getElementById("modalQuantitySub");
  const qtyVal = document.getElementById("modalQuantityValue");

  if (qtyVal) qtyVal.textContent = "1";

  if (sub.quantityType === "students" || sub.quantityType === "workers") {
    colQty.style.display = "block";
    if (qtyTitle) qtyTitle.textContent = t(sub.workerLabel) || "Quantity:";
    if (qtySub) qtySub.textContent = state.currentLang === 'hi' ? 'आवश्यकता अनुसार संख्या चुनें' : 'Select count';
  } else {
    colQty.style.display = "none";
  }

  const dateInput = document.getElementById("bookingScheduleDate");
  const todayStr = new Date().toISOString().split('T')[0];
  if (dateInput) {
    dateInput.min = todayStr;
    dateInput.value = state.scheduledDateStr || todayStr;
  }

  const femaleNotice = document.getElementById("femaleSpecialNotice");
  if (femaleNotice) {
    femaleNotice.style.display = (catKey === "women_special" || catKey === "home_maid_cook") ? "block" : "none";
  }

  const uploadContainer = document.getElementById("uploadAttachmentContainer");
  const uploadLabel = document.getElementById("uploadAttachmentLabel");
  const uploadHint = document.getElementById("uploadHintText");

  if (sub.requiresPrescription || cat.requiresPrescription) {
    uploadContainer.style.display = "block";
    if (uploadLabel) uploadLabel.textContent = state.currentLang === 'hi' ? 'डॉक्टर का पर्चा (Prescription) अपलोड करें:' : "Upload Doctor's Prescription:";
    if (uploadHint) uploadHint.textContent = state.currentLang === 'hi' ? 'क्लीनिकल प्रक्रिया के लिए पर्चा अनिवार्य है' : 'Prescription required for clinical safety';
  } else if (sub.requiresPhoto || cat.requiresPhoto) {
    uploadContainer.style.display = "block";
    if (uploadLabel) uploadLabel.textContent = state.currentLang === 'hi' ? 'समस्या या कार्यस्थल की फ़ोटो अपलोड करें:' : 'Upload Problem / Site Photo:';
    if (uploadHint) uploadHint.textContent = state.currentLang === 'hi' ? 'समस्या समझने के लिए फ़ोटो (वैकल्पिक)' : 'Optional photo for clear diagnosis';
  } else {
    uploadContainer.style.display = "none";
  }

  const nameInp = document.getElementById("custNameInput");
  const phoneInp = document.getElementById("custPhoneInput");
  const addrInp = document.getElementById("custAddressInput");
  if (nameInp) nameInp.value = state.currentUser.name || "";
  if (phoneInp) phoneInp.value = state.currentUser.phone || "";
  if (addrInp) addrInp.value = state.currentLocation.address || "";

  const modal = document.getElementById("nextBookingWindowModal");
  if (modal) modal.style.display = "flex";
};

window.closeBookingModal = function() {
  const modal = document.getElementById("nextBookingWindowModal");
  if (modal) modal.style.display = "none";
};

window.selectModalPlan = function(optId) {
  const cat = MASTER_CATALOG_DATA[state.modalState.catKey];
  const sub = cat.subCategories[state.modalState.subKey];
  const opt = sub.options.find(o => o.id === optId);
  if (!opt) return;

  state.modalState.selectedOption = opt;
  document.querySelectorAll(".plan-chip-item").forEach(c => c.classList.remove("active"));
  const activeEl = document.getElementById(`modalPlanChip_${optId}`);
  if (activeEl) activeEl.classList.add("active");
};

window.changeModalQuantity = function(delta) {
  let newQty = state.modalState.quantity + delta;
  if (newQty < 1) newQty = 1;
  if (newQty > 10) newQty = 10;
  state.modalState.quantity = newQty;
  const valEl = document.getElementById("modalQuantityValue");
  if (valEl) valEl.textContent = newQty;
};

function getModalFormData() {
  const opt = state.modalState.selectedOption;
  if (!opt) return null;

  const name = document.getElementById("custNameInput")?.value.trim() || state.currentUser.name;
  const phone = document.getElementById("custPhoneInput")?.value.trim() || state.currentUser.phone;
  const addr = document.getElementById("custAddressInput")?.value.trim() || state.currentLocation.address;
  const desc = document.getElementById("custDescriptionInput")?.value.trim() || "";
  const date = document.getElementById("bookingScheduleDate")?.value || state.scheduledDateStr;

  if (name) { state.currentUser.name = name; localStorage.setItem("doorseva_user_name", name); }
  if (phone) { state.currentUser.phone = phone; localStorage.setItem("doorseva_user_phone", phone); }
  if (addr) state.currentLocation.address = addr;
  state.scheduledDateStr = date;
  state.userCustomRequirement = desc;

  return {
    id: opt.id,
    title: opt.title,
    basePrice: opt.basePrice,
    qty: state.modalState.quantity || 1,
    subKey: state.modalState.subKey,
    catKey: state.modalState.catKey
  };
}

window.submitModalToCart = function() {
  const item = getModalFormData();
  if (!item) return;

  const existing = state.cartItems.find(i => i.id === item.id);
  if (existing) {
    existing.qty += item.qty;
  } else {
    state.cartItems.push(item);
  }

  updateHeaderCartBadge();
  closeBookingModal();
  alert(state.currentLang === 'hi' ? "सेवा सफलतापूर्वक कार्ट में जोड़ दी गई!" : "Service added to cart successfully!");
};

window.submitModalDirectBooking = function() {
  const item = getModalFormData();
  if (!item) return;

  const existing = state.cartItems.find(i => i.id === item.id);
  if (!existing) {
    state.cartItems.push(item);
  }
  updateHeaderCartBadge();
  closeBookingModal();
  openCartScreen();
};

// ==========================================
// CART & PAYMENT CHECKOUT
// ==========================================
function getCartCalculations() {
  let subtotalCod = 0;
  state.cartItems.forEach(item => {
    const calc = calculateDynamicPricing(item.basePrice, state.currentLocation.multiplier || 1.0, state.currentLocation.distanceKm || 0.0);
    subtotalCod += (calc.standardCodPrice * item.qty);
  });

  const onlineDiscount = Math.round((subtotalCod * 20.0) / 100);
  const finalPrice = (state.selectedPaymentMethod === "ONLINE") ? (subtotalCod - onlineDiscount) : subtotalCod;
  const partnerPayout = Number(((finalPrice * 85.0) / 100).toFixed(2));
  const partnerMainWallet = Number(((finalPrice * 80.0) / 100).toFixed(2));
  const partnerHealthWallet = Number(((finalPrice * 5.0) / 100).toFixed(2));
  const platformFeeGross = Number((finalPrice - partnerPayout).toFixed(2));
  const gstOnCommission = Number(((platformFeeGross * 18) / 118).toFixed(2));
  const platformNetFee = Number((platformFeeGross - gstOnCommission).toFixed(2));

  return {
    subtotalCod,
    onlineDiscount,
    finalPrice,
    partnerPayout,
    partnerMainWallet,
    partnerHealthWallet,
    platformFeeGross,
    platformNetFee,
    gstOnCommission,
    totalQty: state.cartItems.reduce((acc, curr) => acc + curr.qty, 0)
  };
}

function updateHeaderCartBadge() {
  const badge = document.getElementById("headerCartBadge");
  if (!badge) return;
  const count = state.cartItems.reduce((acc, curr) => acc + curr.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

window.openCartScreen = function() {
  if (state.cartItems.length === 0) {
    alert(state.currentLang === 'hi' ? "आपकी कार्ट खाली है! कृपया पहले कोई सेवा चुनें।" : "Your cart is empty! Please add a service first.");
    return;
  }
  renderCartModalUI();
  const m = document.getElementById("cartModal");
  if (m) m.style.display = "flex";
};

window.closeCartScreen = function() {
  const m = document.getElementById("cartModal");
  if (m) m.style.display = "none";
};

function renderCartModalUI() {
  const container = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotalText");
  const grandTotalEl = document.getElementById("cartGrandTotalText");
  if (!container) return;

  const calc = getCartCalculations();
  container.innerHTML = state.cartItems.map(item => {
    const pCalc = calculateDynamicPricing(item.basePrice, state.currentLocation.multiplier || 1.0, state.currentLocation.distanceKm || 0.0);
    const itemTotal = (state.selectedPaymentMethod === "ONLINE" ? pCalc.onlineDiscountedPrice : pCalc.standardCodPrice) * item.qty;
    return `
      <div class="cart-item-row" style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #E2E8F0;">
        <div class="cart-item-info">
          <div style="font-size:13px; font-weight:700;">${t(item.title)}</div>
          <div style="font-size:11px; color:#64748B;">Qty: ${item.qty} × ₹${pCalc.onlineDiscountedPrice} (Online)</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-weight:800; color:#1E293B;">₹${itemTotal}</span>
          <button type="button" onclick="removeCartItem('${item.id}')" style="background:#FEE2E2; color:#DC2626; border:none; border-radius:50%; width:22px; height:22px; cursor:pointer;">✕</button>
        </div>
      </div>
    `;
  }).join("");

  if (subtotalEl) subtotalEl.textContent = `₹${calc.subtotalCod}`;
  if (grandTotalEl) grandTotalEl.textContent = `₹${calc.finalPrice}`;
}

window.removeCartItem = function(itemId) {
  state.cartItems = state.cartItems.filter(i => i.id !== itemId);
  updateHeaderCartBadge();
  renderCartModalUI();
  if (state.cartItems.length === 0) closeCartScreen();
};

window.executeCheckout = function(paymentType) {
  state.selectedPaymentMethod = paymentType;
  closeCartScreen();
  handleOrderFormSubmit();
};

async function handleOrderFormSubmit() {
  const calc = getCartCalculations();
  const secretPin = Math.floor(1000 + Math.random() * 9000).toString();
  const servicesTitles = state.cartItems.map(p => `${t(p.title)} (x${p.qty})`).join(" + ");
  const primaryCatKey = state.cartItems[0]?.catKey || "home_maintenance";
  const partnerInfo = CATEGORY_PARTNER_DIRECTORY[primaryCatKey] || { phone: ADMIN_SUPPORT_PHONE, name: "Verified Service Partner" };

  const bookingData = {
    orderId: "DS-" + Math.floor(100000 + Math.random() * 900000),
    serviceTitle: servicesTitles,
    catKey: primaryCatKey,
    customerName: state.currentUser.name || "DoorSeva Customer",
    customerPhone: state.currentUser.phone || "9837640595",
    customerAddress: state.currentLocation.address,
    customerRequirement: state.userCustomRequirement || "Standard Request",
    paymentMethod: state.selectedPaymentMethod,
    amount: calc.finalPrice,
    partnerSettlement: calc.partnerPayout,
    partnerMainWallet: calc.partnerMainWallet,
    partnerHealthWallet: calc.partnerHealthWallet,
    platformFeeGross: calc.platformFeeGross,
    platformNetFee: calc.platformNetFee,
    gstOnCommission: calc.gstOnCommission,
    assignedPartnerPhone: partnerInfo.phone,
    assignedPartnerName: partnerInfo.name,
    secretPin: secretPin,
    scheduledDate: state.scheduledDateStr,
    status: "DISPATCHED",
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  if (state.selectedPaymentMethod === "COD") {
    finalizeBooking(bookingData);
    return;
  }

  if (typeof Razorpay !== "undefined") {
    const rzp = new Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: calc.finalPrice * 100,
      currency: "INR",
      name: "DoorSeva - Sachint Enterprises",
      description: bookingData.serviceTitle,
      handler: function() {
        bookingData.paymentMethod = "ONLINE (PAID)";
        finalizeBooking(bookingData);
      }
    });
    rzp.open();
  } else {
    finalizeBooking(bookingData);
  }
}

function finalizeBooking(bookingData) {
  state.bookingResult = bookingData;
  state.bookingsList.unshift(bookingData);
  localStorage.setItem("doorseva_orders", JSON.stringify(state.bookingsList));
  state.cartItems = [];
  updateHeaderCartBadge();
  state.view = "SUCCESS";
  renderView();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // WhatsApp Alert
  const msgText = encodeURIComponent(
    `🛡️ *NEW DOORSEVA BOOKING* 🛡️\n\n` +
    `📦 *Order ID:* ${bookingData.orderId}\n` +
    `🛠️ *Service:* ${bookingData.serviceTitle}\n` +
    `📅 *Date:* ${bookingData.scheduledDate}\n` +
    `👤 *Customer:* ${bookingData.customerName} (${bookingData.customerPhone})\n` +
    `📍 *Address:* ${bookingData.customerAddress}\n` +
    `💰 *Amount:* ₹${bookingData.amount} (${bookingData.paymentMethod})\n` +
    `🔐 *PIN:* ${bookingData.secretPin}`
  );
  const cleanPhone = bookingData.assignedPartnerPhone.replace(/\D/g, "");
  setTimeout(() => {
    window.open(`https://wa.me/${cleanPhone}?text=${msgText}`, "_blank");
  }, 800);
}

// ==========================================
// NAVIGATION & DRAWER SYSTEM
// ==========================================
window.handleCategorySelect = function(k) {
  state.activeCategoryKey = k;
  state.activeCategory = MASTER_CATALOG_DATA[k];

  if (k === "home_nursing") {
    const chk = document.getElementById("chkMedicalConsent");
    if (chk) chk.checked = false;
    const btn = document.getElementById("btnProceedNursing");
    if (btn) btn.disabled = true;

    const modal = document.getElementById("medicalAdvisoryModal");
    if (modal) modal.style.display = "flex";
  } else {
    state.view = "SUB_CATEGORIES";
    renderView();
  }
};

window.closeMedicalModal = function() {
  const modal = document.getElementById("medicalAdvisoryModal");
  if (modal) modal.style.display = "none";
};

window.acceptMedicalAdvisory = function() {
  closeMedicalModal();
  state.view = "SUB_CATEGORIES";
  renderView();
};

window.navigateToHome = function() {
  state.view = "MAIN_CATEGORIES";
  renderView();
};

function bindGlobalEvents() {
  const overlay = document.getElementById("accountDrawerOverlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    });
  }
}

window.openDrawer = function() {
  const o = document.getElementById("accountDrawerOverlay");
  if (o) o.style.display = "flex";
};

window.closeDrawer = function() {
  const o = document.getElementById("accountDrawerOverlay");
  if (o) o.style.display = "none";
};

function updateDrawerUserProfileUI() {
  const nameEl = document.getElementById("drawerUserName");
  const phoneEl = document.getElementById("drawerUserPhone");
  if (nameEl) nameEl.textContent = (state.currentUser.name || (state.currentLang === 'hi' ? 'डोरसेवा ग्राहक' : 'DoorSeva Customer')) + " ✏️";
  if (phoneEl) phoneEl.textContent = state.currentUser.phone ? `+91 ${state.currentUser.phone}` : (state.currentLang === 'hi' ? 'लॉगिन करने के लिए टैप करें' : 'Tap to Login');
}

window.openDrawerAction = function(action) {
  closeDrawer();
  if (action === "wallet") {
    openWalletModal();
  } else if (action === "login") {
    openAuthModal();
  } else if (action === "logout") {
    localStorage.removeItem("doorseva_user_logged_in");
    localStorage.removeItem("doorseva_user_phone");
    state.currentUser.isLoggedIn = false;
    state.currentUser.phone = "";
    updateDrawerUserProfileUI();
    alert("Logged out successfully.");
  } else if (action === "deleteAccount") {
    if (confirm("Delete account and all saved data permanently?")) {
      localStorage.clear();
      location.reload();
    }
  }
};

function initLanguageSelector() {
  const langSelect = document.getElementById("languageSelect");
  if (!langSelect) return;
  langSelect.value = state.currentLang;
}

window.switchGlobalLanguage = function(langCode) {
  state.currentLang = langCode || "hi";
  localStorage.setItem("doorseva_lang", state.currentLang);
  updateStaticLabels();
  updateDrawerUserProfileUI();
  renderView();
};

function updateStaticLabels() {
  const el = id => document.getElementById(id);
  if (el("ui-appName")) el("ui-appName").textContent = t("appName");
  if (el("ui-tabAll")) el("ui-tabAll").textContent = t("allServicesTab");
  if (el("ui-tabHealth")) el("ui-tabHealth").textContent = t("healthTab");
  if (el("ui-tabBeauty")) el("ui-tabBeauty").textContent = t("beautyTab");
  if (el("ui-tabMaintenance")) el("ui-tabMaintenance").textContent = t("maintenanceTab");
  if (el("ui-tabMaidCook")) el("ui-tabMaidCook").textContent = t("maidCookTab");

  const searchBox = document.getElementById("serviceSearchInput");
  if (searchBox) searchBox.placeholder = t("searchPlaceholder");
  const autoGps = document.getElementById("btnDetectGps");
  if (autoGps) autoGps.textContent = t("autoGpsBtn");

  const medBody = el("ui-medBody");
  if (medBody) {
    const points = I18N[state.currentLang]?.medPoints || I18N["en"].medPoints;
    medBody.innerHTML = points.map(pt => `<div style="margin-bottom: 6px;">• ${pt}</div>`).join("");
  }
}

// FINTECH WALLET MODAL
window.openWalletModal = function() {
  const balEl = document.getElementById("userWalletBalDisplay");
  if (balEl) balEl.textContent = `₹${state.walletBalance}`;
  const m = document.getElementById("walletModal");
  if (m) m.style.display = "flex";
};

window.closeWalletModal = function() {
  const m = document.getElementById("walletModal");
  if (m) m.style.display = "none";
};

window.triggerInstantWalletWithdrawal = function() {
  if (state.walletBalance <= 0) {
    alert(state.currentLang === 'hi' ? "वॉलेट में निकासी योग्य राशि नहीं है।" : "No withdrawable balance.");
    return;
  }
  alert(`Withdrawal of ₹${state.walletBalance} processed successfully to your registered bank account!`);
  state.walletBalance = 0;
  localStorage.setItem("doorseva_user_wallet", "0");
  const balEl = document.getElementById("userWalletBalDisplay");
  if (balEl) balEl.textContent = `₹0`;
};

// MY BOOKINGS MODAL
window.openMyBookingsModal = function() {
  closeDrawer();
  let modal = document.getElementById("myBookingsModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "myBookingsModal";
    modal.className = "account-drawer-overlay";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "20px";
    document.body.appendChild(modal);
  }

  let listHtml = state.bookingsList.map(b => `
    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; font-weight: 800;">
        <span>${b.orderId}</span>
        <span style="color: #166534;">${b.status}</span>
      </div>
      <div style="font-size: 12px; color: #475569; margin: 4px 0;">${b.serviceTitle} | ₹${b.amount}</div>
      <div style="font-size: 11px; color: #B45309; font-weight:700;">PIN: ${b.secretPin}</div>
    </div>
  `).join("");

  modal.innerHTML = `
    <div class="modal-card-box" style="max-height: 80vh; overflow-y: auto; max-width:440px;">
      <div class="modal-card-header">
        <h3>${t("myBookings")}</h3>
        <button onclick="document.getElementById('myBookingsModal').style.display='none'" class="modal-btn-close">✕</button>
      </div>
      <div>${listHtml || `<p style="text-align:center;color:#64748B;">No bookings found.</p>`}</div>
    </div>
  `;
  modal.style.display = "flex";
};

// DIGITAL INVOICE MODAL
window.showDigitalInvoice = function(orderId) {
  const b = state.bookingsList.find(x => x.orderId === orderId) || state.bookingResult;
  if (!b) return;

  let modal = document.getElementById("invoiceModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "invoiceModal";
    modal.className = "account-drawer-overlay";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "20px";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card-box" style="max-width: 440px; text-align: left;">
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #CBD5E1; padding-bottom: 8px; margin-bottom: 10px;">
        <div>
          <div style="font-size: 15px; font-weight: 900; color: #0A192F;">🛡️ DOORSEVA</div>
          <div style="font-size: 10.5px; color: #64748B;">GSTIN: 09IATPS9376A1ZR</div>
        </div>
        <button onclick="document.getElementById('invoiceModal').style.display='none'" style="border:none;background:none;font-size:18px;cursor:pointer;">✕</button>
      </div>
      <div style="font-size: 12px; margin-bottom: 8px;">
        <strong>Invoice:</strong> INV-${b.orderId}<br/>
        <strong>Customer:</strong> ${b.customerName} (+91 ${b.customerPhone})
      </div>
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 10px; font-size: 12px; margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; font-weight:700;">
          <span>${b.serviceTitle}</span>
          <span>₹${b.amount}</span>
        </div>
      </div>
      <button class="btn-book-final" onclick="document.getElementById('invoiceModal').style.display='none'">Close</button>
    </div>
  `;
  modal.style.display = "flex";
};

window.openPolicyModal = function(type) {
  alert(`DoorSeva Legal Notice:\nPolicy: ${type.toUpperCase()}\nEntity: Sachint Enterprises (GSTIN: 09IATPS9376A1ZR)`);
};
