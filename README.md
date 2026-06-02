# AI Assistant 🤖

A conversational AI assistant that can understand commands, execute actions, and speak responses.

## Features

- **Conversational AI**: Powered by Google's Gemini AI for human-like responses
- **Command Execution**: Can open websites like YouTube, Google, Facebook, Twitter, GitHub
- **Voice Input**: Click the microphone button to speak your commands
- **Text-to-Speech**: AI responses are spoken aloud (toggle with speaker button)
- **Time & Date**: Ask for current time and date

## Supported Commands

- "Open YouTube" - Opens YouTube in a new tab
- "Open Google" - Opens Google in a new tab
- "Open Facebook" - Opens Facebook in a new tab
- "Open Twitter" - Opens Twitter in a new tab
- "Open GitHub" - Opens GitHub in a new tab
- "What time is it?" - Shows current time
- "What's the date?" - Shows current date

## How to Use

1. **Text Input**: Type your message in the input field and press Enter or click Send
2. **Voice Input**: Click the 🎤 microphone button and speak your command
3. **Speech Toggle**: Click the 🔊 speaker button to enable/disable voice responses

## Setup

1. Make sure you have Node.js installed
2. Install dependencies: `npm install`
3. Add your Google Gemini API key to the `.env` file
4. Run the server: `npm start`
5. Open http://localhost:3000 in your browser

## Requirements

- Modern web browser with Web Speech API support (Chrome recommended)
- Google Gemini API key
- Node.js

## Browser Compatibility

- **Chrome/Edge**: Full support for voice input and speech output
- **Firefox**: Speech output supported, voice input limited
- **Safari**: Limited support

Enjoy your AI assistant! 🚀
