$(document).ready(function() {
    console.log($('#hiddenElement').attr('userId'))
    $.ajax({
        method: "get",
        url: `/api/article/${$('#hiddenElement').attr('userId')}`, 
        success: function(data) {
            console.log(data)
        },
        error: function(err){
            console.log(err)
        }
    })
})