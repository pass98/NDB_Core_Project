function openChat() {
    document.getElementById('chat-body').style.display = 'block';
    document.getElementById('chat-input').style.display = 'block';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';
}

function toggleChat() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.classList.toggle("open");
    const buttonContainer = document.getElementById("button-container");
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const backButton = document.getElementById("back-button");
    if (chatContainer.classList.contains("open")) {
        buttonContainer.style.display = 'block';
        chatBody.style.display = 'none';
        chatInput.style.display = 'none';
        backButton.style.display = 'none';
    }
}

function back() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const backButton = document.getElementById("back-button");
    const buttonContainer = document.getElementById("button-container");
    chatBody.style.display = 'none';
    chatInput.style.display = 'none';
    backButton.style.display = 'none';
    buttonContainer.style.display = 'block';
}

function sendMessage() {
    //사용자가 입력한 메시지 가져오기
    const userMessage = document.getElementById("user-input").value;
    if (userMessage.trim() === "") return;

    //대화창 박스
    const chatBody = document.querySelector(".chat-body");

   //사용자 메시지 표시하는 div 요소
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "user-message");
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    contentDiv.innerText = userMessage;
    userMessageDiv.appendChild(contentDiv);
    chatBody.appendChild(userMessageDiv);


    // 챗봇의 응답을 여기에 추가
    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("message", "bot-message");
    const botContentDiv = document.createElement("div");
    botContentDiv.classList.add("content");
    botContentDiv.innerText = "무엇을 도와드릴까요?";
    botMessageDiv.appendChild(botContentDiv);
    chatBody.appendChild(botMessageDiv);
    //입력한것 초기화
    document.getElementById("user-input").value = "";
    //채팅 스크롤을 가장 아래로 이동
    chatBody.scrollTop = chatBody.scrollHeight;
}


// 엔터키로 전송
function handleKeyDown(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
}