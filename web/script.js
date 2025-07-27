const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const avatarInput = document.getElementById('avatarInput');

let userAvatarUrl = '';

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            userAvatarUrl = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage('user', text, userAvatarUrl);
    chatInput.value = '';
    showTyping();
    simulateAiResponse(text).then(reply => {
        hideTyping();
        addMessage('bot', reply);
    });
});

function addMessage(sender, text, avatar) {
    const message = document.createElement('div');
    message.className = `message ${sender}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar';
    if (avatar) {
        const img = document.createElement('img');
        img.src = avatar;
        avatarDiv.appendChild(img);
    }
    message.appendChild(avatarDiv);

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    message.appendChild(bubble);

    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

let typingMessage;
function showTyping() {
    typingMessage = document.createElement('div');
    typingMessage.className = 'message bot';
    const bubble = document.createElement('div');
    bubble.className = 'bubble typing';
    bubble.textContent = 'AI is typing...';
    typingMessage.appendChild(document.createElement('div')); // empty avatar
    typingMessage.appendChild(bubble);
    chatWindow.appendChild(typingMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTyping() {
    if (typingMessage && typingMessage.parentNode) {
        chatWindow.removeChild(typingMessage);
    }
}

function simulateAiResponse(userText) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('You said: ' + userText);
        }, 1000);
    });
}
