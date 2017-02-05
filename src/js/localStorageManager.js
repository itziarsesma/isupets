var $ = require('jquery');
var storageService = require('./storageService');

module.exports = {
    updateLike: function(articleId) {
        var like = storageService.getValue(articleId);
        if(like != null) {
            storageService.removeValue(articleId);
            this.noLikeStyle(articleId);
        } else {
            storageService.addValue(articleId);
            this.likeSyle(articleId);
        }
    },

    loadLikes: function() {
        var likes = storageService.getValues();
        if(likes != null) {
           for (var i = 0 ; i < likes.length; i++) {
               this.likeSyle(likes[i]);
           }
        }
    },

    likeSyle: function(articleId) {
        var btnImg = $(".article[data-id=" + articleId + "] .btn-like");
        btnImg.removeClass("no-like-img");
        btnImg.addClass("like-img");
    },

    noLikeStyle: function(articleId) {
        var btnImg = $(".article[data-id=" + articleId + "] .btn-like");
        btnImg.removeClass("like-img");
        btnImg.addClass("no-like-img");
    }
};