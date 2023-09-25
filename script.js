const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const chatMessages = document.getElementById('chat-messages');

// Function to display a message
function displayMessage(user, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for the send button
sendButton.addEventListener('click', () => {
  const user = 'You'; // You can replace this with user authentication
  const message = messageInput.value;
  
  if (message.trim() !== '') {
    displayMessage(user, message);
    messageInput.value = '';

    // Here, you can use fetch to send the message to your backend.
  }
});
