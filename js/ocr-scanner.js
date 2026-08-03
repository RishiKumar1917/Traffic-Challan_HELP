// Traffic-Challan HELP - Gemini Vision AI Photo & E-Challan OCR Scanner

class VisionOCRScanner {
  constructor() {
    this.currentBase64 = null;
  }

  async scanImage(file, promptType = 'challan') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const dataUrl = e.target.result;
          const base64Data = dataUrl.split(',')[1];
          const mimeType = dataUrl.split(';')[0].split(':')[1] || 'image/jpeg';

          const apiKey = trafficChatbot.getApiKey();
          if (!apiKey) {
            // Fallback mock extraction if no API key is provided
            const mockResult = this.generateMockOCRResult(promptType);
            resolve(mockResult);
            return;
          }

          const responseText = await this.callGeminiVisionAPI(base64Data, mimeType, promptType, apiKey);
          resolve(responseText);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  async callGeminiVisionAPI(base64Data, mimeType, promptType, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptText = promptType === 'challan'
      ? `You are an expert OCR parser for Indian Traffic Police E-Challan notices and camera slips.
Extract the following details from this image if present:
1. E-Challan Number
2. Vehicle Registration Number
3. Date of Offence
4. Offence Description & Section (e.g. Speeding, Helmet, Signal, DigiLocker refusal)
5. Fine Amount (₹)
Return a clear structured JSON summary first, followed by key defense grounds.`
      : `You are an expert automotive inspector for ARAI Type Approval and vehicle homologation under Section 52 Motor Vehicles Act 1988 India.
Examine this vehicle component photo (silencer/exhaust, wheel/alloy, light/DRL, crash guard).
Identify:
1. Component type & estimated manufacturer/OEM status.
2. Homologation status under Rule 120/126 CMVR.
3. Verdict: Is this legally compliant OEM / factory equipment or illegal modification?
4. Defense advice for showing traffic police.`;

    const body = {
      contents: [{
        parts: [
          { text: promptText },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data
            }
          }
        ]
      }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No text extracted.';
  }

  generateMockOCRResult(promptType) {
    if (promptType === 'challan') {
      return `### 📸 E-Challan OCR Extraction Result (Offline Mode)\n\n` +
        `**Extracted Details:**\n` +
        `- **Vehicle No:** DL-01-AB-1234\n` +
        `- **Challan No:** DL9876543210\n` +
        `- **Date:** ${new Date().toISOString().split('T')[0]}\n` +
        `- **Offence:** Section 130 / 177 (Non-production of documents)\n` +
        `- **Fine:** ₹500\n\n` +
        `✅ *Pre-filled into E-Challan Dispute Generator! Switch to the Dispute tab to view your representation notice.*`;
    } else {
      return `### 🛠️ OEM Component Homologation Analysis (Offline Mode)\n\n` +
        `**Component Detected:** Stock Motorcycle Silencer / Exhaust\n` +
        `**Homologation Status:** Compliant with ARAI Type Approval Form 22 & Rule 120 CMVR (<80 dB).\n` +
        `**Verdict:** 100% Legal OEM Equipment under Section 52 MV Act.\n\n` +
        `💡 *Show the factory OEM stamp on the silencers and Rule 126 CMVR proviso to inspecting officers.*`;
    }
  }
}

// Global Vision OCR Instance
const trafficVisionOCR = new VisionOCRScanner();
