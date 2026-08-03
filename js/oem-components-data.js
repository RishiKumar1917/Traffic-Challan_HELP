// Traffic-Challan HELP - OEM Vehicle Components & Homologation Rules Dataset

const OEM_COMPONENTS_DATA = [
  {
    id: "stock-exhaust",
    component: "Factory Exhaust / Silencer (Stock OEM)",
    vehicles: "Royal Enfield, KTM, Yamaha, Kawasaki, Hero, Honda, TVS, etc.",
    act_section: "Section 52 & Section 190(2) MV Act / Rule 120 CMVR 1989",
    homologation_proof: "Form 22 (Roadworthiness Certificate) issued by ARAI / ICAT under Rule 126 CMVR.",
    rule_summary: "Stock silencers installed by vehicle manufacturers (OEMs) are fully homologated and certified by ARAI under Rule 126 of CMVR. Noise levels of factory exhausts strictly comply with the mandatory 80 dB(A) limit under Rule 120. Traffic police CANNOT fine or seize a vehicle for a stock/factory silencer simply because of its deep exhaust note.",
    defense_tip: "Show the 'OEM' / manufacturer stamp on the underside of the silencer. Point out that the silencer is listed in Form 22 of the vehicle registration document. If police threaten Section 52 violation, state that Section 52 explicitly excludes OEM factory specifications.",
    allowed_vs_illegal: "LEGAL: Stock silencer with DB killer / factory baffles intact.\nILLEGAL: Aftermarket straight-pipe exhausts, DB killer removed, or free-flow exhausts exceeding 80 dB noise limits."
  },
  {
    id: "factory-alloys-tires",
    component: "Factory Alloy Wheels & Manufacturer Tire Sizes",
    vehicles: "Cars & Motorcycles (Maruti, Hyundai, Tata, Mahindra, RE, KTM, etc.)",
    act_section: "Section 52 MV Act / Rule 95 & Rule 126 CMVR",
    homologation_proof: "Type Approval Certificate & Vehicle Owner's Manual Tire Specification Table.",
    rule_summary: "Alloy wheels and tires fitted at the factory or offered as genuine OEM accessories are part of the vehicle's approved Type Approval Certificate (homologation). Upgrading tires within the manufacturer-recommended upsizing limits (within 2-3% overall diameter variance) is legally permitted.",
    defense_tip: "Refer to the sticker on the vehicle door pillar or owner manual specifying approved wheel and tire dimensions.",
    allowed_vs_illegal: "LEGAL: Stock OEM alloy wheels, genuine manufacturer accessory wheels, tires within recommended size limits.\nILLEGAL: Extreme wheel projection outside the body fender (offset spacers), ultra-wide tractor tires, or compromised structural rims."
  },
  {
    id: "led-drls-headlamps",
    component: "Factory LED Headlamps & Daytime Running Lights (DRL)",
    vehicles: "Modern Cars & Bikes (All OEMs)",
    act_section: "Rule 105 & Rule 106 CMVR 1989 / AHO (Automatic Headlamp On) Mandate",
    homologation_proof: "CMVR Rule 105 White/Amber Light Standard & OEM Homologation Approval.",
    rule_summary: "All 2-wheelers manufactured after April 2017 mandatorily feature AHO (Automatic Headlamp On). Factory-fitted LED headlights, DRLs, and projection lamps are certified for beam dispersion and wattage under CMVR Rule 105.",
    defense_tip: "Explain that Automatic Headlamp On (AHO) is a mandatory safety rule for post-2017 vehicles and cannot be switched off. Highlighting factory lens embossing (E-mark / BIS mark) proves OEM status.",
    allowed_vs_illegal: "LEGAL: Factory LED DRLs, OEM LED projectors, stock AHO system.\nILLEGAL: Aftermarket flashers, blinding multi-color strobe lights, police-style blue/red flashers, or high-intensity unshielded LED bars mounted above bonnet level."
  },
  {
    id: "crash-guards-leg-protectors",
    component: "Engine Crash Guards & Bike Leg Protectors",
    vehicles: "Motorcycles (Royal Enfield, Jawa, Honda, TVS, Bajaj, etc.)",
    act_section: "MoRTH Order 2017 & Section 52 Proviso",
    homologation_proof: "MoRTH Clarification on Two-Wheeler Safety Crash Guards.",
    rule_summary: "Leg protectors and engine crash guards fitted on motorcycles are vital safety equipment designed to protect the rider's legs in tipping accidents. MoRTH notifications explicitly distinguish two-wheeler crash guards from heavy car front bumper bullbars.",
    defense_tip: "State that engine guards are safety accoutrements recognized by traffic safety guidelines for rider protection and do not alter the chassis structure under Section 52.",
    allowed_vs_illegal: "LEGAL: Engine guards, frame sliders, OEM leg guards.\nILLEGAL: Rigid steel bullbars mounted on passenger cars projecting beyond chassis bumpers (which interfere with airbag sensor deployment)."
  },
  {
    id: "tinted-glass-vlt",
    component: "Window Tint & Safety Glass VLT Percentage",
    vehicles: "All Passenger Vehicles",
    act_section: "CMVR Rule 100 & Supreme Court Ruling (Avishek Goenka v. UOI 2012)",
    homologation_proof: "Safety Glass Manufacturer Stamping (BIS / AIS Standards).",
    rule_summary: "As per CMVR Rule 100 and SC rulings, safety glass fitted by manufacturers must have Visual Light Transmission (VLT) of minimum 70% for Front & Rear Windshields, and minimum 50% for Side Windows. Black tint films pasted after market are illegal, but factory-tinted green glasses meeting VLT limits are 100% legal.",
    defense_tip: "Show the factory glass stamp indicating AIS / BIS approval and VLT compliance.",
    allowed_vs_illegal: "LEGAL: Factory-manufactured green glass with >70% (Front/Rear) and >50% (Sides) VLT.\nILLEGAL: Aftermarket dark sun-control films pasted over windows regardless of percentage, or reflective mirror films."
  },
  {
    id: "roof-racks-luggage",
    component: "Factory Roof Racks & Carrier Mounts",
    vehicles: "SUVs, MPVs & Station Wagons",
    act_section: "Rule 126 CMVR & Commercial vs Personal Luggage Guidelines",
    homologation_proof: "Vehicle Type Approval & OEM Accessory Catalog.",
    rule_summary: "Roof rails and factory-approved roof luggage carriers on private passenger cars for carrying personal luggage are legal. However, carrying commercial goods or exceeding height/width vehicle dimensions is prohibited.",
    defense_tip: "Present evidence that the carrier is an OEM-approved accessory used exclusively for personal family luggage.",
    allowed_vs_illegal: "LEGAL: Factory roof rails, OEM roof luggage boxes carrying personal bags.\nILLEGAL: Oversized commercial cargo, metal frames extending beyond vehicle body width."
  }
];
