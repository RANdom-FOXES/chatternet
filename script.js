// Get DOM elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Event listener for sending messages
sendButton.addEventListener('click', () => {
    sendMessage();
});


// Function to append a message to the chat window
function appendMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(messageElement);

    // Scroll to the bottom of the chat window
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize Socket.io
const socket = io();

// Event listener for receiving messages
socket.on('chat message', (message) => {
    appendMessage('User', message);
});

// Function to send a message using Socket.io
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.emit('chat message', message);
        appendMessage('You', message);
        messageInput.value = '';
    }
}

// Event listener for the Enter key to send messages
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});