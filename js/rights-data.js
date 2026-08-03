// Traffic-Challan HELP - Statutory Rights & Complete 30 Violations Dataset

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

// Complete Top 30 Motor Vehicles Act Offence Database
const OFFENCES_DATABASE = [
  {
    id: 1,
    offence: "Driving Without Helmet (Rider or Pillion)",
    offence_hi: "बिना हेलमेट दोपहिया चलाना (चालक या पीछे बैठा व्यक्ति)",
    section: "Section 129 r/w 194D",
    fine: "₹1,000 + 3-Month License Suspension",
    authorized_rank: "Sub-Inspector / Head Constable (State notification dependent)",
    defense: "Mandatory for both rider and pillion above 4 years. Proviso to Sec 129 exempts turban-wearing Sikhs."
  },
  {
    id: 2,
    offence: "Driving Without Seat Belt (Driver or Passenger)",
    offence_hi: "बिना सीटबेल्ट गाड़ी चलाना",
    section: "Section 194B(1)",
    fine: "₹1,000",
    authorized_rank: "Head Constable / Sub-Inspector",
    defense: "Applies to drivers and all passengers in seats equipped with factory seatbelts. Doctor medical exemption certificate is valid."
  },
  {
    id: 3,
    offence: "Driving with Unsecured Child (Under 14 Years)",
    offence_hi: "14 साल से कम उम्र के बच्चे को बिना सुरक्षा चलाएँ रखना",
    section: "Section 194B(2)",
    fine: "₹1,000",
    authorized_rank: "Sub-Inspector",
    defense: "Children under 14 must be secured via seatbelt or dedicated Child Restraint System (CRS)."
  },
  {
    id: 4,
    offence: "Triple Riding on Two-Wheeler",
    offence_hi: "दोपहिया पर तीन लोग बैठना (ट्रिपल राइडिंग)",
    section: "Section 128 r/w 194C",
    fine: "₹1,000 + 3-Month License Suspension",
    authorized_rank: "Head Constable / Sub-Inspector",
    defense: "Section 128 restricts two-wheelers to driver plus one pillion only."
  },
  {
    id: 5,
    offence: "Driving Without Valid License (DL)",
    offence_hi: "बिना ड्राइविंग लाइसेंस गाड़ी चलाना",
    section: "Section 3 r/w 181",
    fine: "₹5,000 (1st) / ₹10,000 + 3 Mo Jail (Repeat)",
    authorized_rank: "Sub-Inspector / ASI",
    defense: "Digital DL on DigiLocker/mParivahan is 100% valid. 15-day grace period under CMVR Rule 139 applies if DL is active."
  },
  {
    id: 6,
    offence: "Underage / Juvenile Driving",
    offence_hi: "नाबालिग द्वारा गाड़ी चलाना",
    section: "Section 199A",
    fine: "₹25,000 + 3 Yrs Jail (Guardian) + 1-Yr RC Cancellation",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Holds parent/guardian legally responsible. Minor blocked from DL until age 25."
  },
  {
    id: 7,
    offence: "Driving Unregistered Vehicle / Expired RC",
    offence_hi: "बिना रजिस्ट्रेशन (RC) के वाहन चलाना",
    section: "Section 39 r/w 192",
    fine: "₹2,000-₹5,000 (1st) / ₹5,000-₹10,000 + 1 Yr Jail (Repeat)",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Temporary registration is valid for transit. mParivahan digital RC is accepted."
  },
  {
    id: 8,
    offence: "Driving Uninsured Vehicle",
    offence_hi: "बिना बीमा (Insurance) गाड़ी चलाना",
    section: "Section 146 r/w 196",
    fine: "₹2,000 and/or 3 Mo Jail (1st) / ₹4,000 (Repeat)",
    authorized_rank: "Sub-Inspector",
    defense: "Mandatory third-party insurance required under Sec 146. Digital copy on DigiLocker valid."
  },
  {
    id: 9,
    offence: "Driving Without Pollution Certificate (PUCC)",
    offence_hi: "बिना प्रदूषण प्रमाण पत्र (PUC) गाड़ी चलाना",
    section: "Section 190(2)",
    fine: "₹10,000 + 3-Month License Suspension",
    authorized_rank: "Sub-Inspector / Traffic Inspector",
    defense: "New vehicles are exempt for 1 year from registration date. Online mParivahan PUCC record valid."
  },
  {
    id: 10,
    offence: "Over-speeding (Light Motor Vehicle - LMV)",
    offence_hi: "तेज गति से कार/बाइक चलाना (LMV)",
    section: "Section 112 r/w 183(1)(i)",
    fine: "₹1,000 - ₹2,000 (1st) / ₹2,000 - ₹4,000 (Repeat)",
    authorized_rank: "Sub-Inspector (Speed radar operator)",
    defense: "Camera speed traps must have legally mandated speed limit signboards placed before enforcement zone."
  },
  {
    id: 11,
    offence: "Over-speeding (Medium / Heavy Transport Vehicle)",
    offence_hi: "तेज गति से बस/ट्रक चलाना (HMV)",
    section: "Section 112 r/w 183(1)(ii)",
    fine: "₹2,000 - ₹4,000 (1st) / License Seizure (Repeat)",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Targeted at commercial transport speed governors and radar logs."
  },
  {
    id: 12,
    offence: "Drunk Driving (BAC > 30mg/100ml)",
    offence_hi: "शराब पीकर गाड़ी चलाना",
    section: "Section 185",
    fine: "₹10,000 and/or 6 Mo Jail (1st) / ₹15,000 + 2 Yrs Jail (Repeat)",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Requires breathalyzer reading > 30mg/100ml. Citizen has statutory right to request medical blood test within 2 hours."
  },
  {
    id: 13,
    offence: "Using Mobile Phone While Driving",
    offence_hi: "गाड़ी चलाते समय मोबाइल फोन का उपयोग",
    section: "Section 184(c)",
    fine: "₹1,000 - ₹5,000 (1st) / ₹10,000 (Repeat within 3 yrs)",
    authorized_rank: "Sub-Inspector",
    defense: "Handheld phone use is prohibited. Using phone mounted in dashboard holder solely for navigation is permitted under MoRTH guidelines."
  },
  {
    id: 14,
    offence: "Rash, Negligent, or Dangerous Driving",
    offence_hi: "खतरनाक या लापरवाही से गाड़ी चलाना",
    section: "Section 184",
    fine: "₹1,000 - ₹5,000 and/or 1 Yr Jail (1st) / ₹10,000 (Repeat)",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Covers jumping red lights, unsafe overtaking, and driving against traffic flow."
  },
  {
    id: 15,
    offence: "Speed Racing or Speed Trials on Public Road",
    offence_hi: "सार्वजनिक सड़क पर रेसिंग या स्पीड रेस",
    section: "Section 189",
    fine: "₹5,000 and/or 3 Mo Jail (1st) / ₹10,000 + 1 Yr Jail (Repeat)",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Illegal street racing without written permission from State Government."
  },
  {
    id: 16,
    offence: "Red Light Jump / Traffic Signal Violation",
    offence_hi: "रेड लाइट जंप करना",
    section: "Section 184 / Section 177",
    fine: "₹1,000 - ₹5,000",
    authorized_rank: "Sub-Inspector / Camera RLVD System",
    defense: "Camera e-challan must provide clear photo evidence of vehicle crossing stop line while signal light was RED."
  },
  {
    id: 17,
    offence: "Wrong-Side / One-Way Driving",
    offence_hi: "गलत दिशा (रॉन्ग साइड) में गाड़ी चलाना",
    section: "Section 184 / Section 177",
    fine: "₹1,000 - ₹5,000",
    authorized_rank: "Sub-Inspector",
    defense: "Driving against specified one-way direction or traffic flow."
  },
  {
    id: 18,
    offence: "Blocking Emergency Vehicles (Ambulance / Fire)",
    offence_hi: "आपातकालीन वाहन (एम्बुलेंस/फायर) का रास्ता रोकना",
    section: "Section 194E",
    fine: "₹10,000 and/or 6 Months Jail",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Failing to draw to the side of the road to allow free passage to emergency service vehicles."
  },
  {
    id: 19,
    offence: "Commercial Transport Fitness Certificate Lapses",
    offence_hi: "कमर्शियल वाहन का फिटनेस सर्टिफिकेट खत्म होना",
    section: "Section 56 r/w 192",
    fine: "₹5,000 - ₹10,000 (1st) / ₹10,000 + 1 Yr Jail (Repeat)",
    authorized_rank: "RTO Inspector / Sub-Inspector",
    defense: "Driving commercial vehicle without fitness certificate is deemed equivalent to driving unregistered vehicle."
  },
  {
    id: 20,
    offence: "Operating Commercial Vehicle Without Valid Permit",
    offence_hi: "बिना परमिट कमर्शियल वाहन चलाना",
    section: "Section 66 r/w 192A",
    fine: "₹10,000 and/or 6 Mo Jail (1st) / ₹10,000 + 1 Yr Jail (Repeat)",
    authorized_rank: "RTO Inspector / Sub-Inspector",
    defense: "Exemption for emergency services, government transport, and exempted agricultural haulage."
  },
  {
    id: 21,
    offence: "Overloading Cargo Goods Vehicle",
    offence_hi: "माल गाड़ी में ओवरलोडिंग",
    section: "Section 113 r/w 194",
    fine: "₹20,000 basic + ₹2,000 per extra Metric Tonne",
    authorized_rank: "RTO Weighbridge / Sub-Inspector",
    defense: "Vehicle must be weighed on certified RTO weighbridge. Excess load must be offloaded at owner expense."
  },
  {
    id: 22,
    offence: "Overloading Passengers in Public Transport",
    offence_hi: "पैसेंजर बस/ऑटो में क्षमता से अधिक सवारी बैठाना",
    section: "Section 194A",
    fine: "₹200 per extra Passenger",
    authorized_rank: "Sub-Inspector",
    defense: "Carrying passengers in excess of seating capacity stated in vehicle registration."
  },
  {
    id: 23,
    offence: "Carrying Commercial Goods in Private Passenger Car",
    offence_hi: "निजी कार में कमर्शियल सामान ढोना",
    section: "Section 192A",
    fine: "₹10,000",
    authorized_rank: "RTO Inspector / Sub-Inspector",
    defense: "Personal luggage is permitted. Commercial freight carriage in private LMV violates registration category."
  },
  {
    id: 24,
    offence: "Needless Honking / Pressure Horn / Silent Zone Use",
    offence_hi: "अनावश्यक हॉर्न बजाना या प्रेशर हॉर्न का उपयोग",
    section: "Section 194F",
    fine: "₹1,000 (1st) / ₹2,000 (Repeat)",
    authorized_rank: "Head Constable / Sub-Inspector",
    defense: "Multi-toned pressure horns are strictly illegal under CMVR Rule 119. Silence zones extend 100m around hospitals/schools."
  },
  {
    id: 25,
    offence: "Non-Compliant / Decorative License Plate (HSRP)",
    offence_hi: "फैंसी या बिना HSRP नंबर प्लेट",
    section: "CMVR Rule 50 r/w Section 177",
    fine: "₹5,000 - ₹10,000",
    authorized_rank: "Sub-Inspector",
    defense: "Standard High Security Registration Plate (HSRP) with laser hologram mandatory for all vehicles."
  },
  {
    id: 26,
    offence: "Stop Line Violation at Intersections",
    offence_hi: "चौराहे पर स्टॉप लाइन क्रॉस करना",
    section: "DMVR 113(1) r/w Section 177",
    fine: "₹500 (1st) / ₹1,500 (Repeat)",
    authorized_rank: "Camera E-Challan / Traffic Officer",
    defense: "Front tires must not cross marked stop line while signal is red."
  },
  {
    id: 27,
    offence: "Wrong, Obstructive, or No-Parking Parking",
    offence_hi: "गलत या नो-पार्किंग में गाड़ी खड़ी करना",
    section: "Section 122 r/w 177",
    fine: "₹500 - ₹1,500 (+ Towing Fees)",
    authorized_rank: "Traffic Police / Towing Unit",
    defense: "No-parking zones must have clearly visible municipal signages. Towing fees regulated by local municipal rules."
  },
  {
    id: 28,
    offence: "Unauthorized Alterations / Structural Modifications",
    offence_hi: "गाड़ी में अवैध संशोधन/मॉडिफिकेशन",
    section: "Section 182A(4)",
    fine: "₹5,000 per alteration",
    authorized_rank: "RTO Inspector / Sub-Inspector",
    defense: "Section 52 Proviso explicitly excludes stock OEM factory components certified under Form 22 ARAI Homologation."
  },
  {
    id: 29,
    offence: "Improper Lane Changes / Discipline Failure",
    offence_hi: "बिना सिग्नल लेन बदलना या गलत लेन ड्राइविंग",
    section: "Section 177A",
    fine: "₹500 - ₹2,000",
    authorized_rank: "Sub-Inspector / Highway Patrol",
    defense: "Vehicles must signal before lane changes and yield fast lanes to overtaking vehicles."
  },
  {
    id: 30,
    offence: "Disobeying Lawful Orders / Refusing Info to Police",
    offence_hi: "पुलिस अधिकारी के आदेश की अवहेलना करना",
    section: "Section 179",
    fine: "₹2,000",
    authorized_rank: "Sub-Inspector & Above",
    defense: "Refusing to stop when signaled by uniformed officer or withholding registration/driver details."
  }
];
