var $ = require('jquery');

var MAX_WORD_LENGTH = 120;

var messageTextArea = $('#mensaje');

messageTextArea.on('keyup', function(event) {
    var mesageSplit = this.value.split(" ");
    if (mesageSplit.length>MAX_WORD_LENGTH) {
        this.value = this.value.substring(0, this.value.lastIndexOf(" "));
        alert("Has llegado al número máximo de palabras " + MAX_WORD_LENGTH);
    }
});