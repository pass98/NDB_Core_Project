// 코딩 문법 하이라이팅
// 모든 언어를 가져오면 번들 크기가 커지기 때문에 몇 가지 언어만 가져오기
// const hljs = require('highlight.js/lib/core');
// hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
// 모든 언어 가져오기
// const hljs = require('highlight.js');

// textarea내용 iframe에 바로 업로드
function updateIframeContent() {
    const textAreaValue = document.getElementById('editing_code_html').value;
    const iframe = document.getElementById('main_Nav_iframe');
    
    // iframe 내의 document에 접근
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // iframe 내용 업데이트 (예: body의 내용을 textarea의 값으로 설정)
    iframeDocument.body.innerHTML = textAreaValue;
}

// 코드 하이라이팅 효과 시작
function update_code() {
    const result_elem = document.querySelector("#highlighting-code code");
    let text = document.querySelector("#editing-code").value;
    if (text[text.length - 1] == "\n") {
        text += "  ";
    } else if (text == "") {
        text += "\n  ";
    } else if (text.indexOf("\n", 1) < 0) {
        text += "\n  ";
    }

    result_elem.innerHTML = text;
    hljs.highlightBlock(result_elem)
}

function sync_scroll(element) {
    let result_element = document.querySelector("#highlighting-code");
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
    let code = element.value;
    if (event.key == "Tab") {
        event.preventDefault();
        let before_tab = code.slice(0, element.selectionStart);
        let after_tab = code.slice(element.selectionEnd, element.value.length); //
        let cursor_pos = element.selectionEnd + 2;
        element.value = before_tab + "  " + after_tab;
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update_code(element.value);
    }
}

function resize() {
    const editor = document.querySelector('#editing-code');
    const precode = document.querySelector('#highlighting-code');
    precode.style.width = "calc(" + window.getComputedStyle(editor).width + " + 35px)";
    editor.style.height = "20px";
    if (editor.scrollHeight > 30) {
        editor.style.height = (editor.scrollHeight + 5) + "px";
    } else {
        editor.style.height = "60px";
    }
}
// 문법 하이라이팅 함수
function updateHighlighting(code) {
    // const codeInput = document.getElementById('codeExam_codeContent_html').value;
    const highlightedCode = document.getElementById('highlightedCode');
    highlightedCode.textContent = code; // 입력된 코드를 <code> 태그에 설정
    hljs.highlightBlock(highlightedCode); // 해당 코드 블록에 하이라이팅 적용
}
// 코드 하이라이팅 효과 끝
// 코드 예제 창 div 값 변경
function codeExam_divLanguage(){
    var lang = document.getElementById('main_language');
    var selectLang = lang.options[lang.selectedIndex].value;
    console.log(selectLang)
}

// 검색시 페이지 새로고침 현상 막기
function handleSubmit(event) {
    event.preventDefault()
    value = '';
}

// 검색 시 코드창에 내용 삽입 기능 시작
function insertHTMLToDiv() {
    const codeExam_resultDiv = document.querySelector('.codeExam_resultDiv');
    const codeExam_htmlBox = document.querySelector('.codeExam_codeContent_html code');
    const htmlString = `"
        <header>
            <div class="logo">로고</div>
            <nav>
                <ul>
                    <li>메뉴1</li>
                    <li>메뉴2</li>
                    <li>메뉴3</li>
                </ul>
            </nav>
        </header>

        <div class="container">
            <aside>
                <ul>
                    <li>사이드바1</li>
                    <li>사이드바2</li>
                    <li>사이드바3</li>
                </ul>
            </aside>

            <main>
                <h1>본문</h1>
                <p>본문 내용을 입력하세요.</p>
            </main>
        </div>
        "`;
    updateHighlighting(htmlString);
    // codeExam_resultDiv.innerHTML = htmlString;
    // codeExam_htmlBox.innerText = htmlString;
    // console.log('updateHighlighting', updateHighlighting(htmlString))
    // 가져온 HTML 문자열에 포함된 JavaScript 코드를 실행시키고 싶다면, 이 부분에 추가로 코드 작성
    // targetDiv.querySelector('button').addEventListener('click', myFunction);
}
// codeExam_StartAndSave>button 클릭시 textarea내용 iframe에 출력
function printHtml(){
    const htmlContent = document.getElementById("editing_code_html");
    const cssContent = document.getElementById("editing_code_Css");
    const jsContent = document.getElementById("editing_code_Js");

    
}

