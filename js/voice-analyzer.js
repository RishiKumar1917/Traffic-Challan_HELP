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
        console.warn('Gemini API call error, falling back:', err);
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
3. OFFICIAL GOVT DOCUMENT PROOF (MoRTH circular or Gazette reference)`;

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
        outcome: 'Digital DL, RC, Insurance, and PUC shown on DigiLocker/mParivahan are 100% legally valid under Section 4 IT Act 2000 & CMVR Rule 139.',
        suggested_words: '"Sir, under MoRTH Circular RT-11036/64/2017-MV and Section 4 of IT Act 2000, digital documents in DigiLocker/mParivahan are legally treated at par with physical originals. Please verify my screen directly."',
        document_link: 'docs/MoRTH_Circular_RT11036_64_2017_MV.html',
        document_title: 'MoRTH Official Circular RT-11036/64/2017-MV'
      };
    } else if (text.includes('key') || text.includes('tire') || text.includes('snatch') || text.includes('lock')) {
      return {
        situation: 'Illegal Vehicle Key Removal / Deflating Tires',
        outcome: 'High Court directives and Police Conduct Guidelines strictly prohibit police personnel from snatching keys or damaging vehicles during routine checking.',
        suggested_words: '"Sir, High Court guidelines prohibit snatching ignition keys or deflating tires. I am fully cooperating with checking, please allow me to present my documents respectfully."',
        document_link: 'docs/OFFICIAL_GOVT_CIRCULARS_INDEX.md',
        document_title: 'High Court Guidelines & Police Standing Orders'
      };
    } else if (text.includes('silencer') || text.includes('exhaust') || text.includes('re') || text.includes('enfield') || text.includes('alloy') || text.includes('drl')) {
      return {
        situation: 'Allegation of Illegal Modification on Stock OEM Component',
        outcome: 'Factory-fitted stock components certified by ARAI/ICAT under Form 22 Homologation (Rule 126 CMVR) are 100% legal exemptions under Section 52 MV Act.',
        suggested_words: '"Sir, this is a stock factory component certified under Form 22 Type Approval by ARAI under CMVR Rule 126. The proviso to Section 52 MV Act explicitly excludes manufacturer stock specifications from alteration penalties."',
        document_link: 'docs/Section_52_ARAI_Homologation_Proof.html',
        document_title: 'Section 52 MV Act & ARAI Homologation Proof'
      };
    } else {
      return {
        situation: 'Document Production / 15-Day Grace Period',
        outcome: 'Under CMVR Rule 139, if you do not carry physical or digital documents right now, you have a 15-day statutory grace period to produce them before the transport authority.',
        suggested_words: '"Sir, under CMVR Rule 139, I request a 15-day grace memo to produce my documents before the traffic station rather than levying an immediate spot fine for non-possession."',
        document_link: 'docs/MoRTH_Circular_RT11036_64_2017_MV.html',
        document_title: 'CMVR Rule 139 Statutory Provision'
      };
    }
  }
}

const trafficVoiceAnalyzer = new VoiceLinguisticAnalyzer();
