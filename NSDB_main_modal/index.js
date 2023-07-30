$(document).ready(function () {
  $(".modalBtn").click(function () {
    $("#modalWrap").fadeIn()
  })
  $("#closeBtn").click(function () {
    $("#modalWrap").fadeOut()
  })
  // 검색창 기능 구현
  $(function () {
    $("#name").keyup(function () {
  
      const recommendBox = document.querySelector("#suggestion_box");
  
      // invisible을 지워준다.
      recommendBox.classList.remove('invisible');
      const input_name = document.getElementById("#name");
  
      // 기존 검색 추천 데이터 지우고, 새로 넣어주기 안 그러면 계속 추가됨
      recommendBox.innerHTML = "";
  
      const suggestedItems = document.createElement('div')
      suggestedItems.id = "suggested_items"
  
      recommendBox.appendChild(suggestedItems);
  
      // item별 리스트 ( 이건 서버에서 나중에 받아오면 됨)
      var items = ['강백호', '박해민', '이정후', '원태인', '구자욱', '오승환'];
  
      // for문 돌면서 item 추가
      for (var i in items) {
  
        var player_content = document.createTextNode(items[i]);
        var suggestedItem = document.createElement('div')
        suggestedItem.className = "item"
  
        suggestedItem.addEventListener('click', function (e) {
          document.getElementById("name").value = this.textContent.split(' ')[0];
        });
  
        suggestedItem.appendChild(player_content);
        suggestedItems.appendChild(suggestedItem);
      }
    })
  })
  $(".submit_button").click(function(){
    window.location.href = "./codingExam.html";
  })
})