// day&night theme 토글 함수
function is_checked() {
    // 메인 검색창을 찾습니다.
    const main_search = document.querySelector(".main_search")
    // 메인페이지를 찾습니다.
    const main_wrap = document.querySelector(".main_wrap");
    // 1. checkbox element를 찾습니다.
    const checkbox = document.getElementById('main_Nav_themecheck');
  
    // 2. checked 속성을 체크합니다.
    const is_checked = checkbox.checked;
  
    // 3. 결과를 출력합니다.
    console.log('체크확인',is_checked)
    console.log('main_wrap 스타일 속성 확인', main_wrap.style)

    // 테마변경
    if(is_checked){
        // 낮
        window.document.body.classList.add('day');
        main_search.classList.add('main_search_day');
        main_search.classList.remove('main_search_night');
        main_wrap.classList.remove('main_wrap_backImg_night')
        main_wrap.classList.add('main_wrap_backImg_day')
        document.querySelector(".main_NavLangDB_Text").style.color = "#212121"
        
    }else{
        // 밤
        window.document.body.classList.remove('day');
        main_search.classList.remove('main_search_day');
        main_search.classList.add('main_search_night');
        main_wrap.classList.remove('main_wrap_backImg_day')
        main_wrap.classList.add('main_wrap_backImg_night')
        document.querySelector(".main_NavLangDB_Text").style.color = "white"
    }
  }
// 테마 기능 끝

// 검색_언어별 codeExam_boxes 개수 변경
// function codeExamBoxCount() {
//     const 
// }

// 문서 로딩 완료한 뒤 실행
document.addEventListener("DOMContentLoaded", function () {
    // 한글 타이핑 효과
    TypeHangul.type('.main_text p', {
        intervalType: 50,
        humanize: 0.5
    });

    // Scroll 변수 설정(스크롤 값 구하기)
    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    }, false);

    // 검색 시 스크롤 자동이동 함수
    const main_searchBar = document.querySelector(".main_searchBar");
    const main_searchBar2 = document.querySelector(".main_searchBar2");

    function goToScroll() {
        let location = document.querySelector(".codeExam_code_wrap").offsetTop;
        window.scrollTo({ top: location - 50, behavior: 'smooth' });

        // 검색어 추출 후 문제창에 띄우기
    }
    function getSearchWord() {
        console.log('getSearchWord')
        let selectLang = document.querySelector("#main_searchLanguage2 > option:checked").value;
        // let selectOption  = selectLang.selectedOptions[0].value;
        console.log(selectLang)
    }   
    
    // 은우 keyUp
    // function onKeyUp(event) {
    //     if (event.key === 'Enter') {
    //         goToScroll();
    //         getSearchWord();
    //         console.log(document.querySelector(".main_searchBar2").value);
    //     }
    // }


    document.querySelector(".main_search_button").addEventListener('click', function (e) {
        e.preventDefault();
    })
    document.querySelector(".main_search_button").addEventListener("Click", goToScroll);
    // 스크롤 자동

    // 정답가리기 기능
    // div선택변수
    const box = document.querySelector('.codeExam_boxesHide');
    // div의 가로 값
    const width = document.querySelector(".codeExam_boxesHide").clientWidth;

    let isDragging = false;
    let startX, originalLeft;

    box.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;  // 드래그 시작점의 x 좌표 기록
        originalLeft = parseInt(getComputedStyle(box).left); // 요소의 초기 위치 기록 (정수 값으로 변환)
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let currentX = e.clientX;
            let difference = currentX - startX;  // 시작점과 현재점의 차이 계산

            // 요소를 드래그할 때만 위치를 변경하도록 조건 추가
            if (Math.abs(difference) > 10) {
                // 드래그한 거리를 기존 위치에 더하여 요소 이동
                box.style.left = originalLeft + difference + 'px';
            }

            // 드래그를 일정 거리 이상 했을 때 요소를 화면 밖으로 슬라이드시킴
            // if (Math.abs(difference) > (width/2)) {
            //     let slideDirection = difference > 0 ? '100%' : '-100%';  // 오른쪽 또는 왼쪽으로 슬라이드 판단
            //     box.style.left = slideDirection;
            //     isDragging = false;  // 드래그 종료
            // }
        }
    });

    // 드래그시 이미지가 출력되는 브라우저 기본 기능 비활성화
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    // 정답 가리기 기능 끝
    // DB , API 검색버튼 클릭 후 색 유지
    let main_Navwon = document.querySelector(".main_Navwon");
    let main_Navwon_clicked = 0;
    main_Navwon.addEventListener('click',()=>{
        if(main_Navwon_clicked){
            main_Navwon.className = "main_Navwon";
            main_Navwon_clicked = 0;
          }else{
            main_Navwon.className = "main_Navwon_active-color";
            main_Navwon_clicked = 1;
          }
        })
    

    // 함수 호출
    // 왼쪽 상단 검색바 함수 적용
    main_searchBar.addEventListener("keyup", insertHTMLToDiv);
    main_searchBar.addEventListener("keyup", handleSubmit);
    main_searchBar.addEventListener("keyup", onKeyUp);

    // 메인 가운데 검색바 함수 적용
    main_searchBar2.addEventListener("keyup", insertHTMLToDiv);
    main_searchBar2.addEventListener("keyup", onKeyUp);
    main_searchBar2.addEventListener("keyup", handleSubmit);


    // 문법 하이라이팅 함수 실행
    update_code();
    resize();
});

