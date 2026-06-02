body {
    font-family: Arial;
    background: #0f172a;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;
}

.chat-container {
    width: 400px;
    background: #1e293b;
    padding: 15px;
    border-radius: 10px;
}

#chat-box {
    height: 300px;
    overflow-y: auto;
    background: #020617;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.input-area {
    display: flex;
    gap: 5px;
}

input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: #334155;
    color: white;
}

input::placeholder {
    color: #94a3b8;
}

button {
    padding: 10px 15px;
    background: #38bdf8;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
}

button:hover {
    background: #0ea5e9;
}

#mic-btn, #speak-btn {
    padding: 10px;
    min-width: 45px;
    font-size: 16px;
}
