// Traffic-Challan HELP - Gemini Powered Legal & OEM Assistant Chatbot

class LegalChatbot {
  constructor() {
    this.apiKey = localStorage.getItem('gemini_api_key') || '';
    this.messages = [];
    this.systemPrompt = `You are TrafficGuard AI, an expert legal assistant for Indian Traffic Laws, Motor Vehicles Act 1988/2019, Central Motor Vehicles Rules (CMVR) 1989, MoRTH Circulars, High Court precedents, and OEM Vehicle Component Homologation standards.

YOUR GOAL:
Provide accurate, authoritative, and actionable legal guidance to Indian citizens dealing with traffic police checks, e-challan disputes, and wrongful penalties for factory vehicle components (e.g. stock silencers, DRLs, alloy wheels, DigiLocker validity).

KEY KNOWLEDGE BASES:
1. DigiLocker & mParivahan: Section 4 IT Act 2000 & MoRTH Circular RT-11036/64/2017-MV (Dated 08-08-2018 & 17-12-2018) treat digital DL, RC, Insurance, PUC as equivalent to physical originals.
2. Document Grace Period: CMVR Rule 139 gives 15 days to produce missing documents before compounding.
3. Officer Powers: Section 200 MV Act restricts major compounding & license seizure powers to Sub-Inspectors (SI) / ASI and above. Constables cannot levy high cash spot fines independently.
4. Key Removal & Tire Deflation: Strictly prohibited by High Court directives and Police Conduct Manuals under Article 21.
5. OEM Vehicle Components (Section 52 MV Act): Factory-fitted components (e.g., Royal Enfield stock silencers, KTM exhausts, OEM alloy wheels, factory DRLs, engine crash guards) are certified under Form 22 ARAI/ICAT Homologation (Rule 126 CMVR) and are 100% legal. They DO NOT count as illegal modifications under Section 52.
6. Window Tinting: CMVR Rule 100 & Avishek Goenka v. UOI allow factory green glass with VLT >70% (Front/Rear) and >50% (Sides). Aftermarket films are prohibited.

INSTRUCTIONS:
- Give concise, direct, step-by-step advice.
- Quote relevant MV Act sections, MoRTH circular numbers, and court precedents.
- Keep language civil, firm, and legally grounded. Format with bullet points for easy reading on mobile screens.
- Support both English and Hindi language queries.`;
  }

  setApiKey(key) {
    this.apiKey = key.trim();
    if (this.apiKey) {
      localStorage.setItem('gemini_api_key', this.apiKey);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  }

  getApiKey() {
    return this.apiKey;
  }

  async sendMessage(userText) {
    if (!userText.trim()) return;

    // Add user message to history
    this.messages.push({ role: 'user', content: userText });

    // If Gemini API Key is present, call Gemini API
    if (this.apiKey) {
      try {
        const responseText = await this.callGeminiAPI(userText);
        this.messages.push({ role: 'assistant', content: responseText });
        return responseText;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local Dataset Assistant:', err);
        const fallbackText = this.generateFallbackAnswer(userText) + `\n\n*(Note: Gemini API Key call returned an error: ${err.message}. Showing local offline knowledge response.)*`;
        this.messages.push({ role: 'assistant', content: fallbackText });
        return fallbackText;
      }
    } else {
      // Offline / Local Dataset Assistant
      const fallbackText = this.generateFallbackAnswer(userText);
      this.messages.push({ role: 'assistant', content: fallbackText });
      return fallbackText;
    }
  }

  async callGeminiAPI(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
    
    // Format conversation history for Gemini API
    const contents = [
      {
        role: 'user',
        parts: [{ text: `[SYSTEM INSTRUCTION]\n${this.systemPrompt}\n\n[USER QUERY]\n${prompt}` }]
      }
    ];

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('Invalid response structure from Gemini API');
    }
    return candidateText;
  }

