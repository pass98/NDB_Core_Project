function openChat() {
    document.getElementById('chat-body').style.display = 'block';
    document.getElementById('chat-input').style.display = 'flex';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';
}


// 별점
function openReview() {
    document.getElementById('myform').style.display = 'block';
    document.getElementById('chat-body').style.display = 'none';
    document.getElementById('chat-input').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';
}
// 뒤로가기 기능
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
function createMessage(content, className) {
const chatBody = document.querySelector(".chat-body");
const messageDiv = document.createElement("div");
messageDiv.classList.add("message", className);
const contentDiv = document.createElement("div");
contentDiv.classList.add("content");
contentDiv.innerHTML = content;
messageDiv.appendChild(contentDiv);
chatBody.appendChild(messageDiv);
chatBody.scrollTop = chatBody.scrollHeight;
return messageDiv;
}
// 코드스페닛
function wrapCodeInBlock(text) {
const codePattern = /(```[\s\S]*?```)/g;
let match;
while (match = codePattern.exec(text)) {
    let snippet = match[1];
    text = text.replace(snippet, `<code>${snippet.slice(3, -3)}</code>`);
}
return text;
}
// GPT응답을 사용자에게 바로 보여주는 기능
function displayResponseInRealTime(message) {
const chatBody = document.querySelector(".chat-body");

const botMessageDiv = document.createElement("div");
botMessageDiv.classList.add("message", "bot-message");
const botContentDiv = document.createElement("div");
botContentDiv.classList.add("content");

chatBody.appendChild(botMessageDiv);
botMessageDiv.appendChild(botContentDiv);

message = wrapCodeInBlock(message);  // wrapCodeInBlock 함수 호출

let currentText = "";
let index = 0;

function typeMessage() {
    if (index < message.length) {
        currentText += message[index];
        botContentDiv.innerHTML = currentText; // innerHTML로 수정
        index++;
        setTimeout(typeMessage, 50);  // 문자 하나 추가하는 속도 설정. 필요시 조절 가능.
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}
typeMessage();
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
    const loadingMsgBox = createMessage("타이핑중...", "bot-message");
    const api_key = "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";//본인 api키값 쓸것
    const messages = [
        { role: 'system', content: 'You are a NDB code reviewer. Please respond in Korean.' },
        { role: 'user', content: userInput },
    ];

    const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        max_tokens: 1024,
        messages: messages,
        top_p: 1, // 토큰 샘플링 확률을 설정
        frequency_penalty: 0.5 // 일반적으로 나오지 않는 단어를 억제하는 정도
       

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
        loadingMsgBox.remove();

    const botResponse = response.choices[0].message.content;
    
    displayResponseInRealTime(botResponse);
    document.getElementById("user-input").value = "";
})

.fail(function (jqXHR, textStatus, errorThrown) { // 에러 처리 부분
loadingMsgBox.querySelector(".content").innerHTML = "응답을 가져오는데 실패했습니다.";

});
}
// 엔터키로 전송
function handleKeyDown(event) {
if (event.keyCode === 13) {
    sendMessage();
}
}