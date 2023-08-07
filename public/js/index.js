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
    main_searchBar.addEventListener("submit", handleSubmit);
    document.querySelector(".main_search_button").addEventListener("click", goToScroll);
    // 스크롤 자동

    // 정답가리기 기능
    const box = document.querySelector('.codeExam_boxesHide');

    box.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    let offsetX, offsetY, isDragging = false;

    box.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.pageX - box.getBoundingClientRect().left ;// 클릭한 위치와 요소의 왼쪽 간의 거리
        // offsetY = e.clientY - box.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            box.style.left = e.pageX - offsetX + 'px'; // 마우스 위치에서 거리를 빼서 요소의 왼쪽 위치를 설정
            // box.style.top = e.clientY - offsetY - 32 + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    // 정답 가리기 기능 끝
    
});