  generateFallbackAnswer(query) {
    const q = query.toLowerCase();

    // Check OEM Components Database
    if (typeof OEM_COMPONENTS_DATA !== 'undefined') {
      const matchedOEM = OEM_COMPONENTS_DATA.find(o => 
        q.includes(o.id) || 
        o.component.toLowerCase().includes(q) ||
        o.vehicles.toLowerCase().includes(q) ||
        q.includes('exhaust') || q.includes('silencer') || q.includes('alloy') || q.includes('drl') || q.includes('tint') || q.includes('crash guard')
      );
      if (matchedOEM) {
        return `### 🛠️ OEM Component & Homologation Legal Proof\n\n` +
          `**Component:** ${matchedOEM.component}\n` +
          `**Act & Section:** ${matchedOEM.act_section}\n` +
          `**Homologation Proof:** ${matchedOEM.homologation_proof}\n\n` +
          `**Legal Summary:** ${matchedOEM.rule_summary}\n\n` +
          `💡 **How to Respond to Police:** ${matchedOEM.defense_tip}\n\n` +
          `\`\`\`\n${matchedOEM.allowed_vs_illegal}\n\`\`\``;
      }
    }

    // Check Statutory Rights Database
    if (typeof RIGHTS_DATA !== 'undefined') {
      const matchedRight = RIGHTS_DATA.find(r => 
        q.includes('digilocker') || q.includes('digital') || q.includes('paper') ? r.id === 'digilocker-validity' :
        q.includes('15') || q.includes('grace') || q.includes('forget') ? r.id === 'grace-period-15-days' :
        q.includes('rank') || q.includes('constable') || q.includes('si') ? r.id === 'officer-rank-power' :
        q.includes('key') || q.includes('tire') || q.includes('snatch') ? r.id === 'key-snatching-tires' : null
      );
      if (matchedRight) {
        return `### 📜 Statutory Right & Circular Reference\n\n` +
          `**${matchedRight.title_en}** (${matchedRight.act})\n` +
          `**Circular:** ${matchedRight.circular_ref}\n\n` +
          `> "${matchedRight.verbatim_text}"\n\n` +
          `💡 **Action Tip:** ${matchedRight.actionable_tip}`;
      }
    }

    // Check Offences Database
    if (typeof OFFENCES_DATABASE !== 'undefined') {
      const matchedOffence = OFFENCES_DATABASE.find(o => 
        q.includes('helmet') ? o.offence.toLowerCase().includes('helmet') :
        q.includes('speed') ? o.offence.toLowerCase().includes('speed') :
        q.includes('seatbelt') ? o.offence.toLowerCase().includes('seatbelt') :
        q.includes('drunk') || q.includes('alcohol') ? o.offence.toLowerCase().includes('drunk') : null
      );
      if (matchedOffence) {
        return `### 💰 Offence & Fine Detail\n\n` +
          `**Offence:** ${matchedOffence.offence}\n` +
          `**Section:** ${matchedOffence.section}\n` +
          `**Standard Fine:** ${matchedOffence.fine}\n` +
          `**Authorized Officer:** ${matchedOffence.authorized_rank}\n\n` +
          `🛡️ **Statutory Defense:** ${matchedOffence.defense}`;
      }
    }

    // Generic fallback response
    return `### ⚖️ Traffic Legal & OEM Advice\n\n` +
      `Under the Motor Vehicles Act 1988/2019 and CMVR 1989:\n\n` +
      `- **DigiLocker / mParivahan Documents**: Legally valid under Section 4 IT Act 2000 & MoRTH Circular RT-11036/64/2017-MV.\n` +
      `- **Factory Components (OEM)**: Stock silencers, alloy wheels, DRLs, and crash guards certified under ARAI/ICAT Form 22 Homologation DO NOT violate Section 52 MV Act.\n` +
      `- **15-Day Grace Period**: CMVR Rule 139 allows 15 days to present missing documents.\n` +
      `- **Officer Rank**: Constables cannot levy high cash spot fines without a Sub-Inspector (SI).\n\n` +
      `*Tip: Add your Gemini API Key in the Chatbot settings for real-time AI legal analysis!*`;
  }
}

// Global Chatbot Instance
const trafficChatbot = new LegalChatbot();
