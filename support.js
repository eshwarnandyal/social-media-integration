function sendMessage() {
      const input = document.getElementById('messageInput');
      const chatBody = document.getElementById('chatBody');
      const messageText = input.value.trim();

      if (messageText) {
        const msg = document.createElement('div');
        msg.classList.add('message', 'sent');
        msg.textContent = messageText;
        chatBody.appendChild(msg);
        input.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }