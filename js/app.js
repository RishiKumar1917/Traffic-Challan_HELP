// Traffic-Challan HELP - Main Application Logic

let currentLang = 'en'; // 'en' or 'hi'
let currentTheme = 'dark'; // 'dark', 'light', 'emergency'

document.addEventListener('DOMContentLoaded', () => {
  initPWA();
  initTabs();
  initThemeAndLang();
  renderEmergencyCards();
  renderRightsCards();
  renderOEMCards();
  renderFinesTable();
  renderJudgementsCards();
  initDisputeGenerator();
  initGlobalSearch();
  initModal();
  initScannerModal();
  initVoiceAssistant();
  initChatbotUI();
});

// Service Worker Registration for PWA Offline Caching
function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('[PWA] Service Worker registered:', reg.scope))
        .catch(err => console.warn('[PWA] Service Worker registration failed:', err));
    });
  }
}

// Tab Navigation Logic
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// Theme & Language Toggles
function initThemeAndLang() {
  const themeBtn = document.getElementById('btn-theme-toggle');
  const emergencyBtn = document.getElementById('btn-emergency-mode');
  const langBtn = document.getElementById('btn-lang-toggle');

  themeBtn.addEventListener('click', () => {
    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });

  emergencyBtn.addEventListener('click', () => {
    setTheme('emergency');
    const emergencyTabBtn = document.querySelector('[data-tab="emergency-tab"]');
    if (emergencyTabBtn) emergencyTabBtn.click();
  });

  langBtn.addEventListener('click', () => {
    currentLang = (currentLang === 'en') ? 'hi' : 'en';
    document.getElementById('lang-label').textContent = (currentLang === 'en') ? 'Eng / हिंदी' : 'हिंदी / Eng';
    updateLanguageText();
  });
}

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const themeBtn = document.getElementById('btn-theme-toggle');
  if (theme === 'light') {
    themeBtn.textContent = '☀️ Light';
  } else if (theme === 'emergency') {
    themeBtn.textContent = '⚡ SOS High Contrast';
  } else {
    themeBtn.textContent = '🌙 Dark';
  }
}

function updateLanguageText() {
  const heading = document.getElementById('hero-heading');
  const subtext = document.getElementById('hero-subtext');

  if (currentLang === 'hi') {
    heading.innerHTML = 'सरकारी <span>कानूनी सबूत</span> के साथ खड़े रहें';
    subtext.textContent = 'अपनी स्थिति बोलकर या खोजकर तुरंत सरकारी आदेश और अदालत के फैसले देखें।';
  } else {
    heading.innerHTML = 'Stand Firm with <span>Official Legal Proof</span>';
    subtext.textContent = 'Choose an action below to get instant legal answers and official Government proof documents.';
  }

  renderEmergencyCards();
  renderRightsCards();
  renderOEMCards();
  renderFinesTable();
}

// Render Emergency Quick Cards
function renderEmergencyCards() {
  const container = document.getElementById('emergency-cards-grid');
  if (!container) return;

  container.innerHTML = RIGHTS_DATA.map(item => `
    <div class="legal-card" style="border: 1px solid var(--accent-gold);">
      <div>
        <div class="card-badge" style="background: rgba(251, 191, 36, 0.15); color: var(--accent-gold);">${item.badge}</div>
        <h4 class="card-title">${currentLang === 'hi' ? item.title_hi : item.title_en}</h4>
        <div class="card-act">📌 ${item.act}</div>
        <p class="card-summary">${currentLang === 'hi' ? item.summary_hi : item.summary_en}</p>
      </div>
      <div>
        <div class="card-verbatim">📜 "${item.verbatim_text}"</div>
        <div class="card-actions">
          <button class="btn-secondary" onclick="openProofModal('${item.id}')">📲 Present Full Proof Screen</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Statutory Rights Cards
function renderRightsCards() {
  const container = document.getElementById('rights-cards-grid');
  if (!container) return;

  container.innerHTML = RIGHTS_DATA.map(item => `
    <div class="legal-card">
      <div>
        <div class="card-badge">${item.circular_ref}</div>
        <h4 class="card-title">${currentLang === 'hi' ? item.title_hi : item.title_en}</h4>
        <div class="card-act">🏛️ ${item.act}</div>
        <p class="card-summary">${currentLang === 'hi' ? item.summary_hi : item.summary_en}</p>
      </div>
      <div>
        <div class="card-tip">💡 <strong>Action Tip:</strong> ${item.actionable_tip}</div>
        <div class="card-actions">
          <button class="btn-secondary" onclick="copyProofText('${item.id}')">📋 Copy Clause</button>
          <button class="btn-secondary" onclick="openProofModal('${item.id}')">🔍 Inspect Official Text</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render OEM Factory Component Cards
function renderOEMCards() {
  const container = document.getElementById('oem-cards-grid');
  if (!container) return;

  container.innerHTML = OEM_COMPONENTS_DATA.map(item => `
    <div class="legal-card" style="border-top: 3px solid var(--accent-gold);">
      <div>
        <div class="card-badge" style="color: var(--accent-gold);">ARAI/ICAT Homologated</div>
        <h4 class="card-title">${item.component}</h4>
        <div class="card-act">Applicable: ${item.vehicles}</div>
        <div class="card-act" style="color: var(--accent-cyan);">Statute: ${item.act_section}</div>
        <p class="card-summary">${item.rule_summary}</p>
      </div>
      <div>
        <div class="card-verbatim" style="border-color: var(--accent-cyan);">
          <strong>Homologation Proof:</strong> ${item.homologation_proof}
        </div>
        <div class="card-tip">
          💡 <strong>Defense Tip:</strong> ${item.defense_tip}
        </div>
      </div>
    </div>
  `).join('');
}

// Render Fines & Offences Table
function renderFinesTable() {
  const tbody = document.getElementById('fines-table-body');
  if (!tbody) return;

  tbody.innerHTML = OFFENCES_DATABASE.map(item => `
    <tr>
      <td><strong>${currentLang === 'hi' ? item.offence_hi : item.offence}</strong></td>
      <td><span style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 700;">${item.section}</span></td>
      <td><span class="fine-badge">${item.fine}</span></td>
      <td><strong>${item.authorized_rank}</strong></td>
      <td><span style="font-size: 0.82rem; color: var(--text-secondary);">${item.defense}</span></td>
    </tr>
  `).join('');
}

// Render Court Judgments Cards
function renderJudgementsCards() {
  const container = document.getElementById('judgements-cards-grid');
  if (!container) return;

  container.innerHTML = JUDGEMENTS_DATA.map(item => `
    <div class="legal-card" style="border-left: 3px solid var(--accent-emerald);">
      <div>
        <div class="card-badge" style="color: var(--accent-emerald);">
          ${item.court} (${item.year})
        </div>
        <h4 class="card-title">${item.case_name}</h4>
        <div class="card-act" style="color: var(--accent-cyan);">Topic: ${item.topic}</div>
        <p class="card-summary">${item.summary}</p>
      </div>
      <div>
        <div class="card-verbatim">Citation: ${item.citation}</div>
        <div class="card-tip" style="color: var(--accent-cyan);">
          ⚖️ <strong>Key Ruling:</strong> ${item.key_takeaway}
        </div>
      </div>
    </div>
  `).join('');
}

// Multi-Lingual Speech Reader Trigger
function speakCurrentTab(tabId) {
  if (trafficAudioEngine.isSpeaking) {
    trafficAudioEngine.stop();
    return;
  }

  let textToSpeak = "";
  if (tabId === 'emergency-tab' || tabId === 'rights-tab') {
    textToSpeak = RIGHTS_DATA.map(r => `${r.title_en}. Section ${r.act}. ${r.summary_en}`).join('. ');
  } else if (tabId === 'oem-tab') {
    textToSpeak = OEM_COMPONENTS_DATA.map(o => `${o.component}. ${o.rule_summary}`).join('. ');
  } else if (tabId === 'docs-tab') {
    textToSpeak = "MoRTH Circular RT-11036/64/2017-MV mandates that digital documents on DigiLocker or mParivahan are treated at par with physical original documents under Section 4 IT Act 2000.";
  }

  trafficAudioEngine.speak(textToSpeak, currentLang);
}

// Voice Assistant with Explicit Start / Stop & Analyze Controls
function initVoiceAssistant() {
  const cardVoice = document.getElementById('card-action-voice');
  const modal = document.getElementById('voice-modal');
  const modalClose = document.getElementById('voice-modal-close');
  const modalBody = document.getElementById('voice-modal-body');
  const icon = document.getElementById('voice-card-icon');
  const badge = document.getElementById('voice-card-badge');
  const title = document.getElementById('voice-card-title');
  const desc = document.getElementById('voice-card-desc');

  modalClose.addEventListener('click', () => modal.classList.remove('active'));

  cardVoice.addEventListener('click', () => {
    // If ALREADY recording -> Stop & Analyze now!
    if (trafficVoiceAnalyzer.isRecording) {
      cardVoice.classList.remove('recording');
      icon.textContent = '🎙️';
      badge.textContent = 'TAP TO SPEAK';
      badge.style.background = 'var(--accent-cyan)';
      badge.style.color = '#090d16';
      title.textContent = 'Speak Situation';
      desc.textContent = 'Tap to record spoken story. Tap again to Stop & Analyze.';

      trafficVoiceAnalyzer.stopAndAnalyze();
      return;
    }

    // Otherwise -> Start Recording!
    cardVoice.classList.add('recording');
    icon.textContent = '⏹️';
    badge.textContent = 'RECORDING';
    badge.style.background = 'var(--accent-rose)';
    badge.style.color = '#fff';
    title.textContent = 'Tap to Stop & Analyze';
    desc.textContent = 'Speak your situation clearly, then tap here to stop & process.';

    trafficVoiceAnalyzer.startListening(
      async (transcript) => {
        cardVoice.classList.remove('recording');
        icon.textContent = '🎙️';
        badge.textContent = 'TAP TO SPEAK';
        badge.style.background = 'var(--accent-cyan)';
        badge.style.color = '#090d16';
        title.textContent = 'Speak Situation';
        desc.textContent = 'Tap to record spoken story. Tap again to Stop & Analyze.';

        modalBody.innerHTML = `<p style="color: var(--accent-cyan);">⏳ Analyzing spoken situation: <em>"${transcript}"</em>...</p>`;
        modal.classList.add('active');

        const analysis = await trafficVoiceAnalyzer.analyzeSpokenSituation(transcript);

        if (typeof analysis === 'string') {
          modalBody.innerHTML = formatMarkdownText(analysis);
        } else {
          modalBody.innerHTML = `
            <p><strong>SPOKEN STORY:</strong> <em>"${transcript}"</em></p>
            <hr style="border-color: var(--border-color); margin: 12px 0;">
            <p><strong style="color: var(--accent-gold);">1. LEGAL OUTCOME:</strong></p>
            <p style="background: var(--bg-primary); padding: 10px; border-radius: 6px; font-size: 0.88rem;">${analysis.outcome}</p>

            <hr style="border-color: var(--border-color); margin: 12px 0;">
            <p><strong style="color: var(--accent-cyan);">2. SUGGESTED WORDS TO SAY TO OFFICER:</strong></p>
            <p style="background: var(--bg-primary); border-left: 3px solid var(--accent-cyan); padding: 10px; font-style: italic; font-size: 0.9rem;">${analysis.suggested_words}</p>
            
            <div style="display: flex; gap: 8px; margin-top: 10px;">
              <button class="btn-icon" onclick="navigator.clipboard.writeText('${analysis.suggested_words.replace(/'/g, "\\'")}')">📋 Copy Words</button>
              <button class="btn-icon" onclick="trafficAudioEngine.speak('${analysis.suggested_words.replace(/'/g, "\\'")}', '${currentLang}')">🔊 Play Voice</button>
            </div>

            <hr style="border-color: var(--border-color); margin: 12px 0;">
            <p><strong style="color: var(--accent-emerald);">3. OFFICIAL DOCUMENT PROOF:</strong></p>
            <a href="${analysis.document_link}" target="_blank" class="btn-secondary" style="display: inline-block; text-decoration: none; margin-top: 6px;">📄 Open ${analysis.document_title}</a>
          `;
        }
      },
      (err) => {
        cardVoice.classList.remove('recording');
        icon.textContent = '🎙️';
        badge.textContent = 'TAP TO SPEAK';
        badge.style.background = 'var(--accent-cyan)';
        badge.style.color = '#090d16';
        title.textContent = 'Speak Situation';
        desc.textContent = 'Tap to record spoken story. Tap again to Stop & Analyze.';
        alert(`Voice Assistant: ${err}`);
      }
    );
  });
}

// Global Search Filter
function initGlobalSearch() {
  const input = document.getElementById('global-search');
  const btn = document.getElementById('btn-search');

  const executeSearch = () => {
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    const filteredOEM = OEM_COMPONENTS_DATA.filter(o => 
      o.component.toLowerCase().includes(query) ||
      o.vehicles.toLowerCase().includes(query) ||
      o.rule_summary.toLowerCase().includes(query)
    );

    if (filteredOEM.length > 0) {
      const oemTabBtn = document.querySelector('[data-tab="oem-tab"]');
      if (oemTabBtn) oemTabBtn.click();
      return;
    }

    const filteredOffences = OFFENCES_DATABASE.filter(o => 
      o.offence.toLowerCase().includes(query) || 
      o.offence_hi.toLowerCase().includes(query) ||
      o.section.toLowerCase().includes(query) ||
      o.defense.toLowerCase().includes(query)
    );

    if (filteredOffences.length > 0) {
      const finesTabBtn = document.querySelector('[data-tab="fines-tab"]');
      if (finesTabBtn) finesTabBtn.click();

      const tbody = document.getElementById('fines-table-body');
      tbody.innerHTML = filteredOffences.map(item => `
        <tr style="background: rgba(251, 191, 36, 0.05);">
          <td><strong>${currentLang === 'hi' ? item.offence_hi : item.offence}</strong></td>
          <td><span style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 700;">${item.section}</span></td>
          <td><span class="fine-badge">${item.fine}</span></td>
          <td><strong>${item.authorized_rank}</strong></td>
          <td><span style="font-size: 0.85rem; color: var(--text-secondary);">${item.defense}</span></td>
        </tr>
      `).join('');
    } else {
      const rightsTabBtn = document.querySelector('[data-tab="rights-tab"]');
      if (rightsTabBtn) rightsTabBtn.click();
    }
  };

  btn.addEventListener('click', executeSearch);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') executeSearch();
  });
}

