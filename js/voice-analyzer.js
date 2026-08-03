// Traffic-Challan HELP - Voice Assistant & Linguistic Legal Analyzer

class VoiceLinguisticAnalyzer {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.isRecording = false;

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN'; // Default to Indian English / Hindi mix
    }
  }

  isSupported() {
    return !!this.recognition;
  }

  startListening(onTranscript, onError) {
    if (!this.recognition) {
      onError('Voice recognition is not supported in your browser. Please type your situation instead.');
      return;
    }

    this.isRecording = true;
    this.recognition.lang = (currentLang === 'hi') ? 'hi-IN' : 'en-IN';

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.isRecording = false;
      onTranscript(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isRecording = false;
      onError(event.error || 'Voice input error.');
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };

    this.recognition.start();
  }

  stopListening() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
    }
  }

  async analyzeSpokenSituation(spokenText) {
    const text = spokenText.toLowerCase();

    // Check Gemini API Key if available
    const apiKey = trafficChatbot.getApiKey();
    if (apiKey) {
      try {
        return await this.callGeminiLinguisticAPI(spokenText, apiKey);
      } catch (err) {
        console.warn('Gemini Linguistic Analysis failed, falling back to local engine:', err);
      }
    }

    // Local Rules Engine Fallback
    return this.generateLocalLinguisticAnalysis(text);
  }

  async callGeminiLinguisticAPI(spokenText, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptText = `Analyze this spoken citizen situation during an Indian traffic police check: "${spokenText}"

Perform Linguistic & Legal Analysis and return 3 distinct sections:
1. IDENTIFIED SITUATION & LEGAL OUTCOME (Which MV Act section or circular applies?)
2. EXACT WORDS TO SAY TO THE OFFICER (Civil, firm, and legally grounded dialogue in English/Hindi)
3. OFFICIAL DOCUMENT PROOF (Which MoRTH circular or court precedent proves this?)`;

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
    if (text.includes('digilocker') || text.includes('digital') || text.includes('paper') || text.includes('phone')) {
      return {
        situation: 'Police Refusing DigiLocker / mParivahan Documents',
        outcome: 'VIOLATION OF MORTH RULES. Digital DL, RC, Insurance, and PUC shown on official DigiLocker/mParivahan apps are 100% legally valid under Section 4 of IT Act 2000 & CMVR Rule 139.',
        suggested_words: '"Sir, under MoRTH Circular RT-11036/64/2017-MV and Section 4 of the IT Act 2000, digital documents in DigiLocker/mParivahan are treated at par with physical originals. Demanding paper copies is contrary to Central rules. Please verify my DigiLocker screen directly."',
        document_link: 'docs/MoRTH_Circular_RT11036_64_2017_MV.html',
        document_title: 'MoRTH Official Circular RT-11036/64/2017-MV'
      };
    } else if (text.includes('key') || text.includes('tire') || text.includes('snatch') || text.includes('lock')) {
      return {
        situation: 'Illegal Vehicle Key Removal / Deflating Tires',
        outcome: 'ILLEGAL POLICE CONDUCT. High Court directives and Police Standing Orders strictly prohibit officers from snatching keys or damaging vehicles during checking.',
        suggested_words: '"Sir, High Court directives and Police Conduct Guidelines prohibit snatching ignition keys or deflating tires. I am fully cooperating with checking, please allow me to present my documents respectfully."',
        document_link: 'docs/OFFICIAL_GOVT_CIRCULARS_INDEX.md',
        document_title: 'High Court Guidelines & Police Standing Orders'
      };
    } else if (text.includes('silencer') || text.includes('exhaust') || text.includes('re') || text.includes('enfield') || text.includes('alloy') || text.includes('drl')) {
      return {
        situation: 'Allegation of Illegal Modification on Stock OEM Component',
        outcome: 'PROTECTED UNDER SECTION 52 MV ACT. Factory-fitted stock components certified by ARAI/ICAT under Form 22 Homologation (Rule 126 CMVR) are 100% legal exemptions.',
        suggested_words: '"Sir, this is a stock factory component certified under Form 22 Type Approval by ARAI under CMVR Rule 126. The proviso to Section 52 MV Act explicitly excludes manufacturer stock specifications from alteration penalties."',
        document_link: 'docs/Section_52_ARAI_Homologation_Proof.html',
        document_title: 'Section 52 MV Act & ARAI Homologation Proof'
      };
    } else {
      return {
        situation: 'Routine Traffic Checking / Document Demand',
        outcome: 'Under CMVR Rule 139, if you do not carry physical or digital documents right now, you have a 15-day statutory grace period to produce them before the transport authority.',
        suggested_words: '"Sir, under CMVR Rule 139, I request a 15-day grace memo to produce my documents before the traffic station rather than levying an immediate spot fine for non-possession."',
        document_link: 'docs/MoRTH_Circular_RT11036_64_2017_MV.html',
        document_title: 'CMVR Rule 139 Statutory Provision'
      };
    }
  }
}

// Global Voice Analyzer Instance
const trafficVoiceAnalyzer = new VoiceLinguisticAnalyzer();
