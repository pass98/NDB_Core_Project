document.addEventListener("DOMContentLoaded", function () {
    // 검색시 페이지 새로고침 현상 막기
    function handleSubmit(event) {
        event.preventDefault()
        value = '';
    }
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
    document.querySelector(".main_search_button").addEventListener('click', function(e) {
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

    // 검색 시 코드창에 내용 삽입 기능 시작
    function insertHTMLToDiv() {
        const codeExam_resultDiv = document.querySelector('.codeExam_resultDiv');
        const codeExam_htmlBox = document.querySelector('.codeExam_htmlBox');
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

        
        codeExam_resultDiv.innerHTML = htmlString;
        codeExam_htmlBox.innerHTML = + htmlString;
        // 가져온 HTML 문자열에 포함된 JavaScript 코드를 실행시키고 싶다면, 이 부분에 추가로 코드 작성
        // targetDiv.querySelector('button').addEventListener('click', myFunction);
    }

    // 함수 호출
    main_searchBar.addEventListener("keyup", insertHTMLToDiv());
});
