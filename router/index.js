document.addEventListener("DOMContentLoaded", function () {
    // Scroll 변수 설정(스크롤 값 구하기)
    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
      }, false);

    // 검색 시 스크롤 자동이동 함수
    let input = document.querySelector(".main_searchBar");

    function onKeyUp(event) {
        if (event.key === 'Enter') {
            goToScroll();
            console.log('전송');
        }
    }
    function goToScroll() {
        let location = document.querySelector(".codeExam_code-wrap").offsetTop;
        window.scrollTo({top: location - 50, behavior: 'smooth'});
    }
    input.addEventListener("keyup", onKeyUp);
    document.querySelector(".main_search_button").addEventListener("click", goToScroll);
});

