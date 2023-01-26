sap.ui.define([
    'com/emc/fin/ap/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("com.emc.fin.ap.controller.View1",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("superman").attachMatched(this.herculis, this);
        },
        //Route Matched handler function
        herculis: function(oEvent){
            debugger;
            var fruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = '/fruits/' + fruitId;
            var oList = this.getView().byId("idList");
            //Somehow we need to obtain theobject inside the list which needs to be selected
            //Get All items which are inside our list
            var aItems = oList.getItems();
            //Loop over them
            for (let i = 0; i < aItems.length; i++) {
                const element = aItems[i];
                if(element.getBindingContextPath() === sPath){
                    //Compare the path - if found break the loop
                    var oItemObject = element;
                    break;
                }
            }
            //get list control object in which selection needs to be done
            oList.setSelectedItem(oItemObject);
        },
        onNext: function(myFruitId){
            this.oRouter.navTo("superman",{
                fruitId: myFruitId
            });
            // //Step 1: We need the app container control object - mother object
            // var oCurrentView = this.getView();
            // var oAppCon = oCurrentView.getParent();
            // //Step 2: We can use the to(function) to navigate
            // oAppCon.to("idView2");

        },
        onItemsDelete: function(){
            var oList = this.getView().byId("idList");
            var aSelectedItems = oList.getSelectedItems();
            aSelectedItems.forEach(element => {
                oList.removeItem(element);
            });
        },
        onItemSelect: function (oEvent) {

            //Step 1: get the path of the selected item inside the list control
            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            //Step 2: Get the view 2 object
            //var oAppCon = this.getView().getParent();
            //var oV2 = oAppCon.getPages()[1];
            //Changes due to introduction of Split App Container Control
            //Which has master and detail section and V2 was shifted inside detail Pages
            //var oV2 = this.getView().getParent().getParent().getDetailPage("idView2");
            // path - /fruits/3
            var myId = sPath.split("/")[sPath.split("/").length - 1];
            //Step 3: Element binding with whole of V2
            //oV2.bindElement(sPath);
            //Step 4: Navigate
            this.onNext(myId);
            //debugger;
        },
        onItemDelete: function(oEvent){
            //Step 1: Object of the item to be deleted from event parameters
            var oItemToBeDeleted = oEvent.getParameter("listItem");
            //Step 2: Print the data
            console.log(oItemToBeDeleted.getTitle() + " will be deleted now!");
            //Step 3: Get object of the list Control
            //var oList = this.getView().byId("idMyList");
            var oList = oEvent.getSource();
            //Step 4: Delete the item from the list
            oList.removeItem(oItemToBeDeleted);

        },
        onAdd: function(){
            this.oRouter.navTo("add");
        },
        onSearch: function(oEvent){
            //Step 1: What was the value user is trying to search on screen
            var sVal = oEvent.getParameter("query");
            // if(!sVal){
            //     sVal = oEvent.getParameter("newValue");
            // }
            //Step 2: Create a filter object
            var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains, sVal);
            // var oFilter2 = new Filter("type", FilterOperator.Contains, sVal);
            // var aFilter = [oFilter1, oFilter2];
            // var oFilter = new Filter({
            //     filters : aFilter,
            //     and: false
            // });
            //var objname = new class({ param : v1, param : v2});
            //Step 3: Get Items of the list control and filter all items
            this.getView().byId("idList").getBinding("items").filter(oFilter1);
        }
    });
});