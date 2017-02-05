var $ = require('jquery');
var commentsService = require("./commentsService");
var commentsManager = require('./commentsManager');

$('.comments-form').on("submit", function() {
    var self = this;
    // validación
    var inputs = $(this).find("input").each(function(){
        var input = this;
        if (input.checkValidity() == false) {
            alert(input.validationMessage);
            input.focus();
            return false;
        }
    });

    var comment = {
        author: $("#inputName").val(),
        email: $("#inputEmail").val(),
        message: $("#message").val()
    };
    
    $("#publishBtn").attr("disabled", true);

    commentsService.save(comment, function(data) {
            self.reset(); 
            $("#publishBtn").attr("disabled", false);
            commentsManager.loadComments();
        }, 
        function(error) {
            $("#publishBtn").attr("disabled", false);
        });  
    return false;
});