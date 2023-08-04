document.addEventListener("DOMContentLoaded", function () {
    // 연관검색어 기능 테스트
    var modalBtns = document.querySelectorAll(".main_modalBtn");
    var closeBtn = document.querySelector("#main_closeBtn");
    var modalWrap = document.querySelector("#main_modalWrap");

    modalBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            modalWrap.style.display = "block";
        })
    });

    closeBtn.addEventListener("click", function () {
        modalWrap.style.display = "none";
    })

    var name = document.querySelector("#name");

    name.addEventListener("keyup", function () {
        var recommendBox = document.querySelector("#suggestion_box");

        recommendBox.classList.remove('invisible');

        recommendBox.innerHTML = "";

        var suggestedItems = document.createElement('div');
        suggestedItems.id = "suggested_items";

        recommendBox.appendChild(suggestedItems);

        var items = ['강백호', '박해민', '이정후', '원태인', '구자욱', '오승환'];

        for (var i in items) {
            var player_content = document.createTextNode(items[i]);
            var suggestedItem = document.createElement('div');
            suggestedItem.className = "item";

            suggestedItem.addEventListener('click', function (e) {
                document.querySelector("#name").value = this.textContent.split(' ')[0];
            });

            suggestedItem.appendChild(player_content);
            suggestedItems.appendChild(suggestedItem);
        }
    })

    var submitButton = document.querySelector(".submit_button");

    submitButton.addEventListener("click", function () {
        window.location.href = "./codingExam.html";
    })
    // 연관 검색어 기능 테스트 끝

    // 엔터키 검색 기능

    // 연관 검색어 기능2
    /*
      초성검색 부분
    */
    const CHO_HANGUL = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
        'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
        'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
        'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];

    const HANGUL_START_CHARCODE = "가".charCodeAt();

    const CHO_PERIOD = Math.floor("까".charCodeAt() - "가".charCodeAt());
    const JUNG_PERIOD = Math.floor("개".charCodeAt() - "가".charCodeAt());

    function combine(cho, jung, jong) {
        return String.fromCharCode(
            HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong
        );
    }

    // 초성검색
    function makeRegexByCho(search = "") {
        const regex = CHO_HANGUL.reduce(
            (acc, cho, index) =>
                acc.replace(
                    new RegExp(cho, "g"),
                    `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`
                ),
            search
        );

        return new RegExp(`(${regex})`, "g");
    }

    function includeByCho(search, targetWord) {
        return makeRegexByCho(search).test(targetWord);
    }

    /*
      자동완성 부분
    */
    const dataList = ["빨간색", "파란색", "노란색", "검정색"];

    const $search = document.querySelector("#search");
    const $autoComplete = document.querySelector(".autocomplete");

    let nowIndex = 0;

    $search.onkeyup = (event) => {
        // 검색어
        const value = $search.value.trim();

        // 자동완성 필터링
        const matchDataList = value
            ? dataList.filter((label) => includeByCho(value, label))
            : [];

        switch (event.keyCode) {
            // UP KEY
            case 38:
                nowIndex = Math.max(nowIndex - 1, 0);
                break;

            // DOWN KEY
            case 40:
                nowIndex = Math.min(nowIndex + 1, matchDataList.length - 1);
                break;

            // ENTER KEY
            case 13:
                document.querySelector("#search").value = matchDataList[nowIndex] || "";

                // 초기화
                nowIndex = 0;
                matchDataList.length = 0;
                break;

            // 그외 다시 초기화
            default:
                nowIndex = 0;
                break;
        }

        // 리스트 보여주기
        showList(matchDataList, value, nowIndex);
    };

    const showList = (data, value, nowIndex) => {
        // 초성 정규식으로 변환
        const regex = makeRegexByCho(value);

        $autoComplete.innerHTML = data
            .map(
                (label, index) => `
          <div class='${nowIndex === index ? "active" : ""}'>
            ${label.replace(regex, "<mark>$1</mark>")}
          </div>
        `
            )
            .join("");
    };
});