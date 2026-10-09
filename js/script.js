function openPopup(title, text) {
    const titleEl = document.getElementById('popup-title');
    const descEl = document.getElementById('popup-desc');
    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = text;
    
    const popup = document.getElementById('popup');
    if (popup) popup.classList.add('active');
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) popup.classList.remove('active');
}

const closeBtn = document.querySelector('.close-popup');
if (closeBtn) closeBtn.addEventListener('click', closePopup);

const popupEl = document.getElementById('popup');
if (popupEl) {
    popupEl.addEventListener('click', function(e) {
        if (e.target === this) closePopup();
    });
}

function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    chatBox.classList.toggle('open');
    
    const chatInput = document.getElementById('chat-input');
    if (chatBox.classList.contains('open') && chatInput) {
        setTimeout(() => chatInput.focus(), 100);
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getBotResponse(input) {
    const vk = 'https://vk.com/durty_ru';
    
    if (input.includes('привет')) return 'Привет! Чем могу помочь?';
    if (input.includes('цена')) return 'Цены: Визитка — 7000 ₽, Лендинг — 12000 ₽, Чат‑бот — 5000 ₽.';
    if (input.includes('заказать')) return 'Отлично! Напиши мне в VK: ' + vk
    if (input.includes('обо мне')) return 'Я делаю сайты и чат‑ботов. Под вас.';
    if (input.includes('контакты')) return 'Вот способы со мной связаться: ' + vk
    
    return 'Я не понял. Спроси про "цены", "заказать" или "обо мне", "контакты".';
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages) return;
    
    const text = chatInput.value.trim();
    if (!text) return;

    chatMessages.innerHTML += '<div class="msg user-msg">' + escapeHtml(text) + '</div>';
    chatInput.value = '';
    scrollToBottom();

    setTimeout(() => {
        const response = getBotResponse(text.toLowerCase());
        chatMessages.innerHTML += '<div class="msg bot-msg">' + response + '</div>';
        scrollToBottom();
    }, 600);
}