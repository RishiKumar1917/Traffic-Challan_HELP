// Traffic-Challan HELP - Statutory Rights & MoRTH Circular Dataset

const RIGHTS_DATA = [
  {
    id: "digilocker-validity",
    title_en: "DigiLocker & mParivahan Legal Validity",
    title_hi: "डिजीलॉकर और एम-परिवहन की कानूनी मान्यता",
    category: "digital-docs",
    act: "Information Technology Act, 2000 (Section 4 & 65B) & CMVR 1989 Rule 139",
    circular_ref: "MoRTH Circular RT-11036/64/2017-MV Dated 08-08-2018 & 17-12-2018",
    summary_en: "Digital documents (DL, RC, Insurance, PUC) presented on DigiLocker or mParivahan apps are legally equivalent to physical original documents. Police CANNOT demand physical copies or penalize you for not carrying paper documents if shown on these official apps.",
    summary_hi: "डिजीलॉकर या एम-परिवहन ऐप पर दिखाए गए डिजिटल दस्तावेज (ड्राइविंग लाइसेंस, आरसी, बीमा, पीयूसी) भौतिक मूल दस्तावेजों के समान ही कानूनी रूप से मान्य हैं। पुलिस कागज के दस्तावेज न होने पर जुर्माना नहीं लगा सकती।",
    verbatim_text: "As per MoRTH Circular RT-11036/64/2017-MV: 'The documents available in DigiLocker or mParivahan app are treated at par with the original documents as per the provisions of Rule 139 of the Central Motor Vehicles Rules, 1989 and Section 4 of the Information Technology Act, 2000. Law enforcement agencies are required to accept documents presented in digital form.'",
    actionable_tip: "Open DigiLocker or mParivahan live app (not screenshots) and present Section 4 IT Act + MoRTH Circular RT-11036/64/2017-MV to the inspecting officer.",
    badge: "CRITICAL PROOF"
  },
  {
    id: "grace-period-15-days",
    title_en: "15-Day Grace Period for Document Production",
    title_hi: "दस्तावेज पेश करने के लिए 15 दिन की समय सीमा",
    category: "doc-production",
    act: "Central Motor Vehicles Rules, 1989 (Rule 139) & MV Act Section 130",
    circular_ref: "CMVR 1989 Rule 139 (Amended)",
    summary_en: "If you do not have your physical or digital documents at the time of checking, you have 15 days to produce them before the police station or traffic authority. Fine for not carrying DL/RC instantly cannot be impounded as an irrecoverable offense immediately if produced within 15 days.",
    summary_hi: "यदि चेकिंग के समय आपके पास भौतिक या डिजिटल दस्तावेज नहीं हैं, तो आपके पास उन्हें पुलिस स्टेशन या यातायात प्राधिकरण के समक्ष पेश करने के लिए 15 दिनों का समय है।",
    verbatim_text: "Rule 139 CMVR: 'The driver or conductor of a motor vehicle shall produce the license / registration certificate / insurance certificate within 15 days of demand by an officer authorized in this behalf.'",
    actionable_tip: "Request the officer to issue a memo giving you 15 days to produce the document under CMVR Rule 139 rather than levying an immediate full fine for non-possession.",
    badge: "15-DAY GRACE"
  },
  {
    id: "officer-rank-power",
    title_en: "Traffic Police Officer Rank & Spot Fine Authority",
    title_hi: "यातायात पुलिस अधिकारी का पद और स्पॉट फाइन अधिकार",
    category: "police-powers",
    act: "Motor Vehicles Act, 1988 (Section 206, 213) & State Police Acts",
    circular_ref: "State Traffic Police Manuals & Section 200 MV Act",
    summary_en: "Constables and Head Constables CANNOT issue spot challans above prescribed low limits (usually ₹100-₹500 depending on State rules) or impound licenses. Spot compounding of major fines requires an officer of rank Sub-Inspector (SI), Assistant Sub-Inspector (ASI), or higher.",
    summary_hi: "कॉन्स्टेबल और हेड कॉन्स्टेबल आमतौर पर भारी चालान नहीं काट सकते और न ही लाइसेंस जब्त कर सकते हैं। चालान काटने के लिए सब-इंस्पेक्टर (SI) या ASI का होना आवश्यक है।",
    verbatim_text: "Under MV Act Section 200/206, only officers authorized by State Notification (typically Sub-Inspector and above) possess the power to compound offences on the spot and seize licenses or vehicles under specified conditions.",
    actionable_tip: "Respectfully check the name plate and rank stars of the officer issuing the spot cash/e-challan. If a constable threatens major fines, ask for the Sub-Inspector in charge of the checking party.",
    badge: "RANK AUTHORITY"
  },
  {
    id: "key-snatching-tires",
    title_en: "Prohibition of Vehicle Key Snatching & Deflating Tires",
    title_hi: "गाड़ी की चाबी छीनने और हवा निकालने पर रोक",
    category: "police-conduct",
    act: "Indian Penal Code / Bharatiya Nyaya Sanhita & Police Conduct Guidelines",
    circular_ref: "High Court Directives & State Police Standing Orders",
    summary_en: "No police officer (regardless of rank) has the legal authority to forcibly snatch keys from your vehicle ignition, deflate your tires, or physically block/assault you. Doing so constitutes illegal harassment and misuse of power.",
    summary_hi: "किसी भी पुलिस अधिकारी के पास गाड़ी के इग्निशन से चाबी जबरन छीनने या पहियों की हवा निकालने का कानूनी अधिकार नहीं है।",
    verbatim_text: "Police Standing Orders & HC Guidelines: 'Traffic personnel are instructed not to forcibly remove ignition keys or cause damage to vehicles during checking. Officers must maintain civil demeanor and follow standard protocol.'",
    actionable_tip: "Keep your windows rolled up slightly, remain inside the car, turn off the engine yourself, and record video evidence if an officer illegally snatches your key or deflates tires.",
    badge: "CITIZEN PROTECTION"
  },
  {
    id: "drunk-driving-procedure",
    title_en: "Drunk Driving Breathalyzer & Blood Test Procedure",
    title_hi: "शराब पीकर गाड़ी चलाने पर सांस और रक्त परीक्षण प्रक्रिया",
    category: "safety-offences",
    act: "Motor Vehicles Act, 1988 (Section 185, 203, 204)",
    circular_ref: "MV Act Section 203(1) & 204",
    summary_en: "Alcohol testing requires a breathalyzer test by an authorized officer. If the test shows BAC > 30mg per 100ml blood, you have the right to request a medical blood test at a government hospital within 2 hours of detention to verify exact blood alcohol content.",
    summary_hi: "यदि सांस परीक्षण में अल्कोहल 30mg/100ml से अधिक आता है, तो आपको 2 घंटे के भीतर सरकारी अस्पताल में मेडिकल ब्लड टेस्ट की मांग करने का अधिकार है।",
    verbatim_text: "Section 203 MV Act: 'A police officer in uniform may require any person driving or attempting to drive a motor vehicle to provide a specimen of breath for a breath test... Under Section 204, medical examination of blood must be conducted within two hours of detention.'",
    actionable_tip: "Ensure the officer uses a clean/fresh straw on the breathalyzer apparatus. If you dispute the reading, demand immediate blood sample testing at a nearest hospital within 2 hours.",
    badge: "MEDICAL RIGHT"
  },
  {
    id: "camera-echallan-rules",
    title_en: "Automated Speed & Signal Camera E-Challan Rights",
    title_hi: "कैमरा ई-चालान और स्पीड गन के नियम",
    category: "camera-challans",
    act: "Central Motor Vehicles Rules (Rule 167A) & MoRTH Guidelines 2021",
    circular_ref: "MoRTH E-Enforcement Notification G.S.R. 575(E)",
    summary_en: "Electronic challans generated via automatic speed cameras or RLVD (Red Light Violation Detection) MUST contain clear photo/video proof showing your vehicle number plate, timestamp, exact location, and clear road context. Speed traps must have visible speed limit signages beforehand.",
    summary_hi: "कैमरा ई-चालान में नंबर प्लेट, समय और स्थान की स्पष्ट तस्वीर होना अनिवार्य है। बिना स्पीड लिमिट बोर्ड के काटा गया चालान कोर्ट में रद्द योग्य है।",
    verbatim_text: "Rule 167A CMVR: 'The electronic enforcement device must capture clear evidence of the offence, date, time, and location. Notice of violation must be sent within 15 days of the occurrence.'",
    actionable_tip: "If an e-challan has blurry photos, wrong vehicle numbers, or missing speed limit signages, you can contest it online via the echallan.parivahan.gov.in portal or Virtual Court.",
    badge: "E-CHALLAN RIGHT"
  }
];