let responseDB;
function ex_1() { // DB 테이블에서 문제 제공하는 함수
    let keywords = document.getElementsByClassName('main_searchBar')[0]
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName('main_searchBar2')[0]
    let user_input2 = keywords2.value
    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    let languageElement2 = document.querySelector(".main_searchLanguage2");
    let language2 = languageElement2.options[languageElement2.selectedIndex].value;
    console.log("상단 검색바 사용자선택 언어 : ", language)
    console.log("메인 검색바 사용자선택 언어 : ", language2)
    

    let select_Language = ""; // 사용자 선택언어
    let input_String = "";    // 사용자 입력값
    // 상단바 사용자 입력창
    if (user_input.trim() !== "") {
        select_Language = language;
        input_String = user_input
    }

    // 메인 페이지 사용자 입력창
    if (user_input2.trim() !== "") {
        select_Language = language2;
        input_String = user_input2;
    }

    console.log("사용자 입력 : ",input_String);

    let find_keywords = [];
    let user_keywords = ["레이아웃", "flex", "addeventListener",
        "if", "for", "while", "switch case", "별찍기",
        "소수", "짝수", "구구단", "1차원", "2차원", "배열", "포인터"];
        // 사용자가 선택할 것 같은 키워드 배열
   


    for (let i = 0; i < user_keywords.length; i++) {
        if (input_String.includes(user_keywords[i])) {
            console.log(`찾은 keyword: ${user_keywords[i]}`); //for, 별찍기
            find_keywords.push(user_keywords[i]); //찾은 keyword push
        } 
    }// 사용자 입력 값(input_String)에서 user_keywords배열 안에 있는 값이 있는지
    console.log("찾아서 추가해준 keywords: ", find_keywords)

    
    if (find_keywords.length == 1) {// 찾은 키워드가 1개일때
        $.ajax({
            url: "/index/ex_1", 
            method: 'POST',
            data: { // 서버에 보낼 데이터
                find_keywords: find_keywords[0],
                select_language: select_Language
            }
        }).done(function (serverResponse) {
            console.log("데이터 서버에 보내기 성공~");
            console.log(serverResponse); // 서버측에서 데이터 받기 
            responseDB = serverResponse; // 전역 변수에 서버측 데이터 할당
            response_DB() //responseDB 변수 값 확인
        }).fail(function (error) {
            console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
        });
    }
    if (find_keywords.length == 2) {// 찾은 키워드가 2개일때
        $.ajax({
            url: "/index/ex_2", //
            method: 'POST',
            data: { // 서버에 보낼 데이터
                find_keywords: find_keywords[0],
                find_keywords2: find_keywords[1],
                select_language: select_Language
            }
        }).done(function (serverResponse) {
            console.log("데이터 서버에 보내기 성공~");
            console.log(serverResponse); // 서버측에서 데이터 받기
            responseDB = serverResponse; // 전역 변수에 서버측 데이터 할당
            response_DB()
        }).fail(function (error) {
            console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
        });
    }

}

