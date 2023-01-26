sap.ui.define([
    'com/emc/fin/ap/controller/BaseController',
    "sap/ui/core/routing/History"
], function(BaseController, History) {
    'use strict';
    return BaseController.extend("com.emc.fin.ap.controller.View3",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("ironman").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            debugger;
            var suppId = oEvent.getParameter("arguments").suppId;
            var sPath = '/suppliers/' + suppId;
            this.getView().bindElement(sPath);
        },
        onBack: function(){
            var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("spiderman", {}, true /*no history*/);
			}
        }
    });
});