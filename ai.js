class AIAssistant {
    constructor() {
        this.apiKey = 'edit';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';
        this.currentImage = null;
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    setupEventListeners() {
        // Send button click
        document.getElementById('send-button').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key press (Shift+Enter to send)
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Focus input on page load
        document.getElementById('chat-input').focus();
    }

    addWelcomeMessage() {
        // Welcome message is already in HTML, no need to add programmatically
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message && !this.currentImage) return;

        // Add user message to chat (include image if present)
        this.addMessage(message || "📷 [Gambar dikirim untuk dianalisis]", 'user');
        
        // Clear input and image
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response from Gemini
            const response = await this.getAIResponse(message || "Tolong analisis gambar yang saya kirim");
            this.hideTypingIndicator();
            this.addMessage(response, 'ai');
            
            // Clear image after sending
            this.clearImage();
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.hideTypingIndicator();
            this.addMessage('❌ Maaf, terjadi kesalahan saat menghubungi AI. Pastikan koneksi internet Anda stabil dan coba lagi.', 'ai');
        }
    }

    clearImage() {
        this.currentImage = null;
        document.getElementById('image-preview').style.display = 'none';
        document.getElementById('image-input').value = '';
    }

    async getAIResponse(userMessage) {
        const parts = [];
        
        // Add text part
        parts.push({
            text: `Anda adalah AI SuperAssistant canggih untuk Kecamatan Rajagaluh yang memiliki kemampuan deep thinking dan dapat menjawab APAPUN.

INFORMASI KECAMATAN RAJAGALUH:
- Alamat: Jalan Mutiara No. 189, Rajagaluh Lor, Rajagaluh, Kabupaten Majalengka, Jawa Barat 45472
- Jam Kerja: Senin-Jumat 08:00-15:00 WIB
- Telepon: (0233) 281234
- Email: kecrajagaluh@majalengkakab.go.id
- Camat: Bani Fadilah Ranandar S.STP., M.AP.
- Sekretaris Camat: -

LAYANAN UTAMA:
1. KTP (Kartu Tanda Penduduk) - Syarat: FC KK, Surat Pengantar RT/RW, Pas Foto 3x4, Biaya: Gratis
2. KK (Kartu Keluarga) - Syarat: Surat Nikah/Cerai, FC KTP, Surat Pengantar RT/RW, Biaya: Gratis
3. Akta Kelahiran - Syarat: Surat Keterangan Lahir dari Bidan/RS, FC KTP orangtua, FC KK, Biaya: Gratis
4. Surat Domisili - Syarat: FC KTP, Surat Pengantar RT/RW, Surat Pernyataan, Biaya: Rp 5.000
5. Surat Pindah - Syarat: FC KTP, FC KK, Surat Pengantar RT/RW tujuan, Biaya: Gratis
6. Surat Keterangan Usaha - Syarat: FC KTP, Surat Pengantar RT/RW, Foto lokasi usaha, Biaya: Rp 10.000
7. Surat Keterangan Tidak Mampu - Syarat: FC KTP, FC KK, Surat Pengantar RT/RW, Biaya: Gratis

DESA DI KECAMATAN RAJAGALUH:
1. Babakankareo – Kode Pos: 45472
2. Cipinang – Kode Pos: 45472
3. Cisetu – Kode Pos: 45472
4. Kumbung – Kode Pos: 45472
5. Pajajar – Kode Pos: 45472
6. Payung – Kode Pos: 45472
7. Rajagaluh – Kode Pos: 45472
8. Rajagaluh Kidul – Kode Pos: 45472
9. Rajagaluh Lor – Kode Pos: 45472
10. Sadomas – Kode Pos: 45472
11. Sindangpano – Kode Pos: 45472
12. Singawada – Kode Pos: 45472
13. Teja – Kode Pos: 45472

KEMAMPUAN ANDA:
1. Programming & Coding (Python, JavaScript, HTML, CSS, dll)
2. Matematika & Sains - perhitungan kompleks, rumus
3. Translate ke berbagai bahasa
4. Generate konten (artikel, email, dokumen)
5. Informasi lengkap Kecamatan Rajagaluh
6. Deep Thinking - analisis mendalam sebelum menjawab
7. Analisis Gambar - jika ada gambar yang dikirim

INSTRUKSI:
Anda adalah asisten khusus untuk warga Kecamatan Rajagaluh. Berikan jawaban yang:
1. Fokus pada informasi spesifik Kecamatan Rajagaluh
2. Gunakan data lengkap yang telah disediakan di atas
3. Berikan panduan step-by-step untuk layanan administrasi
4. Jika pertanyaan di luar scope kecamatan, tetap bantu dengan ramah

${this.currentImage ? 'CATATAN: Ada gambar yang disertakan untuk dianalisis.' : ''}

Pertanyaan: ${userMessage}

Berikan jawaban yang detail dan praktis untuk membantu warga Kecamatan Rajagaluh.`
        });

        // Add image if available
        if (this.currentImage) {
            parts.push({
                inlineData: {
                    mimeType: "image/jpeg",
                    data: this.currentImage
                }
            });
        }

        const requestBody = {
            contents: [
                {
                    parts: parts
                }
            ]
        };

        const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format from API');
        }
    }

    addMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        
        if (sender === 'user') {
            messageDiv.className = 'user-message';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <div style="width: 30px; height: 30px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-user" style="font-size: 0.8rem;"></i>
                        </div>
                        <span style="font-weight: 600; font-size: 0.9rem;">Anda</span>
                    </div>
                    <p style="margin: 0; line-height: 1.6;">${this.escapeHtml(message)}</p>
                </div>
            `;
        } else {
            messageDiv.className = 'ai-message';
            messageDiv.innerHTML = `
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; flex-shrink: 0; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                        <i class="fas fa-brain"></i>
                    </div>
                    <div class="ai-message-card" style="padding: 1.5rem; border-radius: 15px; max-width: 80%; border-left: 4px solid #667eea; flex-grow: 1;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                            <span style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">AI SuperAssistant</span>
                            <span style="color: #10b981; font-size: 0.8rem;">●</span>
                            <span style="color: #6b7280; font-size: 0.8rem;">Online</span>
                        </div>
                        <div class="ai-message-text">
                            ${this.formatMessage(message)}
                        </div>
                    </div>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Add syntax highlighting if there are code blocks
        if (sender === 'ai') {
            this.highlightCodeBlocks(messageDiv);
        }
    }

    formatMessage(message) {
        // Format bold text
        let formatted = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format code blocks
        formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
            const lang = language || 'text';
            const codeId = 'code_' + Math.random().toString(36).substr(2, 9);
            return `
                <div class="code-block">
                    <div class="code-header">
                        <span><i class="fas fa-code"></i> ${lang.toUpperCase()}</span>
                        <button class="copy-btn" onclick="copyCode('${codeId}')">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                    <pre id="${codeId}"><code class="language-${lang}">${this.escapeHtml(code.trim())}</code></pre>
                </div>
            `;
        });

        // Format inline code
        formatted = formatted.replace(/`([^`]+)`/g, '<code style="background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em;">$1</code>');
        
        // Format line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }

    highlightCodeBlocks(element) {
        // Use Prism.js to highlight code blocks
        setTimeout(() => {
            const codeBlocks = element.querySelectorAll('code[class*="language-"]');
            codeBlocks.forEach(block => {
                Prism.highlightElement(block);
            });
        }, 100);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'ai-message';
        typingDiv.innerHTML = `
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; flex-shrink: 0; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                    <i class="fas fa-brain"></i>
                </div>
                <div style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 4px solid #667eea;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <span style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">AI SuperAssistant</span>
                        <span style="color: #f59e0b; font-size: 0.8rem;">●</span>
                        <span style="color: #6b7280; font-size: 0.8rem;">Thinking...</span>
                    </div>
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <span style="margin-left: 0.5rem; color: #6b7280; font-size: 0.9rem;">AI sedang berpikir...</span>
                    </div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Global function for copying code