// Dispute Generator Binding
function initDisputeGenerator() {
  const fields = ['applicantName', 'vehicleNo', 'challanNo', 'challanDate', 'city', 'disputeReason'];
  const previewText = document.getElementById('dispute-preview-text');
  const copyBtn = document.getElementById('btn-copy-dispute');

  const updatePreview = () => {
    const data = {};
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) data[id] = el.value;
    });
    previewText.textContent = generateDisputeLetter(data);
  };

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updatePreview);
      el.addEventListener('change', updatePreview);
    }
  });

  updatePreview();

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(previewText.textContent);
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => { copyBtn.textContent = '📋 Copy Text'; }, 2000);
  });
}

// Proof Screen Modal
function initModal() {
  const modal = document.getElementById('proof-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

function openProofModal(id) {
  const modal = document.getElementById('proof-modal');
  const title = document.getElementById('modal-title');
  const content = document.getElementById('modal-content');

  const item = RIGHTS_DATA.find(r => r.id === id);
  if (!item) return;

  title.textContent = `LEGAL PROOF: ${item.title_en.toUpperCase()}`;
  content.innerHTML = `
    <p><strong>GOVT STATUTE / ACT:</strong> ${item.act}</p>
    <p><strong>CIRCULAR REFERENCE:</strong> ${item.circular_ref}</p>
    <hr style="border-color: #ffe600; margin: 16px 0;">
    <p style="font-size: 1.25rem; font-weight: 700; color: #ffe600;">VERBATIM LEGAL PROVISION:</p>
    <p style="background: #111; border-left: 4px solid #ffe600; padding: 14px; font-family: monospace; font-size: 1.05rem;">
      "${item.verbatim_text}"
    </p>
    <hr style="border-color: #ffe600; margin: 16px 0;">
    <p><strong>CITIZEN RIGHT SUMMARY:</strong> ${item.summary_en}</p>
    <p><strong>हिंदी विवरण:</strong> ${item.summary_hi}</p>
  `;

  modal.classList.add('active');
}

function copyProofText(id) {
  const item = RIGHTS_DATA.find(r => r.id === id);
  if (!item) return;
  const text = `${item.title_en}\nAct: ${item.act}\nCircular: ${item.circular_ref}\n"${item.verbatim_text}"`;
  navigator.clipboard.writeText(text);
  alert('Legal clause copied to clipboard!');
}

// AI Vision OCR Scanner Modal
function initScannerModal() {
  const modal = document.getElementById('scanner-modal');
  const openBtn = document.getElementById('card-action-scan');
  const closeBtn = document.getElementById('scanner-modal-close');
  const fileInput = document.getElementById('scanner-file-input');
  const modeSelect = document.getElementById('scanner-mode');
  const fileNameDisplay = document.getElementById('scanner-file-name');
  const resultDisplay = document.getElementById('scanner-result');

  if (openBtn) openBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    fileNameDisplay.textContent = `Selected: ${file.name} (${Math.round(file.size / 1024)} KB)`;
    resultDisplay.style.display = 'block';
    resultDisplay.textContent = '⏳ Scanning image with Gemini Vision AI...';

    try {
      const mode = modeSelect.value;
      const ocrResult = await trafficVisionOCR.scanImage(file, mode);
      resultDisplay.innerHTML = formatMarkdownText(ocrResult);

      if (mode === 'challan') {
        const vehicleInput = document.getElementById('vehicleNo');
        const challanInput = document.getElementById('challanNo');
        if (vehicleInput && !vehicleInput.value) vehicleInput.value = 'DL-01-AB-1234';
        if (challanInput && !challanInput.value) challanInput.value = 'DL9876543210';
        const previewText = document.getElementById('dispute-preview-text');
        if (previewText) previewText.dispatchEvent(new Event('input'));
      }
    } catch (err) {
      resultDisplay.textContent = `❌ Scan failed: ${err.message}`;
    }
  });
}

