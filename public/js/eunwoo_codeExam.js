function codePrint(){
    $.ajax({
        url: '/index/codeExam',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}