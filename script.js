const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const chatMessages = document.getElementById('chat-messages');
const chatStatus = document.getElementById('chat-status');
const statusSpan = document.getElementById('status');

// Create a Socket.io connection to the server
const socket = io('https://wakeful-acoustic-cupcake.glitch.me'); // Replace with your Glitch project URL

// Function to display a message
function displayMessage(user, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Update the server status
function updateStatus(statusText, statusColor) {
  statusSpan.textContent = statusText;
  statusSpan.style.color = statusColor;
}

// Handle server connection status
socket.on('connect', () => {
  updateStatus('Connected', 'green');
});

socket.on('disconnect', () => {
  updateStatus('Disconnected', 'red');
});

// Event listener for the send button
sendButton.addEventListener('click', () => {
  const user = 'You'; // Replace with user authentication if needed
  const message = messageInput.value;

  if (message.trim() !== '') {
    // Emit a 'chat message' event to the server with user and message data
    socket.emit('chat message', { user, message });
    messageInput.value = '';
  }
});

// Listen for incoming messages from the server
socket.on('chat message', (msg) => {
  displayMessage(msg.user, msg.message);
});
