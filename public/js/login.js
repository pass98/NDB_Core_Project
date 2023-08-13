document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // 유저가 입력한 이메일 값을 세션 스토리지에 저장
    const userEmail = emailInput.value;
    sessionStorage.setItem("user-email", userEmail);

    // 이후에 필요한 작업을 수행
    // 예: 페이지 리디렉션, 다른 작업 등
  });
});
