// Traffic-Challan HELP - Voice Assistant & Linguistic Legal Analyzer

class VoiceLinguisticAnalyzer {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.isRecording = false;
    this.recordedTranscript = '';
    this.onTranscriptCallback = null;
    this.onErrorCallback = null;

    if (this.recognition) {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN';
    }
  }

  isSupported() {
    return !!this.recognition;
  }

  startListening(onTranscript, onError) {
    if (!this.recognition) {
      onError('Voice recognition is not supported in your browser.');
      return;
    }

    this.recordedTranscript = '';
    this.onTranscriptCallback = onTranscript;
    this.onErrorCallback = onError;
    this.isRecording = true;
    this.recognition.lang = (currentLang === 'hi') ? 'hi-IN' : 'en-IN';

    this.recognition.onresult = (event) => {
      let currentText = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentText += event.results[i][0].transcript;
      }
      if (currentText.trim()) {
        this.recordedTranscript = currentText;
      }
    };

    this.recognition.onerror = (event) => {
      if (event.error !== 'no-speech') {
        this.isRecording = false;
        if (this.onErrorCallback) this.onErrorCallback(event.error);
      }
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };

    this.recognition.start();
  }

  stopAndAnalyze() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;

      const finalSpeech = this.recordedTranscript.trim();
      if (finalSpeech && this.onTranscriptCallback) {
        this.onTranscriptCallback(finalSpeech);
      } else if (this.onErrorCallback) {
        this.onErrorCallback('No speech detected. Please tap mic and speak again.');
      }
    }
  }

  async analyzeSpokenSituation(spokenText) {
    const text = spokenText.toLowerCase();
    const apiKey = trafficChatbot.getApiKey();

    if (apiKey) {
      try {
        return await this.callGeminiLinguisticAPI(spokenText, apiKey);
      } catch (err) {
        console.warn('Gemini API call error, falling back to local legal engine:', err);
      }
    }

    return this.generateLocalLinguisticAnalysis(text);
  }

  async callGeminiLinguisticAPI(spokenText, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptText = `Analyze this spoken citizen situation during an Indian traffic police check: "${spokenText}"

Return 3 clean bulleted sections:
1. IDENTIFIED LEGAL SITUATION & OUTCOME
2. EXACT WORDS TO SAY TO OFFICER (Short, civil, firm dialogue)
3. OFFICIAL GOVT DOCUMENT PROOF (MoRTH circular or MV Act Gazette reference)`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis failed.';
  }

  generateLocalLinguisticAnalysis(text) {
    // 1. Drunk Driving & Extortion / Unauthorized Officer Check
    if (text.includes('drink') || text.includes('drunk') || text.includes('alcohol') || text.includes('wine') || text.includes('beer') || text.includes('crpf') || text.includes('bribe') || text.includes('compensation') || text.includes('500') || text.includes('2000')) {
      return {
        situation: 'Alleged Drunk Driving Check & Cash Demand by Police',
        outcome: '1. Drunk driving penalization under Section 185 MV Act requires an official breathalyzer test (>30mg/100ml). Under Section 204 MV Act, you have a statutory right to request a medical blood test at a Govt hospital within 2 hours.\n2. Under Section 200/206 MV Act, non-traffic personnel or constables cannot demand spot cash or levy major fines. Spot fines require an authorized Traffic Sub-Inspector (SI) with an official e-challan system issuing a digital receipt.',
        suggested_words: '"Sir, under MV Act Section 200 & Section 204, spot fine compounding requires an authorized Traffic Sub-Inspector with an official e-challan receipt. If you are checking for alcohol, please provide a breathalyzer test or take me for a medical blood test at a Govt hospital as per Section 204."',
        document_link: 'docs/MV_Act_Batch_2_Statutory_Proofs.html#highlight-v12',
        document_title: 'MV Act Section 185 & Section 204 Medical Blood Test Right'
      };
    }

    // 2. DigiLocker & Digital Documents
    if (text.includes('digilocker') || text.includes('mparivahan') || text.includes('digital') || text.includes('soft copy') || text.includes('app') || text.includes('paper') || text.includes('physical')) {
      return {
        situation: 'Police Refusing DigiLocker / mParivahan Documents',
        outcome: 'Digital DL, RC, Insurance, and PUC shown on DigiLocker/mParivahan apps are 100% legally valid under Section 4 IT Act 2000 & CMVR Rule 139. Police cannot demand paper copies or levy fines for non-possession.',
        suggested_words: '"Sir, under MoRTH Circular RT-11036/64/2017-MV and Section 4 of IT Act 2000, digital documents in DigiLocker/mParivahan are legally treated at par with physical originals. Please verify my screen directly."',
        document_link: 'docs/MoRTH_Circular_RT11036_64_2017_MV.html#highlight-digilocker',
        document_title: 'MoRTH Official Circular RT-11036/64/2017-MV'
      };
    }

    // 3. Key Snatching & Deflating Tires
    if (text.includes('key') || text.includes('ignition') || text.includes('snatch') || text.includes('deflate') || text.includes('tire') || text.includes('tyre')) {
      return {
        situation: 'Illegal Vehicle Key Removal / Deflating Tires',
        outcome: 'High Court directives and Police Conduct Guidelines strictly prohibit police personnel from snatching ignition keys or deflating vehicle tires during routine checking.',
        suggested_words: '"Sir, High Court guidelines prohibit snatching ignition keys or deflating tires. I am fully cooperating with checking, please allow me to present my documents respectfully."',
        document_link: 'docs/OFFICIAL_GOVT_CIRCULARS_INDEX.html',
        document_title: 'High Court Guidelines & Police Standing Orders'
      };
    }

    // 4. OEM Factory Modification / Silencer / Exhaust / Alloys / DRLs
    if (text.includes('silencer') || text.includes('exhaust') || text.includes('re') || text.includes('enfield') || text.includes('alloy') || text.includes('drl') || text.includes('modification') || text.includes('alteration')) {
      return {
        situation: 'Allegation of Illegal Modification on Stock OEM Component',
        outcome: 'Factory-fitted stock components certified by ARAI/ICAT under Form 22 Homologation (Rule 126 CMVR) are 100% exempt from alteration penalties under Section 52 MV Act proviso.',
        suggested_words: '"Sir, this is a stock factory component certified under Form 22 Type Approval by ARAI under CMVR Rule 126. The proviso to Section 52 MV Act explicitly excludes manufacturer stock specifications from alteration penalties."',
        document_link: 'docs/Section_52_ARAI_Homologation_Proof.html#highlight-section52',
        document_title: 'Section 52 MV Act & ARAI Homologation Proof'
      };
    }

    // 5. Helmet & Turban Exemption
    if (text.includes('helmet') || text.includes('turban') || text.includes('sikh') || text.includes('headgear')) {
      return {
        situation: 'Riding Without Helmet / Sikh Turban Exemption',
        outcome: 'Section 129 MV Act mandates BIS helmets for two-wheeler riders above 4 years. The proviso to Section 129 explicitly exempts turban-wearing Sikhs from helmet penalties.',
        suggested_words: '"Sir, under the statutory proviso to Section 129 of the Motor Vehicles Act, Sikhs wearing a turban are legally exempt from helmet requirements."',
        document_link: 'docs/MV_Act_Batch_1_Statutory_Proofs.html#highlight-v1',
        document_title: 'Section 129 & Section 194D Helmet Statutory Provision'
      };
    }

    // 6. Seatbelt & Child Safety
    if (text.includes('seatbelt') || text.includes('seat belt') || text.includes('child') || text.includes('kid')) {
      return {
        situation: 'Seatbelt / Unsecured Child Violation',
        outcome: 'Section 194B(1) penalizes driving without seatbelt (₹1,000). Section 194B(2) penalizes carrying unsecured children under 14 (₹1,000). Medical exemption certificates are valid.',
        suggested_words: '"Sir, Section 194B applies to seatbelt compliance. I have valid medical documentation / child restraint safety installed as per Section 194B."',
        document_link: 'docs/MV_Act_Batch_1_Statutory_Proofs.html#highlight-v2',
        document_title: 'Section 194B Seatbelt & Child Safety Provision'
      };
    }

    // 7. Speeding & Radar Camera Traps
    if (text.includes('speed') || text.includes('overspeed') || text.includes('fast') || text.includes('radar')) {
      return {
        situation: 'Over-speeding Citation / Speed Camera Trap',
        outcome: 'Section 112/183 MV Act (LMV fine ₹1,000-₹2,000). Under CMVR Rule 167A, automated speed traps MUST be preceded by clearly visible speed limit signboards placed in advance of checking zones.',
        suggested_words: '"Sir, under CMVR Rule 167A, speed radar enforcement zones must have legally mandated speed limit signages placed prior to the enforcement area."',
        document_link: 'docs/MV_Act_Batch_1_Statutory_Proofs.html#highlight-v10',
        document_title: 'Section 112 & 183 Speeding Statutory Provision'
      };
    }

    // 8. Red Light Jump / Signal Violation
    if (text.includes('red light') || text.includes('signal') || text.includes('light') || text.includes('stop line')) {
      return {
        situation: 'Red Light Jump / Stop Line Violation',
        outcome: 'Section 184/177. Camera RLVD e-challans MUST furnish clear photo/video evidence showing front tires crossing the marked stop line while signal was RED. Crossing on yellow is not a violation.',
        suggested_words: '"Sir, under Rule 167A CMVR, camera signal challans must provide clear photo evidence of vehicle crossing the stop line on RED. Entering the junction on yellow is permitted."',
        document_link: 'docs/MV_Act_Batch_2_Statutory_Proofs.html#highlight-v16',
        document_title: 'Section 184 & Rule 167A Red Light Camera Mandate'
      };
    }

    // 9. Document Production & 15-Day Grace Period
    return {
      situation: 'Document Production / 15-Day Grace Period & Rank Authority',
      outcome: 'Under CMVR Rule 139, if you do not carry physical or digital documents at checking time, you have a 15-day statutory grace period to produce them before the traffic authority. Under Section 200/206 MV Act, spot compounding requires a Sub-Inspector (SI) with an e-challan system.',
      suggested_words: '"Sir, under CMVR Rule 139, I request a 15-day grace memo to produce my documents before the traffic station rather than levying an immediate spot fine for non-possession."',
      document_link: 'docs/MV_Act_Batch_1_Statutory_Proofs.html#highlight-v5',
      document_title: 'CMVR Rule 139 & Section 181 Statutory Provision'
    };
  }
}

const trafficVoiceAnalyzer = new VoiceLinguisticAnalyzer();
