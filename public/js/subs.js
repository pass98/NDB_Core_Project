
// 결제 요청 함수
function requestPay() {
    console.log("구독함수 실행")
    IMP.init('iamport');
    IMP.request_pay({
        pg: "inicis",
        pay_method: "card",
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '결제테스트',
        amount: 5000,
        buyer_email: 'iamport@siot.do',
        buyer_name: '김도형',
        buyer_tel: '010-1234-5678',
        buyer_addr: '광주인공지능사관학교NSDB',
        buyer_postcode: '123-456'
    },
    function (rsp) {
        console.log(rsp);
        if (rsp.success) {
            var msg = '결제가 완료되었습니다.';
            alert(msg);
            location.href = "http://localhost:3003/index";
        } else {
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            alert(msg);
        }
    });
}

// PRO 요금제 결제 요청 함수
function requestPay1() {
    IMP.init('iamport');
    IMP.request_pay({
        pg: "inicis",
        pay_method: "card",
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '결제테스트',
        amount: 7000,
        buyer_email: 'iamport@siot.do',
        buyer_name: '김도형',
        buyer_tel: '010-1234-5678',
        buyer_addr: '광주인공지능사관학교NSDB',
        buyer_postcode: '123-456'
    },
    function (rsp) {
        console.log(rsp);
        if (rsp.success) {
            var msg = '결제가 완료되었습니다.';
            alert(msg);
            location.href = "http://localhost:3003/index";
        } else {
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            alert(msg);
        }
    });
}



document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.querySelector('.subs_btn_open');
    const closeModalBtn = document.querySelector(".subs_button_close")
    const modal = document.querySelector('.subs_modal');
    
    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });


    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none'; // 모달 숨기기
    });
});


    $(function(){
        const openModalBtn = document.querySelector('.subs_btn_open');
        const modal = document.querySelector('.subs_modal');
    console.log('Dd')
    // 열기 버튼을 클릭하면 모달 창을 보이게 하도록 이벤트 핸들러 추가
    $('.subs_btn_open').click(function () {
        console.log('사이드바 구독 버튼 클릭')
        $('.subs_modal, .overlay').addClass("active");
});

// 닫기 버튼을 클릭하면 모달 창이 닫히도록 이벤트 핸들러 추가
    $('.subs_button_close, .overlay').click(function () {
        $('.subs_modal, .overlay').removeClass("active");
});

// 무료 구독창 클릭 시 완료 문구 및 마이페이지로 이동 
    document.getElementById("subscribe-link").addEventListener("click", function(event) {
        event.preventDefault(); // 링크의 기본 동작 중단
        alert("구독이 완료되었습니다! Basic 회원이 되신 걸 축하드립니다!"); // 알림창 표시
        window.location.href = "http://localhost:3003/mypage"; // 주소로 이동
    });

});