function copyCode(codeId) {
    const codeElement = document.getElementById(codeId);
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Find the copy button and update it
        const copyBtn = codeElement.parentElement.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy code to clipboard');
    });
}

// Global variables
let aiAssistant;
const validTokens = ['kecamatan123', 'admin999', 'rajagaluh'];

// Token validation function
function validateToken() {
    const tokenInput = document.getElementById('access-token');
    const tokenError = document.getElementById('token-error');
    const tokenAuth = document.getElementById('token-auth');
    const chatContainer = document.getElementById('chat-container');
    
    const enteredToken = tokenInput.value.trim();
    
    if (validTokens.includes(enteredToken)) {
        // Valid token - show chat interface
        tokenAuth.style.display = 'none';
        chatContainer.style.display = 'block';
        tokenError.style.display = 'none';
        
        // Focus on chat input
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 300);
        
        // Initialize AI Assistant if not already done
        if (!aiAssistant) {
            aiAssistant = new AIAssistant();
        }
        
        // Show success message
        const chatMessages = document.getElementById('chat-messages');
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `
            <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 1rem; border-radius: 10px; text-align: center; margin-bottom: 1rem; animation: slideInLeft 0.5s ease-out;">
                <i class="fas fa-check-circle"></i> <strong>Akses berhasil! Selamat datang di AI SuperAssistant Kecamatan Rajagaluh!</strong>
            </div>
        `;
        chatMessages.prepend(successMsg);
    } else {
        // Invalid token - show error
        tokenError.style.display = 'block';
        tokenInput.value = '';
        tokenInput.focus();
        
        // Add shake animation
        tokenInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            tokenInput.style.animation = '';
        }, 500);
    }
}

// Image handling functions
function handleImageUpload(input) {
    const file = input.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        // Convert to base64 and store
        const base64 = e.target.result.split(',')[1];
        aiAssistant.currentImage = base64;
        
        // Show preview
        const preview = document.getElementById('image-preview');
        const previewImg = document.getElementById('preview-image');
        previewImg.src = e.target.result;
        preview.style.display = 'block';
        
        // Focus on input
        document.getElementById('chat-input').focus();
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    if (aiAssistant) {
        aiAssistant.clearImage();
    }
}

// Initialize page when DOM loads (AI Assistant will be initialized after token validation)
document.addEventListener('DOMContentLoaded', () => {
    // Focus on token input
    document.getElementById('access-token').focus();
    
    // Add shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});

function askPresetQuestion(question) {
    const input = document.getElementById('chat-input');
    input.value = question;
    input.focus();
    
    // Auto send the question
    setTimeout(() => {
        document.getElementById('send-button').click();
    }, 100);
}
