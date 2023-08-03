$(document).ready(function(){

    // const btn = document.getElementById('modalBtn');
    // const modal = document.getElementById('modalWrap');
    // const closeBtn = document.getElementById('closeBtn');
    $("#modalBtn").click(function(){
      $("#modalWrap").fadeIn()
    })
    $("#closeBtn").click(function(){
      $("#modalWrap").fadeOut()
    })
    // $(documen).click(function(event){
    //   if($(event.target).is('#modalBody')){
    //     $("#modalWrap").fadeOut();
    //   }
    })
    // btn.onclick = function() {
    //   modal.style.display = 'block';
    //   console.log('modalBtn')
    // }
    // closeBtn.onclick = function() {
    //   modal.style.display = 'none';
    // }
    
    // window.onclick = function(event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // }
  

    $(document).ready(function(){
  
      $('ul.mp_tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
    
        $('ul.mp_tabs li').removeClass('mp_current');
        $('.mp_tab-content').removeClass('mp_current');
    
        $(this).addClass('mp_current');
        $("#"+tab_id).addClass('mp_current');
      });
    
    });

    window.onload = () => {
      // '변경' 버튼에 클릭 이벤트 리스너를 추가합니다.
      document.getElementById("mp_nameCh").addEventListener("click", () => {
          // '변경되었습니다!'라는 알림을 표시합니다.
          alert("변경되었습니다!");
      });
  }