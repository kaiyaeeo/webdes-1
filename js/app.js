    /* =====================================================
    app.js — Logic Utama & Shared Utilities
    BookCircle Platform
    ===================================================== */

    /* ---- CHAT STATE (persists within session) ---- */
    const ChatState = {
    threads: {},        // bookId → [{text, sent}]
    autoReplies: [
        'Masih tersedia kok! Harga bisa nego sedikit 😊',
        'Boleh, bisa COD di kampus atau kirim via JNE/Sicepat.',
        'Kondisinya masih bagus, hampir tidak ada coretan sama sekali.',
        'Oke siap! Nanti saya kabari jadwal ketemunya ya.',
        'Boleh transfer BCA/BRI, atau bisa bayar pas ketemu juga.',
        'Terima kasih sudah menghubungi! Ditunggu ya 🙏',
    ],

    getThread(id) {
        if (!this.threads[id]) this.threads[id] = [];
        return this.threads[id];
    },
    addMsg(id, text, sent) {
        this.getThread(id).push({ text, sent, time: new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' }) });
    },
    autoReply(id) {
        const r = this.autoReplies[Math.floor(Math.random() * this.autoReplies.length)];
        this.addMsg(id, r, false);
    }
    };

    /* ---- ACTIVE CHAT ---- */
    let activeChatId = null;

    function openChatPanel(bookId) {
    if (!Auth.check()) {
        window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname+'?id='+bookId+'&chat=1')}`;
        return;
    }
    const book = AppState.books.find(b => b.id === +bookId);
    if (!book) return;

    activeChatId = book.id;

    // Seed opening message if first time
    if (ChatState.getThread(book.id).length === 0) {
        ChatState.addMsg(book.id, `Halo! Apakah "${book.title}" masih tersedia?`, true);
        setTimeout(() => {
        ChatState.autoReply(book.id);
        renderChatMessages(book.id);
        }, 900);
    }

    const panel = document.getElementById('chatPanel');
    if (!panel) return;

    // Fill header
    document.getElementById('chatSellerName').textContent  = book.seller;
    document.getElementById('chatBookLabel').textContent   = book.title;
    document.getElementById('chatSellerAvatar').src        = avatarUrl(book.seller);

    renderChatMessages(book.id);
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function renderChatMessages(bookId) {
    const el = document.getElementById('chatMessages');
    if (!el) return;
    const msgs = ChatState.getThread(bookId);
    el.innerHTML = msgs.map(m => `
        <div class="chat-msg ${m.sent ? 'sent' : 'recv'}">
        ${m.text}
        <span style="font-size:0.64rem;opacity:0.55;display:block;margin-top:3px;text-align:${m.sent?'right':'left'}">${m.time}</span>
        </div>
    `).join('');
    el.scrollTop = el.scrollHeight;
    }

    function sendChat() {
    if (!activeChatId) return;
    const inp  = document.getElementById('chatInput');
    const text = inp.value.trim();
    if (!text) return;

    ChatState.addMsg(activeChatId, text, true);
    renderChatMessages(activeChatId);
    inp.value = '';

    setTimeout(() => {
        ChatState.autoReply(activeChatId);
        renderChatMessages(activeChatId);
    }, 800 + Math.random() * 600);
    }

    function closeChatPanel() {
    document.getElementById('chatPanel')?.classList.add('hidden');
    }

    /* ---- GLOBAL NAV helpers ---- */
    function navToPage(path) { window.location.href = path; }

    /* ---- PASSWORD STRENGTH ---- */
    function checkPasswordStrength(val, fillId, textId) {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
        { pct:'0%',   color:'transparent',  label:'' },
        { pct:'25%',  color:'#e74c3c',      label:'Lemah' },
        { pct:'50%',  color:'#f39c12',      label:'Cukup' },
        { pct:'75%',  color:'#2ecc71',      label:'Kuat' },
        { pct:'100%', color:'#27ae60',      label:'Sangat Kuat' },
    ];
    const lv = levels[score] || levels[0];
    const fill = document.getElementById(fillId);
    const text = document.getElementById(textId);
    if (fill) { fill.style.width = lv.pct; fill.style.background = lv.color; }
    if (text) { text.textContent = lv.label; text.style.color = lv.color; }
    }

    /* ---- TOGGLE PASSWORD VISIBILITY ---- */
    function togglePassVis(inputId, btn) {
    const inp = document.getElementById(inputId);
    inp.type  = inp.type === 'password' ? 'text' : 'password';
    const icon = btn.querySelector('i');
    if (icon) icon.className = inp.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash';
    }

    /* ---- SMOOTH SCROLL to section ---- */
    function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    /* ---- CLOSE DROPDOWN on outside click ---- */
    document.addEventListener('click', e => {
    if (!e.target.closest('.user-avatar-wrap')) {
        document.getElementById('userDropdown')?.classList.add('hidden');
    }
    });

    /* ---- NAVBAR SCROLL shadow ---- */
    window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });