var $ = require('jquery');
var moment = require('moment');
require('moment/locale/es');

var MINS_LIMIT = 60000;
var HOURS_LIMIT = 3600000;
var DAY_LIMIT = 86400000;
var WEEK_LIMIT = 604800000;

module.exports = {
    loadDates: function() {
        moment.locale('es');

        var self = this;
        $(".articleDate").each(function() {
            var articleDate = moment(this.innerText, "DD/MM/YYYY hh:mm:ss");
            var timeDiff = self.timeFromNow(articleDate);
            if(timeDiff != null) {
                $(this).text(timeDiff);
            }
            //console.log(articleDate + " " + articleDate.fromNow());
            //console.log(articleDate + " " + articleDate.calendar());
        });
    }, 

    timeFromNow: function(articleDate) {
        var ms = moment().diff(articleDate);
        if (ms < MINS_LIMIT) { // menos de un minuto
            return "hace " + moment().diff(articleDate, "seconds") + " segundos";
        } else if (ms < HOURS_LIMIT) { // menos de una hora
            return "hace " + moment().diff(articleDate, "minutes") + " minutos";
        } else if (ms < DAY_LIMIT) { // menos de un día
            return "hace " + moment().diff(articleDate, "hours") + " horas";
        } else if (ms < WEEK_LIMIT) { // menos de una semana
            return "el " + articleDate.format('dddd');
        }
        return null;
    }
}