const OFFENCES_DATABASE = [
  {
    offence: "Driving Without Helmet (Two-Wheeler)",
    offence_hi: "बिना हेलमेट दोपहिया चलाना",
    section: "Section 129 / Section 194D",
    fine: "₹1,000 + 3 Months License Disqualification",
    authorized_rank: "Sub-Inspector / Head Constable (State notification dependent)",
    defense: "Standard BIS certified helmet required for driver and pillion above 4 yrs. Exemption for Sikhs wearing turbans (Section 129 proviso)."
  },
  {
    offence: "Driving Without Seatbelt",
    offence_hi: "बिना सीटबेल्ट गाड़ी चलाना",
    section: "Section 138(3) / Section 194B",
    fine: "₹1,000",
    authorized_rank: "Head Constable / Sub-Inspector",
    defense: "Applies to front seat passengers and rear seats equipped with seatbelts. Medical exemption requires valid doctor certificate."
  },
  {
    offence: "Driving Without Valid License (DL)",
    offence_hi: "बिना ड्राइविंग लाइसेंस गाड़ी चलाना",
    section: "Section 3 / Section 181",
    fine: "₹5,000 or Community Service",
    authorized_rank: "Sub-Inspector / ASI",
    defense: "Valid DL in DigiLocker / mParivahan is 100% legal. If forgotten, 15 days grace period under CMVR Rule 139 applies."
  },
  {
    offence: "Driving Without Pollution Certificate (PUC)",
    offence_hi: "बिना प्रदूषण प्रमाण पत्र (PUC) गाड़ी चलाना",
    section: "Section 190(2)",
    fine: "Up to ₹10,000 or up to 3 months imprisonment",
    authorized_rank: "Sub-Inspector / Traffic Inspector",
    defense: "New vehicles are exempt for 1 year from registration date. Digital PUC on parivahan portal is valid."
  },
  {
    offence: "Over Speeding (Light Motor Vehicle)",
    offence_hi: "तेज गति से गाड़ी चलाना (कार/बाइक)",
    section: "Section 112 / Section 183(1)",
    fine: "₹1,000 - ₹2,000 (LMV) / ₹2,000 - ₹4,000 (HMV)",
    authorized_rank: "Sub-Inspector (Speed radar operator)",
    defense: "Speed traps must have legally mandated speed limit signage visible before the trap location."
  },
  {
    offence: "Using Mobile Phone While Driving",
    offence_hi: "गाड़ी चलाते समय मोबाइल का उपयोग",
    section: "Section 184(c)",
    fine: "₹1,000 - ₹5,000 (First Offence)",
    authorized_rank: "Sub-Inspector / Traffic Police",
    defense: "Using mobile solely for navigation (placed in dashboard holder) without holding in hand is permitted under MoRTH guidelines."
  },
  {
    offence: "Drunk Driving (BAC > 30mg/100ml)",
    offence_hi: "शराब पीकर गाड़ी चलाना",
    section: "Section 185",
    fine: "Up to ₹10,000 and/or 6 months jail (1st offence)",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Mandatory breathalyzer test required. Right to medical blood test within 2 hours at Govt hospital."
  },
  {
    offence: "Red Light Jump / Signal Violation",
    offence_hi: "रेड लाइट जंप करना",
    section: "Section 184(a)",
    fine: "₹1,000 - ₹5,000",
    authorized_rank: "Sub-Inspector / Camera E-Challan",
    defense: "Clear photo showing vehicle crossing stop line while light was RED is required. Yellow light entry is valid."
  }
];
