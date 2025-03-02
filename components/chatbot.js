export function sendMessage() {
    const inputField = document.getElementById("user-input");
    const messageText = inputField.value.trim();
    if (messageText === "") return;

    addMessage(messageText, "user-message");
    inputField.value = "";

    setTimeout(() => botReply(messageText), 600);
}

function addMessage(text, className) {
    const chatBox = document.getElementById("chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + className;
    chatBox.appendChild(messageDiv);

    typeEffect(messageDiv, text);

    setTimeout(() => {
        messageDiv.style.opacity = "1";
        messageDiv.style.transform = "translateY(0)";
    }, 100);

    scrollUp();
}

function typeEffect(element, text) {
    let i = 0;
    element.textContent = "";
    function typing() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(typing, 40);
        }
    }
    typing();
}

function botReply(userText) {
    const botResponses = {
        "hello": "Hi there, human!",
        "how are you": "I am just a bot, but I'm feeling futuristic!",
        "whats your name": "J-Clone1.0!",
        "bye": "Goodbye! Chat again soon.",
        "hi": "Hello human! how can I be of assistance today?",
        "Thanks": "You're welcome!",
        "are you AI?": "Yes, I am an AI chatbot!",
        "who created you?": "I was created by a team of developers at J-Clone Inc.",
        "what can you do?": "I can help you with information, answer questions, and more!",
        "what is your purpose?": "My purpose is to assist you with any questions you have.",
        "what is your rate?": "I am free to use! But if you would like a consultation I can provide you with more information.",
        "give me more information": "Use the social links to contact us for more information.",
        "how can I contact you?": "You can use the social links to contact us.",
        "default": "Interesting... can you rephrase the question!"        
    };

    let reply = botResponses[userText.toLowerCase()] || botResponses["default"];
    setTimeout(() => addMessage(reply, "bot-message"), 800);
}

function scrollUp() {
    const chatBox = document.getElementById("chat-messages");
    if (chatBox.children.length > 8) {
        chatBox.children[0].remove();
    }
}