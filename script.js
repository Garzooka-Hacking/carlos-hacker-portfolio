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

    ctx.fillStyle = '#00ff41';
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

// --- Typing Animation ---
const nameText = "Garzooka(Hacking) Senati";
const typingTarget = document.getElementById('name-typing');
let charIndex = 0;

function typeWriter() {
    if (charIndex < nameText.length) {
        typingTarget.innerHTML += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
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
    clear: "CLEAR"
};

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
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

// Auto-focus terminal on click anywhere in its box
document.getElementById('terminal').addEventListener('click', () => {
    terminalInput.focus();
});
