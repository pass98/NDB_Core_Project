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