function response_DB(){ // 전역 변수 값 확인해보기~
    console.log(responseDB.EXAM_HTM:) 
}

function select() {
    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    let languageElement2 = document.querySelector(".main_searchLanguage2");
    let language2 = languageElement2.options[languageElement2.selectedIndex].value;
    console.log("상단 검색바 사용자선택 언어 : ", language)
    console.log("메인 검색바 사용자선택 언어 : ", language2)

    if (language == " ") {
        if (language2 == "html") {
            front();
        }
        else if (language2 == "css") {
            front();
        }
        else if (language2 == "javascript") {
            front();
        }
        else if (language2 == "java") {
            java();
        }
        else if (language2 == "python") {
            python();
        }
        else if (language2 == "c_language") {
            C_programing();
        }
    }
    if (language2 == " ") {
        if (language == "html") {
            front();
        }
        else if (language == "css") {
            front();
        }
        else if (language == "javascript") {
            front();
        }
        else if (language == "java") {
            java();
        }
        else if (language == "python") {
            python();
        }
        else if (language == "c_language") {
            C_programing();
        }

    }


}

function front() {   // select option이 html,css,js일때 api html,css,js코드 응답함수
    const api_key = "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"
    let keywords = document.getElementsByClassName('main_searchBar')[0]
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName('main_searchBar2')[0]
    let user_input2 = keywords2.value

    console.log("상단 바 사용자 입력 :", user_input)
    console.log("메인 검색바 사용자 입력 :", user_input2)

    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    let languageElement2 = document.querySelector(".main_searchLanguage2");
    let language2 = languageElement2.options[languageElement2.selectedIndex].value;
    console.log("상단 바 사용자 선택언어:", language)
    console.log("메임검색바 사용자 선택언어:", language2)


    $('#loading').show();

    let select_Language = "";
    let input_String = "";
    // 상단바 사용자 입력창
    if (user_input.trim() !== "") {
        select_Language = language;
        input_String = user_input
    }

    // 메인 페이지 사용자 입력창
    if (user_input2.trim() !== "") {
        select_Language = language2;
        input_String = user_input2;
    }


    const messages = [ //명령 프롬프트
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'GPT, HTML, CSS, JS 언어로 ' + select_Language + input_String + '에 대해서 HTML ,CSS,JS 코드와 함께 제시해주세요. 제일먼제 문제를 제시해주세요. 주석은 한글로 작성해주세요' },
        { role: 'assistant', content: '"""HTML Code:""" 여기에 HTML 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 HTML코드를 작성해주세요"""End HTML Code"""' },
        { role: 'assistant', content: '"""CSS Code:""" 여기에 CSS 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 CSS코드를 작성해주세요"""End CSS Code"""' },
        { role: 'assistant', content: '"""JS Code:""" 여기에 JS 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 JS코드를 작성해주세요"""End JS Code"""' },
        { role: 'assistant', content: '"""text:""" 여기에 제시한 코드들에 대한 설명을 작성해주세요. """End text Code"""' }]

    const data = { //데이터 구조
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        }, // HTTP 통신
        data: JSON.stringify(data),  // 사용자 입력을 json형태로 변환해서 api에게 요청
    }).then(function (response) { //콜백함수, api 응답
        $('#loading').hide();
        console.log(response)
        const responseText = response.choices[0].message.content;
        const splitResponse = responseText.split(/(```|"""HTML Code:|"""CSS Code:|"""JS Code:|"""text:)/);

        console.log(splitResponse)
        let htmlCode = ''; //html코드가 들어갈 변수
        let cssCode = '';  //css코드가 들어갈 변수
        let jsCode = '';   //js코드가 들어갈 변수
        let apitext = '';  //api 설명이 들어갈 변수
        let currentCode = '';  //현재 작업중인 코드가 들어갈 변수


        for (let i = 0; i < splitResponse.length; i++) { // 응답 데이터 가공
            if (splitResponse[i].trim().startsWith('html')) {
                currentCode = 'HTML';       // 현재 작업중인 코드유형 저장장
                htmlCode = splitResponse[i].replace('html', '').trim();
            } else if (splitResponse[i].trim().startsWith('css')) {
                currentCode = 'CSS';
                cssCode = splitResponse[i].replace('css', '').trim();
            } else if (splitResponse[i].trim().startsWith('javascript')) {
                currentCode = 'JS';
                jsCode = splitResponse[i].replace('javascript', '').trim();
            } else if (splitResponse[i].trim().startsWith('')) {
                currentCode = 'text';
                apitext = splitResponse[i].replace('text', '').trim();
            }
            else {
                switch (currentCode) {
                    case 'HTML':
                        htmlCode += splitResponse[i].trim();
                        break;
                    case 'CSS':
                        cssCode += splitResponse[i].trim();
                        break;
                    case 'JS':
                        jsCode += splitResponse[i].trim();
                        break;
                    case 'text':
                        apitext += splitResponse[i].trim();
                }
            }
        }
        let f_text = splitResponse[0]
        console.log(splitResponse)
        console.log(f_text)
        console.log(htmlCode)

        let result = document.getElementsByClassName('main_searchWrap')
        let pre = document.createElement('pre')

        pre.innerText = f_text + "\n\n" + htmlCode + "\n\n" + cssCode + "\n\n" + jsCode + "\n\n" + apitext;

        console.log(pre)

        $.ajax({
            url: "/index/frontinput", // Update this to the URL of your server endpoint
            method: 'POST',
            data: {
                f_text: f_text,
                apitext: apitext,
                htmlCode: htmlCode,
                cssCode: cssCode,
                jsCode: jsCode,
                user_input: input_String,
                select_language: select_Language
            }
        }).done(function (serverResponse) {
            console.log("데이터 서버에 보내기 성공~");
        }).fail(function (error) {
            console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
        });

        // result.appendChild(pre)

        document.getElementsByClassName('main_searchbar').value = ''//검색창 비우기
    });
}

function java() {   // select option이 java일때 api java 응답함수
    const api_key = "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"// api key 값
    let keywords = document.getElementsByClassName('main_searchBar')[0]
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName('main_searchBar2')[0]
    let user_input2 = keywords2.value

    console.log("상단 바 사용자 입력 :", user_input)
    console.log("메인 검색바 사용자 입력 :", user_input2)

    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    let languageElement2 = document.querySelector(".main_searchLanguage2");
    let language2 = languageElement2.options[languageElement2.selectedIndex].value;
    console.log("상단 바 사용자 선택언어 : ", language)
    console.log("메인 검색바 사용자 선택언어 : ", language2)


    $('#loading').show();

    let select_Language = "";
    let input_String = "";
    // 상단바 사용자 입력창
    if (user_input.trim() !== "") {
        select_Language = language;
        input_String = user_input
    }

    // 메인 페이지 사용자 입력창
    if (user_input2.trim() !== "") {
        select_Language = language2;
        input_String = user_input2;
    }



    const messages = [ // 명령 프롬프트
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'GPT,' + select_Language + ' 언어로 ' + input_String + '에 대하여' + select_Language + ' 코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요' },
        { role: 'assistant', content: '"""java Code:""" 여기에 java코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 java코드를 작성해주세요"""End java Code"""' }]


    const data = { // 데이터 구조
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },  // HTTP통신
        data: JSON.stringify(data), // 사용자 입력을 json형태로 변환해서 api에게 요청
    }).then(function (response) { //콜백함수, api 응답
        $('#loading').hide();
        console.log(response)
        const responseText = response.choices[0].message.content;
        const splitResponse = responseText.split(/(```|"""java Code:)/);

        console.log(splitResponse)
        let javaCode = ''; //java코드가 들어갈 변수
        let apitext = '';  //api 설명이 들어갈 변수
        let currentCode = ''; //현재 작업중인 코드가 들어갈 변수

        for (let i = 0; i < splitResponse.length; i++) { // 응답 데이터 가공
            if (splitResponse[i].trim().startsWith('java')) {
                currentCode = 'JAVA';       // 현재 작업중인 코드유형 저장장
                javaCode = splitResponse[i].replace('java', '').trim();
            } else if (splitResponse[i].trim().startsWith('')) {
                currentCode = 'text';
                apitext = splitResponse[i].replace('text', '').trim();
            }
            else {
                switch (currentCode) {
                    case 'JAVA':
                        javaCode += splitResponse[i].trim();
                        break;
                    case 'text':
                        apitext += splitResponse[i].trim();
                }
            }
        }
        let f_text = splitResponse[0]
        console.log(splitResponse)
        console.log(f_text)
        console.log(javaCode)
        console.log(apitext)

        let result = document.getElementsByClassName('main_searchWrap')
        let pre = document.createElement('pre')

        pre.innerText = f_text + "\n\n" + javaCode + "\n\n" + apitext;

        console.log(pre)
        //result.appendChild(pre)
        $.ajax({
            url: "/index/java_input", // Update this to the URL of your server endpoint
            method: 'POST',
            data: { // 서버에 데이터 전송
                f_text: f_text,
                apitext: apitext,
                javaCode: javaCode,
                user_input: input_String,
                select_language: select_Language
            }
        }).done(function (serverResponse) {
            console.log("데이터 서버에 보내기 성공~");
        }).fail(function (error) {
            console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
        });

        document.getElementsByClassName('main_searchbar').value = '' //검색창 비우기
    });
}

function python() { // select option이 python일때 api python 응답함수
    const api_key = "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"  // api key 값
    let keywords = document.getElementsByClassName('main_searchBar')[0]
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName('main_searchBar2')[0]
    let user_input2 = keywords2.value

    console.log("상단 바 사용자 입력 :", user_input)
    console.log("메인 검색바 사용자 입력 :", user_input2)

    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    let languageElement2 = document.querySelector(".main_searchLanguage2");
    let language2 = languageElement2.options[languageElement2.selectedIndex].value;
    console.log("상단 바 사용자 선택언어 : ", language)
    console.log("메인 검색바 사용자 선택언어 : ", language2)


    $('#loading').show();

    let select_Language = "";
    let input_String = "";
    // 상단바 사용자 입력창
    if (user_input.trim() !== "") {
        select_Language = language;
        input_String = user_input
    }

    // 메인 페이지 사용자 입력창
    if (user_input2.trim() !== "") {
        select_Language = language2;
        input_String = user_input2;
    }

    const messages = [      // 명령 프롬프트
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'GPT,' + select_Language + ' 언어로 ' + input_String + '에 대하여' + select_Language + '코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요' },
        { role: 'assistant', content: '"""python Code:""" 여기에 python코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 python코드를 작성해주세요"""End python Code"""' }]


    const data = { // 데이터 구조
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },  // HTTP 통신
        data: JSON.stringify(data),
    }).then(function (response) {   //콜백함수, api 응답
        $('#loading').hide();
        console.log(response)
        const responseText = response.choices[0].message.content;
        const splitResponse = responseText.split(/(```|"""python Code:)/); // 첫번째 응답 데이터 가공, split()

        console.log(splitResponse)
        let pythonCode = ''; // python코드가 들어갈 변수
        let apitext = '';   // api 설명이 들어갈 변수
        let currentCode = ''; // 현재 작업중인 코드가 들어갈 변수

        for (let i = 0; i < splitResponse.length; i++) {
            if (splitResponse[i].trim().startsWith('python')) {
                currentCode = 'PYTHON';       // 현재 작업중인 코드유형 저장장
                pythonCode = splitResponse[i].replace('python', '').trim();
            } else if (splitResponse[i].trim().startsWith('')) {
                currentCode = 'text';
                apitext = splitResponse[i].replace('text', '').trim();
            }
            else {
                switch (currentCode) {
                    case 'PYTHON':
                        pythonCode += splitResponse[i].trim();
                        break;
                    case 'text':
                        apitext += splitResponse[i].trim();
                }
            }
        }   // 응답 데이터 가공 단계


        let f_text = splitResponse[0]
        console.log(splitResponse)
        console.log(pythonCode)
        console.log(apitext)
        console.log(f_text)
        let result = document.getElementsByClassName('main_searchWrap')
        let pre = document.createElement('pre')

        pre.innerText = f_text + "\n\n" + pythonCode + "\n\n" + apitext;

        console.log(pre)
        //result.appendChild(pre)
        $.ajax({
            url: "/index/python_input", // Update this to the URL of your server endpoint
            method: 'POST',
            data: { // 서버에 데이터 전송
                f_text: f_text,
                apitext: apitext,
                pythonCode: pythonCode,
                user_input: input_String,
                select_language: select_Language
            }
        }).done(function (serverResponse) {
            console.log("데이터 서버에 보내기 성공~");
        }).fail(function (error) {
            console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
        });

        document.getElementsByClassName('main_searchbar').value = ''
    });
}

