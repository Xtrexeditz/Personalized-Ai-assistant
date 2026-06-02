require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ static folder connect
app.use(express.static(path.join(__dirname)));

// ✅ home route fix (IMPORTANT)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

// ✅ chat API
const API_KEY = process.env.API_KEY;

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    // Check for commands
    const command = detectCommand(message);
    if (command) {
        const result = executeCommand(command);
        res.json({ reply: result, command: true });
        return;
    }

    try {
        // Simple conversational AI responses
        const reply = generateResponse(message);
        res.json({ reply, command: false });

    } catch (error) {
        console.error("Error:", error);
        res.json({ reply: "I'm having trouble connecting right now. Please try again.", command: false });
    }
});

// Command detection function
function detectCommand(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('open youtube') || lowerMessage.includes('youtube')) {
        return 'youtube';
    }
    if (lowerMessage.includes('open google') || lowerMessage.includes('google')) {
        return 'google';
    }
    if (lowerMessage.includes('open facebook') || lowerMessage.includes('facebook')) {
        return 'facebook';
    }
    if (lowerMessage.includes('open twitter') || lowerMessage.includes('twitter')) {
        return 'twitter';
    }
    if (lowerMessage.includes('open github') || lowerMessage.includes('github')) {
        return 'github';
    }
    if (lowerMessage.includes('time') || lowerMessage.includes('what time')) {
        return 'time';
    }
    if (lowerMessage.includes('date') || lowerMessage.includes('what date')) {
        return 'date';
    }

    return null;
}

// Command execution function
function executeCommand(command) {
    switch (command) {
        case 'youtube':
            return "Opening YouTube for you! 🎥";
        case 'google':
            return "Opening Google for you! 🔍";
        case 'facebook':
            return "Opening Facebook for you! 👥";
        case 'twitter':
            return "Opening Twitter for you! 🐦";
        case 'github':
            return "Opening GitHub for you! 💻";
        case 'time':
            return `The current time is ${new Date().toLocaleTimeString()}. ⏰`;
        case 'date':
            return `Today's date is ${new Date().toLocaleDateString()}. 📅`;
        default:
            return "I'm not sure how to handle that command.";
    }
}

// Simple conversational AI function
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
        const greetings = [
            "Hello! How can I help you today?",
            "Hi there! What's on your mind?",
            "Hey! Nice to see you. What can I do for you?",
            "Hello! How are you doing today?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // How are you
    if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you do')) {
        return "I'm doing great, thank you for asking! I'm here and ready to help you with anything you need.";
    }

    // What's your name
    if (lowerMessage.includes('your name') || lowerMessage.includes('who are you')) {
        return "I'm your AI Assistant! I'm here to help you with questions, open websites, and have conversations.";
    }

    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return "You're very welcome! Is there anything else I can help you with?";
    }

    // Questions about capabilities
    if (lowerMessage.includes('what can you do') || lowerMessage.includes('help')) {
        return "I can help you with many things! I can answer questions, open websites (like YouTube, Google, Facebook), tell you the time, and have conversations. Just ask me anything!";
    }

    // Time related
    if (lowerMessage.includes('time') && !lowerMessage.includes('open')) {
        return `The current time is ${new Date().toLocaleTimeString()}.`;
    }

    // Date related
    if (lowerMessage.includes('date') && !lowerMessage.includes('open')) {
        return `Today's date is ${new Date().toLocaleDateString()}.`;
    }

    // Weather (mock response)
    if (lowerMessage.includes('weather')) {
        return "I don't have access to real-time weather data right now, but I hope it's nice where you are!";
    }

    // Jokes
    if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything! 😂",
            "Why did the computer go to the doctor? It had a virus! 🖥️",
            "What do you call fake spaghetti? An impasta! 🍝"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Default responses for other messages
    const defaultResponses = [
        `That's interesting! Tell me more about "${message}".`,
        `I understand you're talking about "${message}". How can I help with that?`,
        `Thanks for sharing that! Is there something specific you'd like me to help you with?`,
        `I see. What would you like to know or do next?`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ✅ start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
