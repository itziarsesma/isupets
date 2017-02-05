var $ = require('jquery');

var API_URL = "/api/comments/";

module.exports = {

    // recuperar todos los comentarios
    list: function(successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "get",
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("CommentsServiceError", error);
            }
        })
    },

    // guardar un comentario
    save: function(comment, successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "post", 
            data: comment,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("CommentsServiceError", error);
            }
        });
    }
};
