module.exports = {
    getValues: function() {
        var currentValues = localStorage.getItem("likes");
        if (currentValues != null) {
            return JSON.parse(currentValues);
        }
        return null;
    },
    getValue: function(id) {
        var arrayValues = this.getValues();
        if (arrayValues != null) {
            var index = arrayValues.indexOf("'" + id + "'");
            if (index > -1) {
                return id;
            }
        }
        return null;
    },

    addValue: function(id) {
        var arrayValues = this.getValues();
        if (arrayValues != null) {
            arrayValues.push("'" + id + "'");
        } else {
            arrayValues = ["'" + id + "'"];
        }
        localStorage.setItem("likes", JSON.stringify(arrayValues));
        console.log(localStorage.getItem("likes"));
    },

    removeValue: function(id) {
        var arrayValues = this.getValues();
        var index = arrayValues.indexOf("'" + id + "'");
        if (index > -1) {
            arrayValues.splice(index, 1);
        }
        localStorage.setItem("likes", JSON.stringify(arrayValues));
        console.log(localStorage.getItem("likes"));
    }
};