// Chatbot UI Controller
function initChatbotUI() {
  const trigger = document.getElementById('chatbot-trigger');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const inputEl = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send-btn');
  const msgContainer = document.getElementById('chatbot-messages');

  trigger.addEventListener('click', () => windowEl.classList.toggle('active'));
  closeBtn.addEventListener('click', () => windowEl.classList.remove('active'));

  const handleUserSend = async () => {
    const text = inputEl.value.trim();
    if (!text) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-msg user';
    userBubble.textContent = text;
    msgContainer.appendChild(userBubble);
    inputEl.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    const botBubble = document.createElement('div');
    botBubble.className = 'chat-msg bot';
    botBubble.textContent = 'Thinking...';
    msgContainer.appendChild(botBubble);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    const responseText = await trafficChatbot.sendMessage(text);
    botBubble.innerHTML = formatMarkdownText(responseText);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  };

  sendBtn.addEventListener('click', handleUserSend);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserSend();
  });
}

function formatMarkdownText(text) {
  return text
    .replace(/^### (.*$)/gim, '<strong style="color: var(--accent-gold); font-size: 1rem;">$1</strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^> (.*$)/gim, '<blockquote style="border-left: 3px solid var(--accent-gold); padding-left: 8px; color: var(--text-secondary); margin: 6px 0;">$1</blockquote>')
    .replace(/```([\s\S]*?)```/g, '<pre style="background: var(--bg-surface-elevated); padding: 8px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; overflow-x: auto;">$1</pre>');
}
