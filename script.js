// --- Matrix Rain Effect ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const drawMatrix = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dynamic color based on theme
    const computedStyle = getComputedStyle(document.documentElement);
    ctx.fillStyle = computedStyle.getPropertyValue('--primary-green').trim();
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(drawMatrix, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- Theme Switcher ---
window.setTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    // Beep confirmation
    playBeep(400, 'sine', 0.1);
};

// --- Typing Animation ---
const nameText = "Garzooka(Hacking) Senati";
const typingTarget = document.getElementById('name-typing');
let charIndex = 0;

function typeWriter() {
    if (charIndex < nameText.length) {
        typingTarget.innerHTML += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else {
        // Typing finished, enable glitch
        typingTarget.setAttribute('data-text', nameText);
        typingTarget.classList.add('glitch');
    }
}

// Clear initial text to start animation
typingTarget.innerHTML = "";
typeWriter();

// --- Interactive Terminal ---
const terminalInput = document.getElementById('terminal-input');
const terminalHistory = document.getElementById('terminal-history');

const commands = {
    help: "Available commands: help, about, skills, contact, clear, whoami, status",
    about: "Garzooka(Hacking) Senati: Cybersecurity specialist and developer. Expert in identifying vulnerabilities and building secure, efficient workflows.",
    skills: "Mastery in: Python, JavaScript, Pentesting, Data Analysis, Reverse Engineering, and Security Automation.",
    contact: "Uplink Secure Channel: Reach out via LinkedIn or GitHub. (Form submission simulated)",
    whoami: "You are an authorized visitor exploring the digital workspace of CJPH.",
    status: "System: ACTIVE | Security: HIGH | Encryption: AES-256-GCM",
    projects: "LOADING ARCHIVES... \n > Network Sniffer v1.0 [ONLINE] \n > Secure Chat Protocol [BETA] \n > Auto-Pentest Bot [CLASSIFIED]",
    socials: "CONNECTING... \n > GitHub: github.com/Garzooka-Hacking \n > LinkedIn: (End-to-End Encrypted)",
    sudo_access_granted: "ACCESS GRANTED. \n [!] ROOT PRIVILEGES UNLOCKED. \n [!] WELCOME, OPERATOR. \n [!] SECRET CONTACT: garzooka.ctf@protonmail.com",
    clear: "CLEAR"
};

// CTF Teaser
console.log("%c⚠️ SYSTEM ALERT: Unauthorized observer detected.", "color: red; font-size: 16px; font-weight: bold;");
console.log("%cCan you bypass the firewall? Check the DOM source for backdoors...", "color: #00ff41; font-family: monospace;");

// Audio Intelligence
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep(freq = 800, type = 'square', duration = 0.05) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

terminalInput.addEventListener('keydown', (e) => {
    playBeep(1200, 'sine', 0.03); // Typing sound
    if (e.key === 'Enter') {
        playBeep(600, 'triangle', 0.1); // Enter sound
        const input = terminalInput.value.toLowerCase().trim();
        const response = commands[input] || `Command not found: ${input}. Type 'help' for options.`;

        if (input === 'clear') {
            terminalHistory.innerHTML = '';
        } else {
            const line = document.createElement('div');
            line.innerHTML = `<span class="prompt">guest@cjph:~$</span> ${terminalInput.value}`;
            terminalHistory.appendChild(line);

            const resLine = document.createElement('div');
            resLine.style.color = '#00f3ff';
            resLine.style.marginBottom = '10px';
            resLine.textContent = response;
            terminalHistory.appendChild(resLine);
        }

        terminalInput.value = '';
        terminalHistory.scrollTop = terminalHistory.scrollHeight;
    }
});

// --- Network Traffic Simulation ---
const trafficCanvas = document.getElementById('traffic-canvas');
const trafficCtx = trafficCanvas.getContext('2d');
const packetsVal = document.getElementById('packets-val');
const latencyVal = document.getElementById('latency-val');

// Set canvas resolution high for sharpness
trafficCanvas.width = 230;
trafficCanvas.height = 60;

let trafficData = new Array(50).fill(30); // Baseline traffic
let packetCount = 0;

function drawTraffic() {
    // Shift data
    trafficData.shift();
    // Generate new random value (simulating bursts)
    const newValue = Math.random() > 0.9 ? Math.random() * 50 + 10 : Math.random() * 20 + 20;
    trafficData.push(newValue);

    // Clear
    trafficCtx.clearRect(0, 0, trafficCanvas.width, trafficCanvas.height);

    // Draw Grid
    trafficCtx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
    trafficCtx.lineWidth = 1;
    trafficCtx.beginPath();
    for (let i = 0; i < trafficCanvas.width; i += 20) {
        trafficCtx.moveTo(i, 0);
        trafficCtx.lineTo(i, trafficCanvas.height);
    }
    trafficCtx.stroke();

    // Draw Line
    trafficCtx.strokeStyle = '#00ff41';
    trafficCtx.lineWidth = 2;
    trafficCtx.beginPath();
    trafficCtx.moveTo(0, trafficCanvas.height - trafficData[0]);

    for (let i = 1; i < trafficData.length; i++) {
        const x = (i / (trafficData.length - 1)) * trafficCanvas.width;
        const y = trafficCanvas.height - trafficData[i];
        trafficCtx.lineTo(x, y);
    }
    trafficCtx.stroke();

    // Fill area under line
    trafficCtx.fillStyle = 'rgba(0, 255, 65, 0.2)';
    trafficCtx.lineTo(trafficCanvas.width, trafficCanvas.height);
    trafficCtx.lineTo(0, trafficCanvas.height);
    trafficCtx.fill();

    // Update stats
    packetCount += Math.floor(Math.random() * 5);
    packetsVal.innerText = packetCount;
    if (Math.random() > 0.8) latencyVal.innerText = Math.floor(Math.random() * 40 + 10) + 'ms';

    requestAnimationFrame(drawTraffic);
}

drawTraffic();

// --- Live Visitor Simulation ---
const visitorCount = document.getElementById('visitor-count');
let currentVisitors = 0;

// Initialize: Start at 0, jump to 1 (You) quickly
setTimeout(() => {
    currentVisitors = 1;
    updateVisitorDisplay();
}, 1000);

function updateVisitorDisplay() {
    visitorCount.innerText = currentVisitors;
    visitorCount.style.textShadow = currentVisitors > 1 ? "0 0 10px red" : "none";
    visitorCount.style.color = currentVisitors > 1 ? "var(--error-red)" : "var(--primary-green)";
}

function simulateTrafficFluctuation() {
    // 20% chance to change visitor count
    if (Math.random() > 0.8) {
        const change = Math.random() > 0.5 ? 1 : -1;
        currentVisitors += change;

        // Bounds: Never below 1 (You are always here), Max 5 (for realism)
        if (currentVisitors < 1) currentVisitors = 1;
        if (currentVisitors > 5) currentVisitors = 5;

        updateVisitorDisplay();

        // Sound notification if "new user" enters
        if (change > 0 && currentVisitors > 1) playBeep(300, 'square', 0.1);
    }

    setTimeout(simulateTrafficFluctuation, Math.random() * 5000 + 3000);
}

// Start fluctuation loop
simulateTrafficFluctuation();

// Auto-focus terminal on click anywhere in its box
document.getElementById('terminal').addEventListener('click', () => {
    terminalInput.focus();
});
