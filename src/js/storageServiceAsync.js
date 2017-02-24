module.exports = {
    getValue: function(id, successCallback, errorCallback) {
        var data = null;
        try {
            var arrayValues = this.getLocalStorageJSON();
            if (arrayValues != null) {
                var index = arrayValues.indexOf("'" + id + "'");
                if (index > -1) {
                    data = id;
                }
            }
            successCallback(data);
        } catch(e) {
            errorCallback(e);
        } 
    },

    addValue: function(id, successCallback, errorCallback) {
        try {
            var arrayValues = this.getLocalStorageJSON();
            if (arrayValues != null) {
                arrayValues.push("'" + id + "'");
            } else {
                arrayValues = ["'" + id + "'"];
            }
            localStorage.setItem("likes", JSON.stringify(arrayValues));
            console.log(localStorage.getItem("likes"));
            successCallback(id);
        } catch(e) {
            errorCallback(e);
        } 
    },

    removeValue: function(id, successCallback, errorCallback) {
        try {
            var arrayValues = this.getLocalStorageJSON();
            var index = arrayValues.indexOf("'" + id + "'");
            if (index > -1) {
                arrayValues.splice(index, 1);
            }
            localStorage.setItem("likes", JSON.stringify(arrayValues));
            console.log(localStorage.getItem("likes"));
            successCallback();
        } catch(e) {
            errorCallback(e);
        } 
    },

    getLocalStorageJSON: function() {
        var currentValues = localStorage.getItem("likes");
        if (currentValues != null) {
            return JSON.parse(currentValues);
        }
        return null;
    },
};