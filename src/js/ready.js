var $ = require('jquery');
var dateManager = require('./dateManager');
var localStorageManager = require('./localStorageManagerAsync');
var commentsManager = require('./commentsManager');
var avatarPlaceholder = require('./avatarPlaceholder');

$(document).ready(function() {
    // carga de fechas
    dateManager.loadDates();

    // carga inicial de me gusta
    localStorageManager.loadLikes();
    // evento modificar me gusta
    if (typeof(Storage) != 'undefined') {
        $(".btn-like").on("click", function() {
            var articleId = $(this).parents(".article").data("id");
            localStorageManager.updateLike(articleId); 
        });
    } else {
        alert("El navegador no acepta almacenamiento local");
    }

    // carga de avatares
    avatarPlaceholder.loadAvatarPlaceHolder();

    // evento scroll para comprobar la visibilidad de los comentarios
    var sectionComments = $('#comments')
    if (sectionComments.length > 0) {
        commentsManager.init();
        //window.addEventListener('scroll', commentsManager.checkVisibility);
        window.addEventListener('scroll', function() {
            commentsManager.checkVisibility();
        });
    }
});