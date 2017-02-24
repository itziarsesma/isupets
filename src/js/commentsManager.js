var $ = require('jquery');
var commentsService = require('./commentsService');

module.exports = {
    commentsOffSet: null,
    myHeight: null,
    commentsLoaded: false,

    init: function() {
        this.myHeight = window.innerHeight;
        this.commentsOffSet = this.cumulativeOffset(document.getElementById('comments')) - this.myHeight;
        this.checkVisibility();
    },

    cumulativeOffset: function(element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
    },

    checkVisibility: function() {
        if( !this.commentsLoaded ) {
            //console.log("PAGE: " + window.pageYOffset + " COMMENTS " + this.commentsOffSet); 
            if (window.pageYOffset >= this.commentsOffSet) {
                this.commentsLoaded = true;
                this.loadComments();
            }
        }
    },

    setUiIdeal: function() {
        $('.comments-list').removeClass().addClass('comments-list ideal');
    },
    setUiBlank: function() {
        $('.comments-list').removeClass().addClass('comments-list blank');
    },
    setUiError: function() {
        $('.comments-list').removeClass().addClass('comments-list error');
    },
    setUiLoading: function() {
        $('.comments-list').removeClass().addClass('comments-list loading');
    },

    loadComments: function() {
        var self = this;
        
        self.setUiLoading();

        commentsService.list(function(comments) { 
            if(comments.length == 0) {
                self.setUiBlank();
            } else {
                self.renderComments(comments);
                self.setUiIdeal(); 
            }
        }, function(error) { 
            self.setUiError();
        });
    },

    renderComments: function(comments) {
        $(".comments-list .ui-ideal").empty();
        var nodeToAdd = '';
        for (var i = 0; i < comments.length; i++) {
            nodeToAdd = '<article class="article-comment">';
            nodeToAdd += '<div class="author"><strong class="author-name' + i + '"></strong> - <i class="author-email' + i + '"></i></div>';
            nodeToAdd += '<div class="message author-message' + i + '"></div>';
            nodeToAdd += "</article>"
            $(".comments-list .ui-ideal").append(nodeToAdd);
            $(".comments-list .ui-ideal .author-name" + i).text(comments[i].author);
            $(".comments-list .ui-ideal .author-email" + i).text(comments[i].email);
            $(".comments-list .ui-ideal .author-message" + i).text(comments[i].message);
        }
    }
}