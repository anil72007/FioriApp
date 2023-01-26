sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("com.emc.fin.ap.Component",{
        metadata: {
            manifest: "json"
        },
        init : function(){
            //UIComponent is the base class, here we will call base class constructor
            //super->constructor() --- ABAP
            UIComponent.prototype.init.apply(this);

            //get the router object from base class
            var oRouter = this.getRouter();
            //Call initialize - it will look manifest json for configuration
            oRouter.initialize();

        },
        // createContent: function(){
            
        //     var oView = new sap.ui.view("idRootView",{
        //         viewName:"com.emc.fin.ap.view.App",
        //         type:"XML"
        //     });

        //     //Step 1: Create our view objects
        //     var oView1 = new sap.ui.view("idView1",{
        //         viewName:"com.emc.fin.ap.view.View1",
        //         type:"XML"
        //     });

        //     var oView2 = new sap.ui.view("idView2",{
        //         viewName:"com.emc.fin.ap.view.View2",
        //         type:"XML"
        //     });

        //     //Step 2: Get the app container control object
        //     var oAppCon = oView.byId("idAppCon");

        //     //Step 3: Add views inside that app container
        //     //AppContainer = Mother, View1 and View2 = Childs
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);


        //     return oView;
        // },
        destroy: function(){

        }
    });
});