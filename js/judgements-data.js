// Traffic-Challan HELP - Landmark Court Judgments & Precedents Dataset

const JUDGEMENTS_DATA = [
  {
    id: "key-removal-hc",
    court: "Delhi & Madras High Court Guidelines / Police Standing Orders",
    case_name: "Directions on Police Misconduct & Vehicle Key Removal",
    year: "2019-2022",
    topic: "Illegal Key Snatching & Physical Abuse",
    summary: "High Courts and State Police Chiefs (DGP/CP Standing Orders) have repeatedly ruled that police personnel cannot snatch vehicle ignition keys, force drivers out violently, or deflate vehicle tires during routine checks. Such acts violate Article 21 (Right to Dignity) and amount to criminal intimidation under IPC / BNS.",
    citation: "High Court Guidelines & Traffic Police Standing Order No. 341",
    key_takeaway: "Police cannot snatch your key or deflate tires. If done, it can be reported to Police Complaints Authority (PCA) or High Court for disciplinary action.",
    tags: ["Key Removal", "Tire Deflation", "Police Abuse", "Article 21"]
  },
  {
    id: "digilocker-hc-validity",
    title: "Acceptance of DigiLocker Documents as Original Proof",
    court: "Kerala & Delhi High Courts / MoRTH Statutory Circular",
    case_name: "Validation of Digital DL & RC under Section 4 IT Act",
    year: "2019",
    topic: "DigiLocker vs Physical Paper DL/RC",
    summary: "High Courts upheld MoRTH Circular RT-11036/64/2017-MV, confirming that digital documents stored in DigiLocker/mParivahan are statutory electronic records. Refusal by traffic police to accept digital copies constitutes illegal demand and non-compliance with Central rules.",
    citation: "MoRTH Statutory Notification & IT Act 2000 Sec 4 & 65B",
    key_takeaway: "Traffic police MUST accept DigiLocker/mParivahan documents. Demanding physical paper DL/RC when digital proof is shown is unlawful.",
    tags: ["DigiLocker", "mParivahan", "Section 4 IT Act", "DL/RC"]
  },
  {
    id: "camera-echallan-proof",
    court: "High Court of Bombay & High Court of Punjab & Haryana",
    case_name: "Challenging Defective Speed Camera & E-Challan Notices",
    year: "2021",
    topic: "E-Challan Proof & Speed Signage Mandatory Requirement",
    summary: "The courts held that speed camera e-challans issued without periodic calibration certificates of the speed gun or lacking visible speed limit signages beforehand are invalid. E-challan notifications without clear photographic proof of the vehicle number plate cannot be enforced.",
    citation: "Rule 167A CMVR & High Court Writs on Speed Camera Enforcement",
    key_takeaway: "If speed camera challan lacks photographic proof or speed limit signages were absent, the challan can be quashed by Virtual Court.",
    tags: ["E-Challan", "Speed Camera", "Calibration", "Virtual Court"]
  },
  {
    id: "rank-authority-quashing",
    court: "State High Courts (Karnataka, Rajasthan, Maharashtra)",
    case_name: "Unauthorized Officer Issuing Spot Fines",
    year: "2020",
    topic: "Officer Rank & Compounding Authority",
    summary: "State notifications under Section 200 MV Act strictly restrict the power of compounding offences and seizing licenses to officers of rank Sub-Inspector (SI) or Assistant Sub-Inspector (ASI) and above. Spot fines levied by unauthorized constables without SI authorization are legally void.",
    citation: "Motor Vehicles Act Section 200 & State Gazette Notifications",
    key_takeaway: "Only authorized officers (SI/ASI or above) can issue spot cash/e-challans for major offences.",
    tags: ["Officer Rank", "SI Authority", "Section 200", "Spot Fine"]
  }
];
