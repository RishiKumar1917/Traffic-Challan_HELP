// Traffic-Challan HELP - Multi-Lingual Text-to-Speech Audio Readout Engine

class AudioSpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.languageCodes = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'kn': 'kn-IN',
      'mr': 'mr-IN',
      'bn': 'bn-IN',
      'gu': 'gu-IN',
      'pa': 'pa-IN'
    };
  }

  isSupported() {
    return !!this.synth;
  }

  speak(text, langCode = 'en') {
    if (!this.synth) {
      alert('Text-to-Speech is not supported in your browser.');
      return;
    }

    // Stop ongoing speech
    this.stop();

    if (!text.trim()) return;

    const targetLang = this.languageCodes[langCode] || 'en-IN';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang;
    utterance.rate = 0.95; // Slightly slower for clear mobile speech

    // Try to find matching voice
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(langCode) || v.lang === targetLang);
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateAudioButtons(false);
    };

    utterance.onerror = (err) => {
      console.warn('Speech synthesis error:', err);
      this.isSpeaking = false;
      this.updateAudioButtons(false);
    };

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.updateAudioButtons(true);
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth && this.isSpeaking) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.updateAudioButtons(false);
    }
  }

  updateAudioButtons(speaking) {
    const btns = document.querySelectorAll('.btn-audio-speak');
    btns.forEach(btn => {
      if (speaking) {
        btn.textContent = '⏹️ Stop Audio';
        btn.classList.add('speaking');
      } else {
        btn.textContent = '🔊 Read Out Loud';
        btn.classList.remove('speaking');
      }
    });
  }
}

// Global Audio Engine Instance
const trafficAudioEngine = new AudioSpeechEngine();
