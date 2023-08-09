// 코딩 문법 하이라이팅
// 모든 언어를 가져오면 번들 크기가 커지기 때문에 몇 가지 언어만 가져오기
// const hljs = require('highlight.js/lib/core');
// hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
// 모든 언어 가져오기
// const hljs = require('highlight.js');

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
// 코드 하이라이팅 효과 끝

// 검색시 페이지 새로고침 현상 막기
function handleSubmit(event) {
    event.preventDefault()
    value = '';
}
// 문법 하이라이팅 함수
function updateHighlighting(code) {
    // const codeInput = document.getElementById('codeExam_codeContent_html').value;
    const highlightedCode = document.getElementById('highlightedCode');
    highlightedCode.textContent = code; // 입력된 코드를 <code> 태그에 설정
    hljs.highlightBlock(highlightedCode); // 해당 코드 블록에 하이라이팅 적용
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

    function onKeyUp(event) {
        if (event.key === 'Enter') {
            goToScroll();
            console.log('전송');
        }
    }
    function goToScroll() {
        let location = document.querySelector(".codeExam_code_wrap").offsetTop;
        window.scrollTo({ top: location - 50, behavior: 'smooth' });
    }

    main_searchBar.addEventListener("keyup", onKeyUp);
    main_searchBar.addEventListener("keyup", handleSubmit);
    // main_searchBar.addEventListener("submit", handleSubmit);
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


    // 함수 호출
    main_searchBar.addEventListener("keyup", insertHTMLToDiv());

    // 문법 하이라이팅 함수 실행
    update_code();
    resize();
});
