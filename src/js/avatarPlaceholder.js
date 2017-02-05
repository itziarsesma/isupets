var $ = require('jquery');

module.exports = {
    loadAvatarPlaceHolder: function() {
        $(".avatar").each(function() {
            if(this.src == "") {
                $(this).addClass('avatar-placeholder');
            }
        });
    }
}