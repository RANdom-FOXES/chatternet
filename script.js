const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const chatMessages = document.getElementById('chat-messages');

// Create a Socket.io connection to the server
const socket = io('https://wakeful-acoustic-cupcake.glitch.me');

// Function to display a message
function displayMessage(user, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

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
