var $ = require('jquery');
var storageService = require('./storageServiceAsync');

module.exports = {
    updateLike: function(articleId) {
        var self = this;
        storageService.getValue(articleId, function(like) {
            if(like != null) {
                storageService.removeValue(articleId, function() {
                    self.noLikeStyle(articleId);
                }, function(e) {
                    alert("Se ha producido un error al modificar el like " + e);
                    console.log(e);
                });
            } else {
                storageService.addValue(articleId, function() {
                    self.likeSyle(articleId);
                }, function(e) {
                    alert("Se ha producido un error al modificar el like " + e);
                    console.log(e);
                });
            }
        }, function(e) {
            alert("Se ha producido un error al modificar el like " + e);
            console.log(e);
        });
        
    },

    loadLikes: function() {
        var self = this;
        $(".article").each(function() {
            var article = this;
            storageService.getValue(article.dataset.id, function(like) {
                if(like != null) {
                    self.likeSyle(article.dataset.id);
                }
            }, function(e) {
                alert("Se ha producido un error al cargar los likes " + e);
                console.log(e);
            });
        });
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