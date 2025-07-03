// AI Assistant functionality using Gemini API
const GEMINI_API_KEY = 'AIzaSyBRgRY0c6nEcLIN6C7SlOhhY5DBstBqkvw';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Knowledge base about Kecamatan Rajagaluh
const KECAMATAN_INFO = `
Kecamatan Rajagaluh adalah salah satu kecamatan di Kabupaten Majalengka, Jawa Barat. Berikut informasi penting:

LAYANAN ADMINISTRASI:
1. KTP (Kartu Tanda Penduduk):
   - Syarat: KK, Akta Lahir, Surat Pengantar RT/RW, Foto 4x6 (2 lembar)
   - Waktu: 3-7 hari kerja
   - Biaya: Gratis

2. Kartu Keluarga (KK):
   - Syarat: Surat Nikah/Cerai, KTP, Akta Lahir anak, Surat Pengantar RT/RW
   - Waktu: 3-7 hari kerja  
   - Biaya: Gratis

3. Surat Keterangan Domisili:
   - Syarat: KTP, KK, Surat Pengantar RT/RW, Kontrak Sewa (jika sewa)
   - Waktu: 1-2 hari kerja
   - Biaya: Gratis

4. Surat Keterangan Usaha:
   - Syarat: KTP, KK, Surat Pengantar RT/RW, Foto tempat usaha
   - Waktu: 2-3 hari kerja
   - Biaya: Gratis

5. SKTM (Surat Keterangan Tidak Mampu):
   - Syarat: KTP, KK, Surat Pengantar RT/RW, Surat Keterangan Penghasilan
   - Waktu: 1-2 hari kerja
   - Biaya: Gratis

JAM PELAYANAN:
- Senin-Kamis: 08.00-15.00 WIB
- Jumat: 08.00-11.30 WIB dan 13.00-15.00 WIB
- Sabtu-Minggu: Tutup

KONTAK:
- Alamat: Jalan Mutiara No. 189, Rajagaluh Lor, Rajagaluh, Rajagaluh Lor, Majalengka, Kabupaten Majalengka, Jawa Barat 45472
- Telepon: (0233) 123-4567
- Email: info@rajagaluh.majalengkakab.go.id
- WhatsApp: 081234567890

LOKASI DESA:
Kecamatan Rajagaluh terdiri dari beberapa desa dengan berbagai fasilitas publik dan program pemberdayaan masyarakat.
`;

class AIAssistant {
    constructor() {
        this.chatContainer = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-button');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter (but not Shift+Enter)
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input and show loading
        this.chatInput.value = '';
        this.setLoadingState(true);

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.addMessage(response, 'ai');
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.addMessage('Maaf, saya sedang mengalami gangguan. Silakan coba lagi nanti atau hubungi langsung kantor kecamatan.', 'ai');
        } finally {
            this.setLoadingState(false);
        }
    }

    async getAIResponse(userMessage) {
        const prompt = `
Anda adalah AI Assistant untuk Kecamatan Rajagaluh. Jawab pertanyaan berikut dengan ramah, informatif, dan berdasarkan informasi yang tersedia tentang Kecamatan Rajagaluh.

INFORMASI KECAMATAN:
${KECAMATAN_INFO}

PERTANYAAN USER: ${userMessage}

INSTRUKSI:
1. Jawab dalam bahasa Indonesia yang sopan dan ramah
2. Berikan informasi yang akurat berdasarkan data kecamatan
3. Jika tidak ada informasi spesifik, sarankan untuk menghubungi kantor langsung
4. Selalu berikan alternatif kontak jika diperlukan
5. Maksimal 300 kata
6. Gunakan format yang mudah dibaca

JAWABAN:`;

        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': GEMINI_API_KEY,
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        messageDiv.style.cssText = `
            display: flex; 
            gap: 1rem; 
            margin-bottom: 1.5rem;
            ${sender === 'user' ? 'justify-content: flex-end;' : ''}
        `;

        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1rem; flex-shrink: 0;">
                    <i class="fas fa-robot"></i>
                </div>
                <div style="background: white; padding: 1rem; border-radius: 12px; box-shadow: var(--shadow-light); max-width: 80%;">
                    <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${this.formatMessage(message)}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div style="background: var(--primary-color); color: white; padding: 1rem; border-radius: 12px; max-width: 80%;">
                    <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${this.escapeHtml(message)}</p>
                </div>
                <div style="width: 40px; height: 40px; background: var(--accent-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1rem; flex-shrink: 0;">
                    <i class="fas fa-user"></i>
                </div>
            `;
        }

        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    formatMessage(message) {
        // Basic formatting for AI responses
        let formatted = this.escapeHtml(message);
        
        // Support markdown bold text with **
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Make bullet points
        formatted = formatted.replace(/^(\d+)\.\s/gm, '<strong>$1.</strong> ');
        formatted = formatted.replace(/^-\s/gm, '• ');
        
        // Make section headers bold
        formatted = formatted.replace(/^([A-Z][A-Z\s]+):$/gm, '<strong>$1:</strong>');
        
        return formatted;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.sendButton.disabled = true;
            this.sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengetik...';
            
            // Add typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.id = 'typing-indicator';
            typingDiv.style.cssText = 'display: flex; gap: 1rem; margin-bottom: 1.5rem;';
            typingDiv.innerHTML = `
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1rem; flex-shrink: 0;">
                    <i class="fas fa-robot"></i>
                </div>
                <div style="background: white; padding: 1rem; border-radius: 12px; box-shadow: var(--shadow-light);">
                    <div style="display: flex; gap: 4px;">
                        <div style="width: 8px; height: 8px; background: #ccc; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both;"></div>
                        <div style="width: 8px; height: 8px; background: #ccc; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both; animation-delay: 0.2s;"></div>
                        <div style="width: 8px; height: 8px; background: #ccc; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both; animation-delay: 0.4s;"></div>
                    </div>
                </div>
            `;
            
            this.chatContainer.appendChild(typingDiv);
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        } else {
            this.sendButton.disabled = false;
            this.sendButton.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim';
            
            // Remove typing indicator
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
    }
}

// Preset question functions
function askPresetQuestion(question) {
    const chatInput = document.getElementById('chat-input');
    chatInput.value = question;
    if (window.aiAssistant) {
        window.aiAssistant.sendMessage();
    }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for typing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize AI Assistant
    window.aiAssistant = new AIAssistant();
});