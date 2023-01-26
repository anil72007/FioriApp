sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'com/emc/fin/ap/util/lifeSaver'
], function(Controller, lifeSaver) {
    'use strict';
    return Controller.extend("com.emc.fin.ap.controller.BaseController",{
        formatter: lifeSaver
    });
});