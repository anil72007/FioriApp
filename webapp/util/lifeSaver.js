sap.ui.define([

], function () {
    'use strict';
    return {
        getStatus: function (status) {
            debugger;
            switch (status) {
                case "Available":
                    return "Success";
                    break;
                case "Out of Stock":
                    return "Warning";
                    break;
                case "Discontinued":
                    return "Error";
                    break;
                default:
                    break;
            }
        }
    }
});