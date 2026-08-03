// Traffic-Challan HELP - Dispute Letter & Appeal Generator

function generateDisputeLetter(data) {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let reasonText = "";
  switch (data.disputeReason) {
    case 'digilocker_refusal':
      reasonText = `1. The applicant presented valid electronic documents (Driving License / Registration Certificate / Insurance / PUC) via the government-authorized DigiLocker / mParivahan application at the time of checking.
2. Under Section 4 of the Information Technology Act, 2000 and MoRTH Circular RT-11036/64/2017-MV (Dated 08-08-2018 & 17-12-2018), documents in DigiLocker/mParivahan are legally equivalent to physical original documents.
3. The levying of fine for "non-production / not carrying documents" is contrary to statutory rules and CMVR Rule 139.`;
      break;
    case 'no_photo_proof':
      reasonText = `1. The disputed E-Challan lacks clear photographic or video evidence demonstrating the vehicle crossing the stop line or exceeding speed limit.
2. As per Rule 167A of the Central Motor Vehicles Rules (CMVR) 1989 and MoRTH Electronic Enforcement Guidelines, electronic enforcement devices must record unambiguous visual evidence containing timestamp, location, and clear license plate visibility.
3. The notice issued without valid photographic proof is erroneous and liable to be quashed.`;
      break;
    case 'no_speed_signage':
      reasonText = `1. The applicant vehicle was penalized for alleged speed violation under Section 112/183 MV Act.
2. However, there were no legally mandated speed limit signage boards displayed prior to the camera / speed trap location on the specified stretch of road.
3. In accordance with High Court precedents on traffic enforcement, speed violation penalties cannot be levied in the absence of clearly visible statutory speed limit signs.`;
      break;
    case 'unauthorized_constable':
      reasonText = `1. The spot challan was issued by a constable / head constable who lacks compounding power under Section 200 of the Motor Vehicles Act, 1988 without the presence of an authorized Sub-Inspector (SI) / ASI.
2. The spot fine levied is procedurally defective and contrary to the State Gazette Notification regulating authorized officer ranks.`;
      break;
    default:
      reasonText = `1. The applicant disputes the allegation stated in the e-challan as factually incorrect.
2. The applicant requests verification of raw CCTV / camera logs and speed sensor calibration certificates for the date and time of the alleged offence.`;
  }

  return `FORMAL NOTICE OF DISPUTE / REPRESENTATION AGAINST E-CHALLAN

To,
The Traffic Police Appellate Authority / Virtual Court Officer,
Traffic Police Department, ${data.city || '[City Name]'}

Date: ${currentDate}

SUBJECT: Representation for Cancellation / Quashing of Improper E-Challan No. ${data.challanNo || '[CHALLAN NUMBER]'} for Vehicle No. ${data.vehicleNo || '[VEHICLE REGISTRATION NUMBER]'}

Respected Sir/Madam,

I, ${data.applicantName || '[Your Full Name]'}, resident of ${data.applicantAddress || '[Your Address]'}, am writing to formally submit a dispute regarding E-Challan No. ${data.challanNo || '[CHALLAN NUMBER]'} issued on ${data.challanDate || '[Date of Offence]'} against vehicle registration number ${data.vehicleNo || '[VEHICLE NUMBER]'}.

GROUNDS OF DISPUTE:
${reasonText}

PRAYER:
In light of the above facts, statutory provisions, and MoRTH circulars, I humbly request your good office to:
1. Review and quash/cancel E-Challan No. ${data.challanNo || '[CHALLAN NUMBER]'}.
2. Update the status of the vehicle on the Parivahan portal accordingly.

I am attaching herewith copies of my Vehicle Registration Certificate, Driving License, and relevant statutory circulars/proofs for your immediate reference.

Yours faithfully,

_______________________
(${data.applicantName || '[Your Full Name]'})
Contact: ${data.applicantPhone || '[Your Phone Number]'}
Email: ${data.applicantEmail || '[Your Email Address]'}`;
}
