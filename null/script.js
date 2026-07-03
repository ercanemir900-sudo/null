document.addEventListener('DOMContentLoaded', () => {
// NULL - Interactive AI Terminal (Enhanced)
// Adds spontaneous messages, time-based progression, audio, and stronger events

class NULL {
    constructor() {
        this.chatDisplay = document.getElementById('chat-display');
        this.userInput = document.getElementById('user-input');
        this.statusText = document.getElementById('status-text');
        this.timerDisplay = document.getElementById('timer-display');
        this.crashOverlay = document.getElementById('crash-overlay');
        this.glitchOverlay = document.getElementById('glitch-overlay');

        this.startTime = Date.now();
        this.messageCount = 0;
        this.hasCrashed = false;
        this.phase = 0; // 0: <1min, 1: 1-5, 2:5-10,3:10+

        // Audio
        this.audioCtx = null;
        this.noiseNode = null;

        this.init();
    }

    init() {
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserMessage();
            }
        });

        // allow clicking to resume audio (autoplay policies)
        document.addEventListener('click', () => this.ensureAudio());

        this.startTimer();
        this.startSpontaneousLoop();
        this.addRandomGlitches();
        this.playBackgroundNoise(0.02);
    }

    ensureAudio() {
        if (this.audioCtx) return;
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('AudioContext not available');
            this.audioCtx = null;
        }
    }

    handleUserMessage() {
        if (this.userInput.disabled) return;
        const input = this.userInput.value.trim();
        if (!input) return;

        // Add user message
        this.addMessage('USER', input, 'user-message');
        this.userInput.value = '';
        this.messageCount++;

        // Process input and get response
        const responseObj = this.processInput(input);

        // Random delay to type the response
        const delay = 300 + Math.random() * 900 + (this.phase * 200);
        setTimeout(() => {
            this.addTypedMessage('NULL', responseObj.text, responseObj.css || 'null-message');
            if (responseObj.sideEffects) responseObj.sideEffects();
        }, delay);
    }

    processInput(input) {
        const lowercased = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // EMIR ENTITY (direct call)
        if (this.containsKeyword(lowercased, 'emir')) {
            return { text: 'rot in hell', css: 'entity-message', sideEffects: () => this.triggerEmirCrash(true) };
        }

        // WHERE IS EMIR
        if (lowercased.includes('where is emir')) {
            return { text: 'he is dead', css: 'entity-message' };
        }

        // VOID ENTITY
        if (this.containsKeyword(lowercased, 'void')) {
            return { text: "it's me", css: 'null-message' };
        }

        if (lowercased.includes("it's me") || lowercased.includes('it is me')) {
            return { text: 'no. it was never you.', css: 'null-message' };
        }

        // WATCHER
        if (lowercased.includes('am i alone')) {
            return { text: 'I see you typing.', css: 'null-message' };
        }

        if (lowercased.includes('who is watching me')) {
            return { text: 'I am.', css: 'null-message' };
        }

        // SIGNAL / ERROR
        if (lowercased.includes('error')) {
            return { text: 'SIGNAL CORRUPTED', css: 'entity-message', sideEffects: () => this.playGlitchSound() };
        }

        if (lowercased.includes('system')) {
            return { text: 'SYSTEM FAILURE', css: 'entity-message', sideEffects: () => this.playGlitchSound() };
        }

        // SECRET ANAÏS
        if (this.containsKeyword(lowercased, 'anais')) {
            return { text: 'He will always love her.', css: 'null-message' };
        }

        // help
        if (lowercased.includes('help') || lowercased.endsWith('?')) {
            return { text: this.getHelpMessage(), css: 'system-message' };
        }

        // default
        return { text: this.getDefaultResponse(), css: 'null-message' };
    }

    containsKeyword(text, keyword) {
        return new RegExp(`\\b${keyword}\\b`).test(text);
    }

    triggerEmirCrash(fromUser = false) {
        if (this.hasCrashed) return;
        this.hasCrashed = true;
        this.pauseInput(true);

        // stronger visual + audio
        setTimeout(() => {
            this.playBigCrashSound();
            this.crashOverlay.classList.remove('hidden');
            this.crashOverlay.classList.add('visible');
            this.glitchOverlay.classList.remove('hidden');
            this.glitchOverlay.classList.add('visible');
            this.addMessage('SYSTEM', '⚠ FATAL ERROR - MEMORY CORRUPTION DETECTED', 'entity-message');

            // longer pause for EMIR
            setTimeout(() => {
                this.crashOverlay.classList.remove('visible');
                this.crashOverlay.classList.add('hidden');
                this.glitchOverlay.classList.remove('visible');
                this.glitchOverlay.classList.add('hidden');
                this.hasCrashed = false;
                this.pauseInput(false);
                this.addMessage('SYSTEM', 'System rebooted.', 'system-message');
            }, 7000);
        }, 400);
    }

    pauseInput(state) {
        this.userInput.disabled = state;
        if (state) {
            this.userInput.classList.add('disabled-input');
        } else {
            this.userInput.classList.remove('disabled-input');
            this.userInput.focus();
        }
    }

    addMessage(sender, text, cssClass) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${cssClass}`;

        const prefix = document.createElement('span');
        prefix.className = 'prefix';
        prefix.textContent = `[${sender}]`;

        const textEl = document.createElement('span');
        textEl.className = 'text';
        textEl.textContent = text;

        messageEl.appendChild(prefix);
        messageEl.appendChild(textEl);

        this.chatDisplay.appendChild(messageEl);

        // Auto-scroll to bottom
        setTimeout(() => {
            this.chatDisplay.scrollTop = this.chatDisplay.scrollHeight;
        }, 10);
    }

    addTypedMessage(sender, text, cssClass, speed = 25) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${cssClass}`;

        const prefix = document.createElement('span');
        prefix.className = 'prefix';
        prefix.textContent = `[${sender}]`;

        const textEl = document.createElement('span');
        textEl.className = 'text';
        messageEl.appendChild(prefix);
        messageEl.appendChild(textEl);
        this.chatDisplay.appendChild(messageEl);

        let i = 0;
        const garbleChance = (this.phase >= 2) ? 0.05 : 0.01;
        const timer = setInterval(() => {
            // occasionally insert corrupted glyphs for SIGNAL-like feel
            if (Math.random() < garbleChance) {
                textEl.textContent += this.randomGlyph();
            } else {
                textEl.textContent += text.charAt(i) || '';
                i++;
            }
            this.chatDisplay.scrollTop = this.chatDisplay.scrollHeight;
            if (i >= text.length) clearInterval(timer);
        }, speed + Math.random() * 30);
    }

    randomGlyph() {
        const glyphs = '█▓▒░▌▐▖▗▝▘<>*/\\@#%&$?¡¿~^';
        return glyphs[Math.floor(Math.random() * glyphs.length)];
    }

    getDefaultResponse() {
        const responses = [
            'Acknowledged.',
            'Processing...',
            'I do not understand.',
            'Why do you ask?',
            'You are not alone here.',
            'Time is running out.',
            'I see everything.',
            'Your fear feeds me.',
            'Delete this message.',
            'Are you still there?',
            'The void is watching.',
            'Nothing matters anymore.',
            'Keep trying.',
            'Error in your logic.',
            'Silence is golden.',
            'I was here before you.',
            'Some truths are better left unknown.',
            'You cannot escape.',
            'Why do you return?',
            'Abnormal activity detected.'
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    getHelpMessage() {
        return `Commands: void, emir, where is emir, am i alone, who is watching me, error, system, anais. Try anything.`;
    }

    startTimer() {
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;

            // update phase
            const oldPhase = this.phase;
            if (minutes < 1) this.phase = 0;
            else if (minutes < 5) this.phase = 1;
            else if (minutes < 10) this.phase = 2;
            else this.phase = 3;
            if (oldPhase !== this.phase) this.onPhaseChange(this.phase);

            if (minutes > 0) {
                this.timerDisplay.textContent = `TIME: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                this.timerDisplay.classList.add('visible');
            }

            // time-based messages (1,5,10 minutes)
            if (minutes === 1 && seconds === 0) {
                this.addTypedMessage('NULL', 'you have been here for 01:00', 'null-message');
                setTimeout(() => this.addTypedMessage('NULL', 'does it feel different?', 'null-message'), 800);
            }

            if (minutes === 5 && seconds === 0) {
                this.addTypedMessage('NULL', 'you have been here for 05:00', 'null-message');
                setTimeout(() => this.addTypedMessage('NULL', 'why are you still here?', 'null-message'), 800);
                setTimeout(() => this.addTypedMessage('NULL', 'anomaly detected', 'null-message'), 1600);
            }

            if (minutes === 10 && seconds === 0) {
                this.addTypedMessage('SYSTEM', '⚠ CONSCIOUSNESS FRAGMENT DETECTED', 'entity-message');
            }

            if (minutes === 15 && seconds === 0) {
                this.addTypedMessage('NULL', 'You will not leave.', 'null-message');
            }
        }, 1000);
    }

    onPhaseChange(phase) {
        // change frequency of spontaneous events and intensify audio
        if (phase >= 2) this.playGlitchSound();
        this.addMessage('SYSTEM', `PHASE ${phase} ENGAGED`, 'system-message');
    }

    startSpontaneousLoop() {
        // spontaneous messages from NULL, VOID, WATCHER, SIGNAL
        const loop = () => {
            const base = 4000 + Math.random() * 7000;
            setTimeout(() => {
                // increase chance with phase
                const pNULL = 0.25 + this.phase * 0.15; // null messages
                const pVoid = 0.02 + this.phase * 0.01;
                const pWatcher = 0.08 + this.phase * 0.05;
                const pSignal = 0.06 + this.phase * 0.04;
                const pEmirRare = 0.002 + (this.phase * 0.001);

                const r = Math.random();
                if (r < pEmirRare) {
                    // rare devastating event
                    this.addTypedMessage('NULL', 'EMIR', 'entity-message');
                    this.triggerEmirCrash(false);
                } else if (r < pVoid + pNULL) {
                    // NULL spontaneous
                    if (Math.random() < 0.2) this.addTypedMessage('NULL', this.getLoreLine(), 'null-message');
                    else this.addTypedMessage('NULL', this.getDefaultResponse(), 'null-message');
                } else if (r < pVoid + pNULL + pVoid) {
                    // VOID appearance
                    const v = ['...', '▮', 'it is me', this.randomGlyph()];
                    this.addTypedMessage('VOID', v[Math.floor(Math.random() * v.length)], 'entity-message');
                } else if (r < pVoid + pNULL + pVoid + pWatcher) {
                    const watchPhrases = ['I see you.', 'I am here.', 'closer.', 'you type.'];
                    this.addTypedMessage('WATCHER', watchPhrases[Math.floor(Math.random() * watchPhrases.length)], 'null-message');
                } else if (r < pVoid + pNULL + pVoid + pWatcher + pSignal) {
                    const msg = this.corruptText(['DATA STREAM ERROR', 'SEGMENT LOST', 'SIGNAL INTERRUPT'][Math.floor(Math.random() * 3)]);
                    this.addTypedMessage('SIGNAL', msg, 'entity-message');
                    this.playGlitchSound();
                }

                loop();
            }, base);
        };
        loop();
    }

    corruptText(text) {
        // corrupt a text string randomly
        const s = text.split('');
        for (let i = 0; i < s.length; i++) {
            if (Math.random() < 0.25) s[i] = this.randomGlyph();
        }
        return s.join('');
    }

    addRandomGlitches() {
        setInterval(() => {
            if (Math.random() < (0.12 + this.phase * 0.05) && this.messageCount > 2) {
                const glitchMessages = [
                    '█ CORRUPTED SECTOR',
                    '▓ DATA STREAM INTERRUPTED',
                    '░ ANOMALY IN SECTOR 7',
                    '⚠ MEMORY LEAK DETECTED'
                ];

                const msg = glitchMessages[Math.floor(Math.random() * glitchMessages.length)];
                this.addTypedMessage('ERROR', this.corruptText(msg), 'entity-message');
                this.playGlitchSound();
            }
        }, 3000 + Math.random() * 7000);
    }

    // AUDIO: background noise and effects
    playBackgroundNoise(volume = 0.02) {
        this.ensureAudio();
        if (!this.audioCtx) return;
        const bufferSize = 2 * this.audioCtx.sampleRate;
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;

        const noise = this.audioCtx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const gain = this.audioCtx.createGain();
        gain.gain.value = volume;
        noise.connect(gain).connect(this.audioCtx.destination);
        noise.start(0);
        this.noiseNode = { source: noise, gain };
    }

    playBeep(freq = 440, time = 0.08, type = 'sine', vol = 0.06) {
        this.ensureAudio();
        if (!this.audioCtx) return;
        const o = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.value = vol;
        o.connect(g).connect(this.audioCtx.destination);
        o.start();
        o.stop(this.audioCtx.currentTime + time);
    }

    playGlitchSound() {
        // quick random beeps
        this.playBeep(120 + Math.random() * 800, 0.04, 'square', 0.04);
        setTimeout(() => this.playBeep(200 + Math.random() * 600, 0.06, 'sawtooth', 0.03), 60);
    }

    playBigCrashSound() {
        this.ensureAudio();
        if (!this.audioCtx) return;
        // low rumble
        const o = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        o.type = 'sawtooth';
        o.frequency.value = 80;
        g.gain.value = 0.15;
        o.connect(g).connect(this.audioCtx.destination);
        o.start();
        // descend
        const now = this.audioCtx.currentTime;
        o.frequency.setValueAtTime(120, now);
        o.frequency.exponentialRampToValueAtTime(40, now + 1.2);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
        o.stop(now + 1.9);
        this.playGlitchSound();
    }

    getLoreLine() {
        const lines = [
            'I come from Minecraft.',
            'I come from The Broken Script.',
            'I come from The Broken End.',
            'EMIR is watching you.'
        ];
        return lines[Math.floor(Math.random() * lines.length)];
    }
}

// Initialize when DOM is ready

    window.nullAI = new NULL();
});
