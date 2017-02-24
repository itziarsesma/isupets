var $ = require('jquery');
var commentsService = require("./commentsService");
var commentsManager = require('./commentsManager');

var MAX_WORD_LENGTH = 120;

var messageTextArea = $('#message');

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
    
    var validLength = validateTextAreaLength();
    if(!validLength) {
        return false;
    }

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

/*// lo quito porque como copies y peges texto es un rollo andar con el alert todo el rato
messageTextArea.on('keyup', function(event) {
    validateTextAreaLength();
});*/

function validateTextAreaLength(alertMessage) {
    var mesageSplit = messageTextArea.val().split(" ");
    if (mesageSplit.length>MAX_WORD_LENGTH) {
        alert("El comentario es demasiado largo, no debe superar las " + MAX_WORD_LENGTH + " palabras");
        return false;
    }
    return true;
}