function C_programing() { // select option이 python일때 api python 응답함수
    const api_key = "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"  // api key 값
    let keywords = document.getElementsByClassName('main_searchBar')[0]
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName('main_searchBar2')[0]
    let user_input2 = keywords2.value

    console.log("상단 바 사용자 입력 :", user_input)
    console.log("메인 검색바 사용자 입력 :", user_input2)

    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    let languageElement2 = document.querySelector(".main_searchLanguage2");
    let language2 = languageElement2.options[languageElement2.selectedIndex].value;
    console.log("상단 바 사용자 선택언어 : ", language)
    console.log("메인 검색바 사용자 선택언어 : ", language2)


    $('#loading').show();

    let select_Language = "";
    let input_String = "";
    // 상단바 사용자 입력창
    if (user_input.trim() !== "") {
        select_Language = language;
        input_String = user_input
    }

    // 메인 페이지 사용자 입력창
    if (user_input2.trim() !== "") {
        select_Language = language2;
        input_String = user_input2;
    }

    const messages = [      // 명령 프롬프트
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'GPT,' + select_Language + '로' + input_String + '에 대하여 예시문제나 실습문제를' + select_Language + '코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요' },
        { role: 'assistant', content: '"""c Code:""" 여기에 C언어코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 C언어코드를 작성해주세요"""End c Code"""' }]


    const data = { // 데이터 구조
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },  // HTTP 통신
        data: JSON.stringify(data),
    }).then(function (response) {   //콜백함수, api 응답
        $('#loading').hide();
        console.log(response)
        const responseText = response.choices[0].message.content;
        const splitResponse = responseText.split(/(```|"""c Code:)/); // 첫번째 응답 데이터 가공, split()

        console.log(splitResponse)
        let c_Code = ''; // c언어코드가 들어갈 변수
        let apitext = '';   // api 설명이 들어갈 변수
        let currentCode = ''; // 현재 작업중인 코드가 들어갈 변수

        for (let i = 0; i < splitResponse.length; i++) {
            if (splitResponse[i].trim().startsWith('c')) {
                currentCode = 'C';       // 현재 작업중인 코드유형 저장장
                c_Code = splitResponse[i].replace('c', '').trim();
            } else if (splitResponse[i].trim().startsWith('')) {
                currentCode = 'text';
                apitext = splitResponse[i].replace('text', '').trim();
            }
            else {
                switch (currentCode) {
                    case 'C':
                        c_Code += splitResponse[i].trim();
                        break;
                    case 'text':
                        apitext += splitResponse[i].trim();
                }
            }
        }   // 응답 데이터 가공 단계
        let f_text = splitResponse[0]
        console.log(splitResponse)
        console.log(c_Code)
        console.log(apitext)
        console.log(f_text)

        let result = document.getElementsByClassName('main_searchWrap')
        let pre = document.createElement('pre')

        pre.innerText = f_text + "\n\n" + c_Code + "\n\n" + apitext;

        console.log(pre)
        //result.appendChild(pre)
        $.ajax({
            url: "/index/c_input", // Update this to the URL of your server endpoint
            method: 'POST',
            data: { // 서버에 데이터 전송
                f_text: f_text,
                apitext: apitext,
                c_Code: c_Code,
                user_input: input_String,
                select_language: select_Language
            }
        }).done(function (serverResponse) {
            console.log("데이터 서버에 보내기 성공~");
        }).fail(function (error) {
            console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
        });
        document.getElementsByClassName('main_searchbar').value = ''
    });
}

// 형균 keyUp
function onKeyUp(event) {
    if (event.key === 'Enter') {
        goToScroll();

        console.log('전송');
        document.getElementsByClassName('main_searchbar').value = ''
    }
}
