function openChat() {
    document.getElementById('chat-body').style.display = 'block';
    document.getElementById('chat-input').style.display = 'block';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';
}



function openReview() {
    document.getElementById('myform').style.display = 'block';
    document.getElementById('chat-body').style.display = 'none';
    document.getElementById('chat-input').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';
}

function back() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const backButton = document.getElementById("back-button");
    const buttonContainer = document.getElementById("button-container");
    const reviewForm = document.getElementById("myform");
    chatBody.style.display = 'none';
    chatInput.style.display = 'none';
    backButton.style.display = 'none';
    buttonContainer.style.display = 'block';
    reviewForm.style.display = 'none';
}
function toggleChat() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.classList.toggle("open");
    const buttonContainer = document.getElementById("button-container");
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const backButton = document.getElementById("back-button");
    const reviewForm = document.getElementById("myform");
    if (chatContainer.classList.contains("open")) {
        buttonContainer.style.display = 'block';
        chatBody.style.display = 'none';
        chatInput.style.display = 'none';
        backButton.style.display = 'none';
        reviewForm.style.display = 'none';
    }
}
function sendMessage() {
    // 사용자가 입력한 메시지 가져오기
    const userMessage = document.getElementById("user-input").value;
    if (userMessage.trim() === "") return;

    // 대화창 박스
    const chatBody = document.querySelector(".chat-body");

    // 사용자 메시지 표시하는 div 요소
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "user-message");
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    contentDiv.innerText = userMessage;
    userMessageDiv.appendChild(contentDiv);
    chatBody.appendChild(userMessageDiv);

    // GPT에 요청해서 챗봇의 응답을 가져옴
    chatGPT(userMessage);
}

function chatGPT(userInput) {
    const api_key = "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";
    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userInput },
    ];

    const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        max_tokens: 150,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }).done(function (response) {
        const chatBody = document.querySelector(".chat-body");
        const botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("message", "bot-message");
        const botContentDiv = document.createElement("div");
        botContentDiv.classList.add("content");
        botContentDiv.innerText = response.choices[0].message.content;
        botMessageDiv.appendChild(botContentDiv);
        chatBody.appendChild(botMessageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        document.getElementById("user-input").value = "";
    });
}

// 엔터키로 전송
function handleKeyDown(event) {
if (event.keyCode === 13) {
    sendMessage();
}}