async function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value;

    if (message === "") return;

    let chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();

    chatBox.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;

    // Handle commands
    if (data.command) {
        executeClientCommand(message.toLowerCase());
    }

    // Speak the response
    speakText(data.reply);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Execute client-side commands
function executeClientCommand(message) {
    if (message.includes('youtube')) {
        window.open('https://www.youtube.com', '_blank');
    } else if (message.includes('google')) {
        window.open('https://www.google.com', '_blank');
    } else if (message.includes('facebook')) {
        window.open('https://www.facebook.com', '_blank');
    } else if (message.includes('twitter')) {
        window.open('https://www.twitter.com', '_blank');
    } else if (message.includes('github')) {
        window.open('https://www.github.com', '_blank');
    }
}

// Text-to-speech function
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Slightly slower for natural speech
        utterance.pitch = 1;
        utterance.volume = 0.8;

        // Optional: Choose a more natural voice
        const voices = speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.includes('Female'));
        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        speechSynthesis.speak(utterance);
    }
}

// Initialize speech synthesis voices
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = function() {
        // Voices are loaded
    };
}

// Voice input variables
let recognition;
let isListening = false;
let speechEnabled = true;

// Initialize speech recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById("user-input").value = transcript;
        sendMessage();
    };

    recognition.onend = function() {
        isListening = false;
        document.getElementById("mic-btn").style.background = "#38bdf8";
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        isListening = false;
        document.getElementById("mic-btn").style.background = "#38bdf8";
    };
}

// Start voice input
function startVoiceInput() {
    if (!recognition) {
        alert("Speech recognition is not supported in your browser.");
        return;
    }

    if (isListening) {
        recognition.stop();
        isListening = false;
        document.getElementById("mic-btn").style.background = "#38bdf8";
    } else {
        recognition.start();
        isListening = true;
        document.getElementById("mic-btn").style.background = "#ff6b6b";
    }
}

// Toggle speech output
function toggleSpeech() {
    speechEnabled = !speechEnabled;
    const btn = document.getElementById("speak-btn");
    if (speechEnabled) {
        btn.innerHTML = "🔊";
        btn.title = "Toggle Speech (On)";
    } else {
        btn.innerHTML = "🔇";
        btn.title = "Toggle Speech (Off)";
    }
}

// Modified speakText function
function speakText(text) {
    if (!speechEnabled) return;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Slightly slower for natural speech
        utterance.pitch = 1;
        utterance.volume = 0.8;

        // Optional: Choose a more natural voice
        const voices = speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.includes('Female'));
        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        speechSynthesis.speak(utterance);
    }
}
